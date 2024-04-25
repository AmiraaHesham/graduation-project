import React, { useState, useEffect, useRef } from 'react'
import './Profile.css'
import { FiEdit } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'

const Profile = () => {
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')


    const inputRef = useRef()
    const inputRefName = useRef()
    const inputRefEmail = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = async () => {

        try {

            const res = await axios.get('http://127.0.0.1:3000/api/v1/lecturer/getme',
                {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                },
            )

            setEmail(res.data.data.email)
            setName(res.data.data.name)

            const profileImage = localStorage.profileImage;
            if (profileImage !== 'undefined') {
                setPhoto(profileImage);
                console.log(profileImage)
            }
            else {
                setPhoto('logoUser.png');
            }

        }

        catch (error) {
            console.log(error)
        }

    }

    const handleImage = () => {
        inputRef.current.click()
    }
    const handleUpload = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = async () => {
            console.log(reader.result)
            setPhoto(reader.result)
            try {
                const res = await axios.put('http://127.0.0.1:3000/api/v1/lecturer/updateMe',
                    {
                        profileImage: reader.result
                    },
                    {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Credentials": "true",
                            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                            "Authorization": 'Bearer ' + localStorage.token
                        }
                    })
                console.log(res)
                localStorage.setItem('profileImage', reader.result)
            }
            catch (error) {
                console.log(error)
            }
        }


    }

    const btnEditName = () => {
        let inputEditName = document.querySelector('#inpEditName')
        inputEditName.classList.remove('hide')

        let name = document.querySelector('#name')
        name.classList.add('hide')

        let inputEditEmail = document.querySelector('#EditEmail')
        inputEditEmail.classList.add('hide')

        let email = document.querySelector('#email')
        email.classList.add('hide')

        let btnsSaveCancelName = document.querySelector('#btns-save-cancel-Name')
        btnsSaveCancelName.classList.remove('hide')

        let btnssavecancelEmail = document.querySelector('#btns-save-cancel-Email')
        btnssavecancelEmail.classList.add('hide')

        let Changepassword = document.querySelector('.btn-Changepassword')
        Changepassword.classList.add('hide')

        inputRefName.current.value = localStorage.name
    }

    const btnEditEmail = () => {
        let inputEditName = document.querySelector('#inpEditName')
        inputEditName.classList.add('hide')
        let name = document.querySelector('#name')
        name.classList.add('hide')
        let inputEditEmail = document.querySelector('#EditEmail')
        inputEditEmail.classList.remove('hide')
        let email = document.querySelector('#email')
        email.classList.add('hide')
        let Changepassword = document.querySelector('.btn-Changepassword')
        Changepassword.classList.add('hide')
        let btnssavecancelEmail = document.querySelector('#btns-save-cancel-Email')
        btnssavecancelEmail.classList.remove('hide')
        inputRefEmail.current.value = localStorage.email
    }

    const handleBtnCancel = () => {
        let inputEditName = document.querySelector('#inpEditName')
        inputEditName.classList.add('hide')
        let name = document.querySelector('#name')
        name.classList.remove('hide')
        let inputEditEmail = document.querySelector('#EditEmail')
        inputEditEmail.classList.add('hide')
        let email = document.querySelector('#email')
        email.classList.remove('hide')
        let btnsSaveCancelName = document.querySelector('#btns-save-cancel-Name')
        btnsSaveCancelName.classList.add('hide')
        let btnssavecancelEmail = document.querySelector('#btns-save-cancel-Email')
        btnssavecancelEmail.classList.add('hide')
        let btnChangepassword = document.querySelector('.btn-Changepassword')
        btnChangepassword.classList.remove('hide')

    }

    const saveName = async () => {
        let inputEditName = document.querySelector('#inpEditName')
        inputEditName.classList.add('hide')
        let name = document.querySelector('#name')
        name.classList.remove('hide')
        let inputEditEmail = document.querySelector('#EditEmail')
        inputEditEmail.classList.add('hide')
        let email = document.querySelector('#email')
        email.classList.remove('hide')
        let btnsSaveCancelName = document.querySelector('#btns-save-cancel-Name')
        btnsSaveCancelName.classList.add('hide')
        let btnssavecancelEmail = document.querySelector('#btns-save-cancel-Email')
        btnssavecancelEmail.classList.add('hide')
        let btnChangepassword = document.querySelector('.btn-Changepassword')
        btnChangepassword.classList.remove('hide')
        const newName = inputRefName.current.value

        try {
            await axios.put('http://127.0.0.1:3000/api/v1/lecturer/updateMe',
                {
                    name: newName,
                }
                , {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                })

            localStorage.setItem('name', newName)

        }
        catch (error) {
            console.log(error)
        }
    }
    const handleBtnLogout = () => {

        localStorage.token = ''
        localStorage.name = ''
        localStorage.email = ''
        localStorage.profileImage = ''
        localStorage.id = ''

        navigate('/SignIn')
    }

    const saveEmail = async () => {
        let inputEditName = document.querySelector('#inpEditName')
        inputEditName.classList.add('hide')
        let name = document.querySelector('#name')
        name.classList.remove('hide')
        let inputEditEmail = document.querySelector('#EditEmail')
        inputEditEmail.classList.add('hide')
        let email = document.querySelector('#email')
        email.classList.remove('hide')
        let btnChangepassword = document.querySelector('.btn-Changepassword')
        btnChangepassword.classList.remove('hide')
        const newEmail = inputRefEmail.current.value

        try {
            await axios.put('http://127.0.0.1:3000/api/v1/lecturer/updateMe',
                {
                    email: newEmail
                }
                , {
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                })
            localStorage.setItem('email', newEmail)



        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <div className='header' >
                <Link to={'/LecturesDates'}><svg id='time' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200" ><path fill="currentColor"
                    d="M0 0v240h1200V0zm0 480v240h1200V480zm0 480v240h1200V960z" /></svg></Link>
                <h4>Smart Attendance System</h4>
            </div>
            <div className='div-profile-info'>
                <div className='div-imgprofile' >
                    <span className='editpictuer' onClick={handleImage}><FiEdit /> Edit </span>
                    <input type='file' ref={inputRef} onChange={handleUpload} style={{ display: 'none' }} />
                    <img src={photo} alt='' />
                </div>
                <div className='div-info'>
                    <div>
                        <div>
                            <input ref={inputRefName} onChange={(e) => setName(e.target.value)} className='hide' id='inpEditName' />
                            <div className='hide' id='btns-save-cancel-Name'>
                                <button onClick={saveName} id='btn-save'>Save</button>
                                <button onClick={handleBtnCancel} id='btn-cancel'>Cancel</button>
                            </div>
                        </div>
                        <div className='div-name' id='name' >
                            <span className='name'>Name:   {name}</span>
                            <span onClick={btnEditName} style={{ position: 'absolute', left: '420px' }}><FiEdit /></span>

                        </div>
                        <div >
                            <div className='hide' id='EditEmail'>
                                <input ref={inputRefEmail} onChange={(e) => setEmail(e.target.value)} id='inpEditEmail' />
                                <div className='hide' id='btns-save-cancel-Email'>
                                    <button onClick={saveEmail} id='btn-save'>Save</button>
                                    <button onClick={handleBtnCancel} id='btn-cancel'>Cancel</button>
                                </div>
                            </div>

                            <div className='div-email' id='email' >
                                <span className='email'>Email:  {email}</span>
                                <span onClick={btnEditEmail} style={{ position: 'absolute', left: '420px' }}><FiEdit /></span>

                            </div>

                        </div>


                        <div className='btns-edit-changpass'>
                            <button className='btn-Changepassword'>Change Password</button>
                        </div>
                    </div>

                </div>
                <div className='btns-logout-delete'>
                    <button onClick={handleBtnLogout} className='btn-logout'>Logout</button>
                    <button className='btn-delete'>Delete Acount</button>
                </div>

            </div>
        </div>
    )
}

export default Profile
