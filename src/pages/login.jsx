
// Login layout: displays the intro panel and nested sign-in/sign-up routes.
import React from 'react';
import { Outlet } from 'react-router-dom';
const Login = () => {

    return (
        <div className='ContenarAll'>
            <div className='Contant'>
                <section className='SecIntro'>
                    <div className='HeaderIntro'>
                            <h1 className='TitelHeader'> stock Flow</h1>
                            <p className='titelP'>Product management system</p>
                    </div>
                    <div className='ContantIntro'>
                    <img src={`${process.env.PUBLIC_URL}/ChatGPT Image Aug 17, 2026, 06_03_07 PM.png`} alt="Stock Flow introduction" className='introImage' />
                    </div>
                </section>
                    <Outlet/>
            </div>
        </div>
    );
}

export default Login;
