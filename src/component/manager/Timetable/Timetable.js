import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './Timetable.css'
import Header from '../headerManager/headerManager'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';
import { FiEdit } from "react-icons/fi";

const Timetable = () => {

    const [LectureName, setLectureName] = useState('')
    const [LectureDay, setLectureDay] = useState('')
    const [LectureTime, setLectureTime] = useState('')
    const [LectureDuration, setLectureDuration] = useState('')
    const [Semsteryear, setSemsteryear] = useState('')
    const [currentIndex, setcurrentIndex] = useState('')
    const [courses, setcourses] = useState([])

    const inputRefLecName = useRef()
    const inputRefLecDay = useRef()
    const inputRefLecDuration = useRef()
    const inputRefSemsteryear = useRef()
    const inputRefLecTime = useRef()

    useEffect(() => {
        getCourses()
    }, [])

    const createCourse = async () => {
        try {
            await axios.post('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses', {
                lecturerId: localStorage.id,
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
            getCourses()
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
    const getCourses = async () => {
        try {
            const res = await axios.get(`https://attendance-by-qr-code-rrmg.vercel.app/api/v1/lecturer/lecturer_courses/${localStorage.id}`
                , {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                },
            )
            setcourses(res.data.data)
            console.log(res.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleBtnDiscard = () => {
        inputRefLecName.current.value = ''
        inputRefLecDuration.current.value = ''
        inputRefLecDay.current.value = ''
        inputRefSemsteryear.current.value = ''
        inputRefLecTime.current.value = ''
    }

    const handleBtnEditCourse = async (course) => {
        let saveEdit = document.querySelector('#saveEdit')
        let createCourse = document.querySelector('#createCourse')

        saveEdit.classList.remove('hide')
        saveEdit.classList.add('btn-confirm')
        createCourse.classList.add('hide')
        console.log(course._id)
        setcurrentIndex(course._id)
        console.log(currentIndex)

        inputRefLecDuration.current.value = course.lectureDuration
        inputRefLecDay.current.value = course.lectureDay
        inputRefLecTime.current.value = course.lectureTime
    }
    const editCourse = async () => {
        try {
            console.log(currentIndex)
            const res = await axios.put('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses/' + currentIndex,
                {
                    lectureDuration: inputRefLecDuration.current.value,
                    lectureDay: inputRefLecDay.current.value,
                    lectureTime: inputRefLecTime.current.value,
                },
                {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                }
            )
            getCourses()
            console.log(res)
            let saveEdit = document.querySelector('#saveEdit')
            let createCourse = document.querySelector('#createCourse')

            saveEdit.classList.add('hide')
            createCourse.classList.remove('hide')
            inputRefLecName.current.value = ''
            inputRefLecDuration.current.value = ''
            inputRefLecDay.current.value = ''
            inputRefSemsteryear.current.value = ''
            inputRefLecTime.current.value = ''
        }
        catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <Header />

            <div className='side-bar'>
                <Link to={"/Dashboard"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='Dashboard'>
                        <h2>Dashboard</h2>
                        <svg id='time' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill="currentColor"
                            d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-86 24-167t73-153h-97v-128h128v86q41-51 91-90t108-67t121-42t128-15q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128zM384 1024h128v128H384zm256 0h128v128H640zm0-256h128v128H640zm-256 512h128v128H384zm256 0h128v128H640zm384-384H896V768h128zm256 0h-128V768h128zm256 0h-128V768h128z" /></svg>
                    </div>
                </Link>
                <Link to={"/CurrentClass"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='Current-Class'>
                        <h2>Current Class</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round"
                            d="M5.5 15.5c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293c-1.414 0-2.121 0-2.56-.44" /><path d="M5.5 8.5c0-1.414 0-2.121.44-2.56c.439-.44 1.146-.44 2.56-.44c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293C5.5 9.914 5.5 9.443 5.5 8.5Zm8 7c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44c-.943 0-1.414 0-1.707-.293c-.293-.293-.293-.764-.293-1.707z" /><path strokeLinecap="round" d="M18.5 8.5c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293c-.293-.293-.293-.764-.293-1.707v-1c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293c1.414 0 2.121 0 2.56.44M22 14v1m-8 7c3.771 0 5.657 0 6.828-1.172c.654-.653.943-1.528 1.07-2.828M10 22c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14m8-12C6.229 2 4.343 2 3.172 3.172C2.518 3.825 2.229 4.7 2.102 6M2 10V9" /><path strokeLinecap="round" d="M14 2c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10" /></g></svg>
                    </div></Link>

                <div className='Timetable-page '>
                    <h2>Timetable</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' viewBox="0 0 24 24"><g fill="currentColor"><path d="M8 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m3-1a1 1 0 1 0 2 0a1 1 0 0 0-2 0m5 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2m-5-5a1 1 0 1 0 2 0a1 1 0 0 0-2 0m5 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2M8 7a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2z" /><path fillRule="evenodd"
                        d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm12 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1" clipRule="evenodd" /></g></svg>
                </div>

                <Link to={"/OverAll"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='Students-Attendance'>
                        <h2>Students’ Attendance</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor"
                            d="M17 24c3.867 0 7-3.133 7-7s-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7m22-3.5c0 3.039-2.461 5.5-5.5 5.5a5.499 5.499 0 0 1-5.5-5.5c0-3.039 2.461-5.5 5.5-5.5s5.5 2.461 5.5 5.5M17 26c2.734 0 7.183.851 10.101 2.545C28.293 29.758 29 31.081 29 32.4V38H4v-5.6c0-4.256 8.661-6.4 13-6.4m27 12H31v-5.6c0-1.416-.511-2.72-1.324-3.883c1.541-.344 3.058-.517 4.217-.517C37.62 28 44 29.787 44 33.333z" /></svg>
                    </div>
                </Link>

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
                        <div className='div-btn-dis-conf'>
                            <button onClick={createCourse} className='btn-confirm' id='createCourse'>CONFIRM</button>
                            <button onClick={editCourse} className='hide' id='saveEdit'>Save</button>
                            <button onClick={handleBtnDiscard} className='btn-discard'>DISCARD</button></div>
                    </div >
                </div >
                <div className='edit-course'>
                    <h3>Edit Courses</h3>
                    <hr></hr>
                    <div className='list-courses'>
                        {courses.map((course, index) => {
                            return <div key={index} className='div-course' >
                                <span style={{ color: '#0f1b49', marginLeft: '400px', fontSize: '26px', fontWeight: '900' }}>
                                    <span onClick={() => handleBtnEditCourse(course)} > <FiEdit /></span>
                                    {/* <span onClick={() => handleBtnDeleteCourse(course._id)}><MdDeleteOutline /></span> */}
                                </span>
                                <div style={{ margin: '-35px 0px 5px 5px ' }}>
                                    <span>Name: {course.name}</span>
                                    <br></br>
                                    <span> Day: {course.lectureDay}</span>
                                    <br></br>
                                    <span> Duration: {course.lectureDuration}</span>
                                    <br></br>
                                    <span>Time: {course.lectureTime}</span>
                                    <br></br>
                                    <span>Semster Year:   {course.level}</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div >
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
        </div >
    )
}

export default Timetable
