import { Link } from 'react-router-dom'
import './CreateStu.css'
import Header from '../header/header'
import React, { useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
const CreateStu = () => {
    const [fullname, setFullName] = useState();
    const [Email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [Confirmpassword, setConfirmPassword] = useState();
    const [Programming, setProgramming] = useState();
    const [photo, setPhoto] = useState();
    const inputRef = useRef()


    const addNewUser = async () => {
        try {
            await axios.post('http://127.0.0.1:3000/api/v1/authLec/signup', {
                name: fullname,
                email: Email,
                password: password,
                passwordConfirm: Confirmpassword,
                profileImage: photo,
                programme: Programming
            }

            )

        }
        catch (error) {
            console.log(error)
            toast.error(error.response.data.errors[0].msg)

        }
    }

    const handleImage = () => {
        inputRef.current.click()
    }


    const handelupload = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result)
            setPhoto(reader.result)
        }
        let upload = document.querySelector('#upload')
        let img = document.querySelector('#img')
        img.classList.remove('hide');
        upload.classList.add('hide')
    }
    return (
        <div>
            <Header />
            <div className='side-bar'>
                <Link to={"/CreateLecturer"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='CreateLecturer'>
                        <h2>Create Lecturer</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></g></svg>
                    </div>

                </Link>
                <div className='CreateStudent-page'>
                    <h2>Create Student</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></g></svg>
                </div>
                <Link to={"/AddCourses"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='AddCourses'>
                        <h2>Add Courses</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z" /><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" /></svg>
                    </div>
                </Link>
            </div>
            <div className='createaccountLec-continer'>
                <h3>Create Account Student</h3>

                <div className='div-addPhoto' onClick={handleImage} >
                    <svg id='upload' xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24"><path fill="currentColor"
                        d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z" /></svg>
                    <input accept='image/*' className='iupt-photo' type='file' ref={inputRef} onChange={handelupload} />
                    <img id='img' className='hide' src={photo} alt='' />
                    <h5>Add Photo</h5>

                </div>
                <div className='div-inputs'>
                    <input placeholder='Name *' type='text' onChange={(e) => setFullName(e.target.value)}></input>
                    <input placeholder='Email *' type='text' onChange={(e) => setEmail(e.target.value)}></input>
                    <input placeholder='Password *' type='password' onChange={(e) => setPassword(e.target.value)}></input>
                    <input placeholder='Confirm Password *' type='password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false} />
                <button onClick={addNewUser}>Create</button >

            </div>
        </div>
    )
}

export default CreateStu
