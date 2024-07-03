import { Link } from 'react-router-dom'
import './CreateStu.css'
import Header from '../headerAdmin/headerAdmin'
import React, { useEffect, useRef, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
const CreateStu = () => {
    const [photo, setPhoto] = useState();
    const [courses, setcourse] = useState([]);
    const [coursesSelect, setCoursesSelect] = useState([]);


    const inputphotoRef = useRef()
    const inputConfirmPassRef = useRef()
    const inputPasswordRef = useRef()
    const inputEmailRef = useRef()
    const inputNameRef = useRef()
    const inputRefSemsteryear = useRef()
    // const inputRef = useRef()

    useEffect(() => {
        getAllCourses()
    }, [])

    const addNewUser = async () => {
        try {
            const res = await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/student', {
                name: inputNameRef.current.value,
                email: inputEmailRef.current.value,
                password: inputPasswordRef.current.value,
                passwordConfirm: inputConfirmPassRef.current.value,
                profileImage: photo,
                courses: coursesSelect,
                programme: 'is'
            }, {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.token
                }
            }
            )
            inputNameRef.current.value = ''
            inputEmailRef.current.value = ''
            inputPasswordRef.current.value = ''
            inputConfirmPassRef.current.value = ''
            setPhoto('')
            console.log(res)
        }
        catch (error) {
            console.log(error)
            toast.error(error.response.data.errors[0].msg)
        }
    }

    const handleImage = () => {
        inputphotoRef.current.click()
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

    const getAllCourses = async () => {
        try {
            const res = await axios.get('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses',
                {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                }
            )
            setcourse(res.data.data)
        }
        catch (error) {

        }
    }

    const handleSelectCourses = (event) => {

        if (event.target.checked === true) {
            setCoursesSelect([...coursesSelect, event.target.name])
            console.log(event.target.checked)
        }







    }
    const showDivCheakboxeCourses = () => {
        let divcheekbox = document.querySelector('#div-cheekbox')
        divcheekbox.classList.add('div-cheekbox')
        divcheekbox.classList.remove('hide')
    }
    const btn = () => {
        console.log({ coursesSelect })

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
                <Link to={"/AllLecturers"} style={{ textDecoration: 'none', color: '#1D2649' }}>

                    <div className='AllLecturers '>
                        <h2>All Lecturers</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="30" height="24" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4" /></svg>
                    </div>
                </Link>
                <div className='CreateStudent-page'>
                    <h2>Create Student</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></g></svg>
                </div>
                <Link to={"/AllStudents"} style={{ textDecoration: 'none', color: '#1D2649' }}>

                    <div className='AllStudents '>
                        <h2>All Students</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="30" height="24" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4" /></svg>
                    </div>
                </Link>
                <Link to={"/AddCourses"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='AddCourses'>
                        <h2>Add Courses</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z" /><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" /></svg>
                    </div>
                </Link>
                <Link to={"/AllCourses"} style={{ textDecoration: 'none', color: '#1D2649' }}> <div className='AllCourses'>
                    <h2>All Courses</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v15h3V3zm3 2l4 13l3-1l-4-13zM5 5v13h3V5zM3 19v2h18v-2z" /></svg>                </div></Link>
            </div>
            <div className='createAccountStudent-continer'>
                <h3>Create Account Student</h3>

                <div className='div-addPhoto' onClick={handleImage} >
                    <svg id='upload' xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24"><path fill="currentColor"
                        d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z" /></svg>
                    <input accept='image/*' className='iupt-photo' type='file' ref={inputphotoRef} onChange={handelupload} />
                    <img id='img' className='hide' src={photo} alt='' />
                    <h5>Add Photo</h5>

                </div>
                <div className='div-inputs'>
                    <input placeholder='Name *' type='text' ref={inputNameRef}></input>
                    <input placeholder='Email *' type='text' ref={inputEmailRef} ></input>
                    <input placeholder='Password *' type='password' ref={inputPasswordRef}></input>
                    <input placeholder='Confirm Password *' type='password' ref={inputConfirmPassRef}></input>
                    <input ref={inputRefSemsteryear} placeholder='Semster Year *' list='levels' />
                    <datalist id='levels'>
                        <option value='1' />
                        <option value='2' />
                        <option value='3' />
                        <option value='4' />
                    </datalist>
                    <input onClick={showDivCheakboxeCourses} placeholder='Courses *' ></input>

                </div>
                <div className='hide' id='div-cheekbox'>
                    {
                        courses.map((course, index) => {
                            return <label key={index} >
                                <input type="checkbox" name={course.name} value={course._id} onChange={handleSelectCourses} />
                                {course.name} <br />
                            </label>

                        })
                    }
                    <button onClick={btn}>Save</button>
                </div>
                <Toaster
                    position="bottom-center"
                    reverseOrder={false} />
                <button className='btn-createStudent' onClick={addNewUser}>Create</button >

            </div>
        </div>
    )
}

export default CreateStu
