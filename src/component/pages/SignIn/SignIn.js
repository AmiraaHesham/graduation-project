import './SignIn.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const validate = () => {
        let result = true;
        if (Email === '' || Email === null) {
            result = false;
            toast.warning("Enter Email")
        }
        if (Password === '' || Password === null) {
            result = false;
            toast.warning("Enter Password")
        }
        return result

    }

    return (
        <div>
            <div className='sign-in-contener'>
                <h3>Sign In</h3>
                <div className='input-Email-pass'>
                    <input className='Email' placeholder='Email' value={Email} onChange={(e) => { setEmail(e.target.value) }}></input>
                    <input className='password' type='password' placeholder='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }}></input>
                </div>
                <div className='btn-h5-login'>
                    <Link to={"/LecturesDates"}>
                        <button className='btn-login' onClick={validate}>login</button>
                    </Link>
                    <h5>Not Have Account?
                        <Link style={{ textDecoration: 'none', color: '#0F1035', fontWeight: '600' }} to="/CreateAccount">Create account</Link>
                    </h5>
                </div>
            </div>
        </div>
    )
}

export default SignIn
