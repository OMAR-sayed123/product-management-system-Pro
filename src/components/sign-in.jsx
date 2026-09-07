import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, setCurrentUser } from '../services/authservice';

// Sign-in form: validates credentials, stores the session, and opens the dashboard.
const SignIn = () => {
    const navigate = useNavigate();

    // State values for email and password entered by the user.
    const [EmailLogin, setEmailLogin] = useState("");
    const [PasswordLogin, setPasswordLogin] = useState("");

    // This function runs when the user clicks Sign In.
    function handelclick() {
        // Check if both fields are filled.
        if (!EmailLogin || !PasswordLogin) {
            alert('please Enter Email And Password');
            return;
        }

        // Try to log in using the service file.
        const result = loginUser(EmailLogin, PasswordLogin);

        if (!result.success) {
            // If email is wrong, clear and mark the email input.
            if (result.error === "Email") {
                let inputemail = document.getElementById("inputemail");
                inputemail.value = "";
                inputemail.style.background = "#ff7a7a";
                inputemail.placeholder = "the email is uncorrect";
                return;
            }

            // If password is wrong, clear and mark the password input.
            if (result.error === "Password") {
                let inputpassword = document.getElementById("inputpassword");
                inputpassword.value = "";
                inputpassword.style.background = "#ff7a7a";
                inputpassword.placeholder = "the password is uncorrect";
                return;
            }
        }

        // Save the logged-in user so app pages can access it later.
        setCurrentUser(result.userSuccess);

        // Redirect the user to the main dashboard page.
        navigate("/home", { replace: true });
    }

    return (
        <section className='Seclogin'>
            <p className='headerLogin'>Welcome Back</p>

            <div className='informationLogin'>
                <div className='Email'>
                    <input
                        type='text'
                        className='inputemail'
                        placeholder='Email'
                        id='inputemail'
                        value={EmailLogin}
                        onChange={(e) => setEmailLogin(e.target.value)}
                    />
                </div>

                <div className='password'>
                    <input
                        type='password'
                        className='inputpassword'
                        placeholder='Password'
                        id='inputpassword'
                        value={PasswordLogin}
                        onChange={(e) => setPasswordLogin(e.target.value)}
                    />
                </div>

                <p className='PrForgotpassword'>Forgot password?</p>

                <button className='btnlogin' onClick={handelclick}>
                    Sign In
                    <div className="arrow-wrapper">
                        <div className="arrow"></div>
                    </div>
                </button>
            </div>

            <p>
                Don't have an account?
                <span
                    className='spanswath'
                    onClick={() => {
                        navigate("/signup", { replace: true });
                    }}
                >
                    Sign Up
                </span>
            </p>
        </section>
    );
};

export default SignIn;
