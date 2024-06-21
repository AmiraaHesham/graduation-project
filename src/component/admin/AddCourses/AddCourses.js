import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AddCourses.css'
import Header from '../header/header'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
const AddCourses = () => {
    const [LectureName, setLectureName] = useState('')
    const [LectureDay, setLectureDay] = useState('')
    const [LectureTime, setLectureTime] = useState('')
    const [LectureDuration, setLectureDuration] = useState('')
    const [Semsteryear, setSemsteryear] = useState('')
    const [Lecturers, setLecturers] = useState([])

    const inputRefLecName = useRef()
    const inputRefLecDay = useRef()
    const inputRefLecDuration = useRef()
    const inputRefSemsteryear = useRef()
    const inputRefLecTime = useRef()

    useEffect(() => {
        getAllLecturers()
    }, [])

    const createCourse = async () => {
        try {
            await axios.post('http://127.0.0.1:3000/api/v1/courses', {
                lecturerId: localStorage.id,
                name: LectureName,
                lectureDay: LectureDay,
                lectureDuration: LectureDuration,
                level: Semsteryear,
                lectureTime: LectureTime,
            }, {

                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
                    "Authorization": 'Bearer ' + localStorage.token
                }
            })
            inputRefLecDay.current.value = ''
            inputRefLecDuration.current.value = ''
            inputRefLecName.current.value = ''
            inputRefLecTime.current.value = ''
            inputRefSemsteryear.current.value = ''

        }
        catch (error) {
            if (inputRefLecName.current.value === '') {
                toast.error(error.response.data.errors[0].msg)
            }
            else if (inputRefLecDuration.current.value === '') {
                toast.error(error.response.data.error.errors.lectureDuration.message)
            }
            else if (inputRefLecDay.current.value === '') {
                toast.error(error.response.data.error.errors.lectureDay.message)
            }
            else if (inputRefLecTime.current.value === '') {
                toast.error(error.response.data.error.errors.lectureTime.message)
            }
            else if (inputRefSemsteryear.current.value === '') {
                toast.error(error.response.data.error.errors.level.message)
            }

        }

    }
    const handleBtnDiscard = () => {
        inputRefLecName.current.value = ''
        inputRefLecDuration.current.value = ''
        inputRefLecDay.current.value = ''
        inputRefSemsteryear.current.value = ''
        inputRefLecTime.current.value = ''
    }

    const getAllLecturers = async () => {

        const res = await axios.get('http://127.0.0.1:3000/api/v1/lecturer',
            {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.token
                }
            }
        )
        console.log(res.data.data)
    }
    return (
        <div>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
            <Header />
            <div className='side-bar'>
                <Link to={"/CreateLecturer"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='CreateLecturer'>
                        <h2>Create Lecturer</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></g></svg>
                    </div></Link>

                <Link to={"/CreateStudent"} style={{ textDecoration: 'none', color: '#1D2649' }}>

                    <div className='CreateStudent '>
                        <h2>Create Student</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></g></svg>
                    </div>
                </Link>
                <div className='AddCourses-page'>
                    <h2>Add Courses</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z" /><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" /></svg>
                </div>
            </div>
            <div className='div-courses'>

                <div className='add-course'>
                    <h3>Add Course</h3>
                    <hr></hr>
                    <div className='input-details-course'>
                        <input ref={inputRefLecName} placeholder='Lecture Name' onChange={(e) => { setLectureName(e.target.value) }} />
                        <input ref={inputRefLecDay} name='section' onChange={(e) => { setLectureDay(e.target.value) }} placeholder='Lecture Day' list='Days' />
                        <datalist id='Days'>
                            <option value='Sunday' >Sunday</option>
                            <option value='Monday' >Monday</option>
                            <option value='Tuesday' >Tuesday</option>
                            <option value='Wednesday' >Wednesday</option>
                            <option value='Thursday' >Thursday</option>
                        </datalist>

                        <input ref={inputRefLecTime} placeholder='Lecture Time' onChange={(e) => { setLectureTime(e.target.value) }} type='time' />
                        <input ref={inputRefLecDuration} placeholder='Lecture Duration' onChange={(e) => { setLectureDuration(e.target.value) }} />
                        <input ref={inputRefSemsteryear} placeholder='Semster Year' list='levels' onChange={(e) => { setSemsteryear(e.target.value) }} />
                        <datalist id='levels'>
                            <option value='1' />
                            <option value='2' />
                            <option value='3' />
                            <option value='4' />
                        </datalist>
                        {/* <select ref={subjectSelectRef} className='selectCourse'>
                        <option> Choose Course... </option>
                        {Lecturers.map((Lecture, index) => {
                            return <option key={index} value={course._id}>
                                {course.name} </option>
                        })
                        }
                    </select> */}
                        <div className='div-btn-dis-conf'>
                            <button onClick={createCourse} className='btn-confirm'>CONFIRM</button>
                            <button onClick={handleBtnDiscard} className='btn-discard'>DISCARD</button></div>
                    </div >
                </div >
            </div>
        </div>
    )
}

export default AddCourses
