// Settings page: edits profile data, preferences, password, and the active session.
import React, { useState, useEffect } from 'react';
import Mainsaid from '../components/mainsaid';
import { getCurrentUser, updateUser } from '../services/authservice';
import { useNavigate } from 'react-router-dom';

const settingsCards = [
    { title: 'Profile', value: 'Update personal info', icon: '👤' },
    { title: 'Notifications', value: 'Email and push alerts', icon: '🔔' },
    { title: 'Security', value: 'Password and 2FA', icon: '🔒' },
    { title: 'Appearance', value: 'Theme and layout', icon: '🎨' }
];

const Setting = () => {
    const navigate = useNavigate();
    // Keep the session object stable so the form is not reset on every render.
    const [currentUser, setCurrentUserState] = useState(() => getCurrentUser());
    
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [darkMode, setDarkMode] = useState(() => (
        JSON.parse(localStorage.getItem('darkMode') || 'false')
    ));
    const [weeklyReports, setWeeklyReports] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            setFullName(currentUser.name || '');
            setEmail(currentUser.email || '');
            setPhone(currentUser.phone || '+1 234 567 890');
            setRole(currentUser.role || 'Inventory Manager');
            setDarkMode(currentUser.preferences?.darkMode ?? JSON.parse(localStorage.getItem('darkMode') || 'false'));
            setWeeklyReports(currentUser.preferences?.weeklyReports ?? false);
        }
    }, [currentUser]);

    // Apply the selected theme immediately and keep it when navigating to another page.
    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode);
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const handleSaveChanges = () => {
        // Stop the save operation when no session exists or required fields are empty.
        if (!currentUser || !fullName.trim() || !email.trim() || !phone.trim()) {
            setMessage('Please fill in all profile fields.');
            return;
        }

        // Keep the current password and add the changed profile/preferences values.
        const updatedUser = {
            ...currentUser,
            name: fullName.trim(),
            email: email.trim(),
            phone: phone.trim(),
            role: role.trim(),
            preferences: { darkMode, weeklyReports }
        };

        // Persist both the active session and the registered user record.
        updateUser(updatedUser, currentUser.email);
        setCurrentUserState(updatedUser);
        setIsEditing(false);
        setMessage('Changes saved successfully.');
    };

    const handleChangePassword = () => {
        if (!currentUser || !oldPassword || !newPassword || !confirmPassword) {
            setMessage('Please fill all password fields.');
            return;
        }

        if (currentUser.password !== oldPassword) {
            setMessage('Old password is incorrect.');
            return;
        }

        if (newPassword.length < 6) {
            setMessage('New password must be at least 6 characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('New passwords do not match.');
            return;
        }

        const updatedUser = {
            ...currentUser,
            password: newPassword
        };
        updateUser(updatedUser, currentUser.email);
        setCurrentUserState(updatedUser);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setMessage('Password changed successfully.');
    };

    const handleLogout = () => {
        // Ask for confirmation before ending the current session.
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUser');
            navigate('/login');
        }
    };

    return (
        <div className="SettingPage">
            <Mainsaid />

            <main className="SettingContent">
                <div className="SettingHeader">
                    <div>
                        <p className="PageEyebrow">Account</p>
                        <h1>Settings</h1>
                    </div>
                    <button className="PrimaryButton" type="button" onClick={handleSaveChanges}>Save Changes</button>
                </div>

                {message && <p className="SettingMessage" role="status">{message}</p>}

                <section className="SettingOverview">
                    {settingsCards.map((card) => (
                        <div className="SettingCard" key={card.title}>
                            <div className="SettingIcon">{card.icon}</div>
                            <div>
                                <h3>{card.title}</h3>
                                <p>{card.value}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <section className="SettingFormCard">
                    <div className="FormHeader">
                        <h3>Profile Settings</h3>
                        <button className="SecondaryButton" type="button" onClick={() => setIsEditing((editing) => !editing)}>
                            {isEditing ? 'Done' : 'Edit'}
                        </button>
                    </div>

                    <div className="FormGrid">
                        <div className="FormField">
                            <label>Full Name</label>
                            <input 
                                type="text"
                                value={fullName}
                                disabled={!isEditing}
                                onChange={(e) => setFullName(e.target.value)} 
                            />
                        </div>

                        <div className="FormField">
                            <label>Email</label>
                            <input 
                                type="email"
                                value={email}
                                disabled={!isEditing}
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className="FormField">
                            <label>Phone</label>
                            <input 
                                type="text"
                                value={phone}
                                disabled={!isEditing}
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                        </div>

                        <div className="FormField">
                            <label>Role</label>
                            <input 
                                type="text"
                                value={role}
                                disabled={!isEditing}
                                onChange={(e) => setRole(e.target.value)} 
                            />
                        </div>
                    </div>
                </section>

                <section className="SettingBottomGrid">
                    <div className="SettingFormCard compact">
                        <h3>Preferences</h3>
                        <div className="ToggleRow">
                            <span>Dark mode</span>
                            <button
                                type="button"
                                className={`Toggle ${darkMode ? 'on' : 'off'}`}
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                {darkMode ? 'ON' : 'OFF'}
                            </button>
                        </div>
                        <div className="ToggleRow">
                            <span>Weekly reports</span>
                            <button
                                type="button"
                                className={`Toggle ${weeklyReports ? 'on' : 'off'}`}
                                onClick={() => setWeeklyReports(!weeklyReports)}
                            >
                                {weeklyReports ? 'ON' : 'OFF'}
                            </button>
                        </div>
                    </div>

                    <div className="SettingFormCard compact">
                        <h3>Security</h3>
                        <div className="SecurityRow">
                            <span>Old Password</span>
                            <input 
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter old password"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    width: '150px'
                                }}
                            />
                        </div>
                        <div className="SecurityRow">
                            <span>Confirm Password</span>
                            <input 
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    width: '150px'
                                }}
                            />
                        </div>
                        <div className="SecurityRow">
                            <span>New Password</span>
                            <input 
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                style={{
                                    border: '1px solid #e5e7eb',
                                    padding: '6px 10px',
                                    borderRadius: '6px',
                                    width: '150px'
                                }}
                            />
                        </div>
                        <button className="ActionButton" type="button" onClick={handleChangePassword} style={{marginTop: '10px', width: '100%'}}>Change Password</button>
                    </div>
                </section>

                <div style={{marginTop: '20px'}}>
                    <button className="ActionButton" type="button" onClick={handleLogout} style={{background: '#fee2e2', color: '#dc2626', padding: '12px 18px', marginRight: '10px'}}>Logout</button>
                </div>
            </main>
        </div>
    );
};

export default Setting;
