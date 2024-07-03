import './SignIn.css';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

const SignIn = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate()
    const inputEmailRef = useRef()
    const inputCodeRef = useRef()
    const inputConfirmPassRef = useRef()
    const inputnewPassRef = useRef()

    useEffect(() => {
        cheekToken()
    },)

    const handleSignIn = async () => {
        let email = document.querySelector(".Email")
        let pass = document.querySelector(".password")

        try {
            const res = await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/authLec/login', {
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
    const handleBtnForgetPass = () => {
        let divforgetPassword = document.querySelector('#div-forgetPassword')
        let signincontener = document.querySelector('.sign-in-contener')
        divforgetPassword.classList.remove('hide')
        divforgetPassword.classList.add('div-forgetPassword')
        signincontener.classList.add('hide')
    }
    const confirm = async () => {
        if (inputCodeRef.current.value === '') {


            if (inputEmailRef.current.value !== '') {
                try {
                    const res = await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/authLec/forgotPassword',
                        {
                            email: inputEmailRef.current.value
                        })
                    console.log(res)
                    toast.success('Reset code sent to email')
                    let inputCodeForgetpass = document.querySelector('#inputCodeForgetpass')
                    let inputEmailForgetpass = document.querySelector('#inputEmailForgetpass')
                    inputCodeForgetpass.classList.remove('hide')
                    inputEmailForgetpass.classList.add('hide')
                }
                catch (error) {
                    toast.error('Enter Your Email')
                }
            }
        }
        else {
            try {
                const res = await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/authLec/verifyResetCode',
                    {
                        resetCode: inputCodeRef.current.value
                    })
                console.log(res)
                let inputCodeForgetpass = document.querySelector('#inputCodeForgetpass')
                inputCodeForgetpass.classList.add('hide')

                let inputConfirmPass = document.querySelector('#inputConfirmPass')
                let inputnewPass = document.querySelector('#inputnewPass')
                inputConfirmPass.classList.remove('hide')
                inputnewPass.classList.remove('hide')
                // inputCodeRef.current.value = ''
            }
            catch (error) {
                console.log(error)
                toast.error('Reset code invalid or expired')
            }
        }

        if (inputConfirmPassRef.current.value !== '' && inputnewPassRef.current.value !== '') {
            try {
                const res = await axios.put('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/authLec/resetPassword',
                    {
                        email: inputEmailRef.current.value,
                        confirmPassword: inputConfirmPassRef.current.value,
                        newPassword: inputnewPassRef.current.value
                    })
                console.log(res)
                toast.success('success')
                let divforgetPassword = document.querySelector('#div-forgetPassword')
                let signincontener = document.querySelector('.sign-in-contener')
                divforgetPassword.classList.add('hide')
                signincontener.classList.remove('hide')

            }
            catch (error) {
                console.log(error)
            }
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
                <div className='sign-in-contener' id='sign-in-contener'>
                    <h3>Sign In</h3>
                    <div className='input-Email-pass'>
                        <input className='Email' placeholder='Email' type='email' value={Email} onChange={(e) => { setEmail(e.target.value) }}></input>
                        <input className='password' type='password' placeholder='Password' value={Password} onChange={(e) => { setPassword(e.target.value) }}></input>
                        <h4 onClick={handleBtnForgetPass}>Forget Password</h4>
                    </div>

                    <div className='btn-h5-login'>

                        <button className='btn-login' onClick={handleSignIn}>login</button>

                        <h5>Not Have Account?
                            <Link style={{ textDecoration: 'none', color: '#0F1035', fontWeight: '600', fontSize: '15px' }} to="/CreateAccount">Create account</Link>
                        </h5>
                    </div>
                </div>
                <div className='hide' id='div-forgetPassword'>
                    <h3>Forget Password</h3>
                    <input id='inputEmailForgetpass' ref={inputEmailRef} className='Email' placeholder='Email' type='email' ></input>
                    <input id='inputCodeForgetpass' className='hide' ref={inputCodeRef} placeholder='Enter Code Sent to Email'></input>

                    <input id='inputnewPass' className='hide' ref={inputnewPassRef} placeholder='Enter New Password'></input>
                    <input id='inputConfirmPass' className='hide' ref={inputConfirmPassRef} placeholder='Enter Confirm Password'></input>

                    <button onClick={confirm}>confirm</button>
                </div>
            </div>
        </div>
    )
}

export default SignIn
