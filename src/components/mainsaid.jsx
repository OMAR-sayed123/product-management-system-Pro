import React from 'react';
import { getCurrentUser } from '../services/authservice';
import { NavLink, useNavigate } from 'react-router-dom';

// This component is the left sidebar used in all pages after login.
// It shows the app name, the logged-in user, navigation links, and logout action.
const Mainsaid = () => {
    // Read the current signed-in user from localStorage
    const user = getCurrentUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('currentUser');
            navigate('/login');
        }
    };

    return (
        <div className='MainSaid'>
            <p className='HeaderMain'>
                <span className='head'> stock Flow </span>
                <span className='NameUser'>Welcome {user?.name}</span>
            </p>

            <section className='SecMain'>
                {/* NavLink makes a menu item act like a route link */}
                <NavLink
                    to="/home"
                    className={({ isActive }) => isActive ? 'BtnSecMain active' : 'BtnSecMain'}
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/product"
                    className={({ isActive }) => isActive ? 'BtnSecMain active' : 'BtnSecMain'}
                >
                    Product
                </NavLink>

                <NavLink
                    to="/categories"
                    className={({ isActive }) => isActive ? 'BtnSecMain active' : 'BtnSecMain'}
                >
                    Categories
                </NavLink>

                <NavLink
                    to="/setting"
                    className={({ isActive }) => isActive ? 'BtnSecMain active' : 'BtnSecMain'}
                >
                    Setting
                </NavLink>

                <button 
                    onClick={handleLogout}
                    className='BtnSecMain'
                    style={{
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: 'auto'
                    }}
                >
                    Logout
                </button>
            </section>
        </div>
    );
};

export default Mainsaid;
