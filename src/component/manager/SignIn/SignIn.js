import './SignIn.css';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const SignIn = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        cheekToken()
    },)

    const handleSignIn = async () => {
        let email = document.querySelector(".Email")
        let pass = document.querySelector(".password")

        try {
            const res = await axios.post('http://127.0.0.1:3000/api/v1/authLec/login', {
                email: Email,
                password: Password
            },
            )
            console.log(res)
            // console.log(res.data.token)
            // console.log(res.data.data.name)
            // console.log(res.data.data.profileImage)

            let token = res.data.token
            let name = res.data.data.name
            let profileImage = res.data.data.profileImage
            let email = res.data.data.email
            let id = res.data.data._id
            let role = res.data.data.role
            localStorage.setItem('token', token)
            localStorage.setItem('name', name)
            localStorage.setItem('profileImage', profileImage)
            localStorage.setItem('email', email)
            localStorage.setItem('id', id)
            localStorage.setItem('role', role)
            if (localStorage.role === 'admin') {
                navigate('/CreateLecturer')

            }
            else { navigate('/Dashboard') }



        }

        catch (error) {
            email.style.border = '2px solid brown'
            pass.style.border = '2px solid brown'
            console.log(error)
            toast.error(error.response.data.message)

        }
    }

    const cheekToken = () => {
        if (localStorage.token !== '') {
            if (localStorage.role === 'admin') {
                navigate('/CreateLecturer')

            }
            else (
                navigate('/Dashboard')

            )
        }
    }


    return (
        <div>

            <div className=''>
                <div className='header'>
                    <h4>Smart Attendance System</h4>
                </div>
                <Toaster
                    position="bottom-center"
                    reverseOrder={true}
                />
                <div className='sign-in-contener'>
                    <h3>Sign In</h3>
                    <div className='input-Email-pass'>
                        <input className='Email' placeholder='Email' type='email' value={Email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input className='password' type='password' placeholder='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        <h4>Forget Password</h4>
                    </div>
                    <div className='btn-h5-login'>

                        <button className='btn-login' onClick={handleSignIn}>login</button>

                        <h5>Not Have Account?
                            <Link style={{ textDecoration: 'none', color: '#0F1035', fontWeight: '600', fontSize: '15px' }} to="/CreateAccount">Create account</Link>
                        </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
