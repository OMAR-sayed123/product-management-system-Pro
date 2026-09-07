// Sign-up form: validates registration data and stores a new local account.
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUsers } from "../services/authservice";

// This component handles the registration form.
const SignUp = () => {
    const navigate = useNavigate();

    // State variables for the user's registration details.
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Called when the user clicks the Sign Up button.
    const handleLogin = () => {
        if (!name || !email || !password) {
            alert("Please Fill All Fields");
            return;
        }

        // Build the new user object before saving it.
        const userData = {
            name,
            email,
            password
        };

        // Save the user to localStorage.
        createUsers(userData);

        // Take the user back to the login page.
        navigate("/login");
    };

    return (
        <section className='Seclogin'>
            <p className='headerLogin'>Create an new account</p>

            <div className='informationLogin'>
                <div className='Name'>
                    <input
                        type='text'
                        className='inputname'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='Email'>
                    <input
                        type='text'
                        className='inputemail'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='password'>
                    <input
                        type='password'
                        className='inputpassword'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className='btnlogin' onClick={handleLogin}>
                    Sign Up
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>
                    </div>
                </button>
            </div>

            <p>
                I have an account?
                <span
                    className='spanswath'
                    onClick={() => {
                        navigate("/login", { replace: true });
                    }}
                >
                    LogIn
                </span>
            </p>
        </section>
    );
};

export default SignUp;