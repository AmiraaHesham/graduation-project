import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './AddCourses.css'
import Header from '../headerAdmin/headerAdmin'
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
    const lecturersSelectRef = useRef()

    useEffect(() => {
        getAllLecturers()
    }, [])

    const createCourse = async () => {
        try {
            console.log(lecturersSelectRef.current.value)
            await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses', {
                lecturerId: lecturersSelectRef.current.value,
                name: LectureName,
                lectureDay: LectureDay,
                lectureDuration: LectureDuration,
                level: Semsteryear,
                lectureTime: LectureTime,
            }, {

                headers: {
                    "Authorization": 'Bearer ' + localStorage.token
                }
            })

            inputRefLecDay.current.value = ''
            inputRefLecDuration.current.value = ''
            inputRefLecName.current.value = ''
            inputRefLecTime.current.value = ''
            inputRefSemsteryear.current.value = ''
            lecturersSelectRef.current.value = 'Choose Lectrer...'
            toast.success('success add the course')

        }
        catch (error) {
            console.log(error)
            if (inputRefLecName.current.value === '') {
                toast.error('Enter Lecture name')
            }
            else if (inputRefLecDuration.current.value === '') {
                toast.error('Enter Duration')
            }
            else if (inputRefLecDay.current.value === '') {
                toast.error('Enter Day')
            }
            else if (inputRefLecTime.current.value === '') {
                toast.error('Enter Time')
            }
            else if (inputRefSemsteryear.current.value === '') {
                toast.error('Enter Semster year')
            }
            else if (lecturersSelectRef.current.value === 'Choose Lectrer...') {
                toast.error('Choose Lectrer...')
            }
        }

    }
    const handleBtnDiscard = () => {
        inputRefLecName.current.value = ''
        inputRefLecDuration.current.value = ''
        inputRefLecDay.current.value = ''
        inputRefSemsteryear.current.value = ''
        inputRefLecTime.current.value = ''
        lecturersSelectRef.current.value = 'Choose Lectrer...'

    }

    const getAllLecturers = async () => {

        const res = await axios.get('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/lecturer',
            {
                headers: {
                    "Authorization": 'Bearer ' + localStorage.token
                }
            }
        )

        // if(res.data.data)
        setLecturers(res.data.data)
        // console.log(res.data.data[0].role)
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
                <Link to={"/AllLecturers"} style={{ textDecoration: 'none', color: '#1D2649' }}>

                    <div className='AllLecturers '>
                        <h2>All Lecturers</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="30" height="24" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4" /></svg>
                    </div>
                </Link>
                <Link to={"/CreateStudent"} style={{ textDecoration: 'none', color: '#1D2649' }}>

                    <div className='CreateStudent '>
                        <h2>Create Student</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="currentColor" d="M16 14a5 5 0 0 1 5 5v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1a5 5 0 0 1 5-5zm4-6a1 1 0 0 1 1 1v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 1 1 0-2h1V9a1 1 0 0 1 1-1m-8-6a5 5 0 1 1 0 10a5 5 0 0 1 0-10" /></g></svg>
                    </div>
                </Link>
                <Link to={"/AllStudents"} style={{ textDecoration: 'none', color: '#1D2649' }}>

                    <div className='AllStudents '>
                        <h2>All Students</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="30" height="24" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64s-64 28.7-64 64s28.7 64 64 64m32 32h-64c-17.6 0-33.5 7.1-45.1 18.6c40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64m-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32S208 82.1 208 144s50.1 112 112 112m76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2m-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4" /></svg>
                    </div>
                </Link>
                <div className='AddCourses-page'>
                    <h2>Add Courses</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z" /><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" /></svg>
                </div>
                <Link to={"/AllCourses"} style={{ textDecoration: 'none', color: '#1D2649' }}> <div className='AllCourses'>
                    <h2>All Courses</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v15h3V3zm3 2l4 13l3-1l-4-13zM5 5v13h3V5zM3 19v2h18v-2z" /></svg>                </div></Link>
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
                        <select ref={lecturersSelectRef} className='selectLecturer'>
                            <option> Choose Lectrer... </option>
                            {Lecturers.map((Lecturer, index) => {
                                return <option className={Lecturer.role === 'admin' ? 'hide' : ''} key={index} value={Lecturer._id}>
                                    {Lecturer.name} </option>
                            })
                            }
                        </select>
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
