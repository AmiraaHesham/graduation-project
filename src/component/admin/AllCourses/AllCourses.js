import React, { useEffect, useRef, useState } from 'react'
import './AllCourses.css'
import { Link } from 'react-router-dom'
import Header from '../headerAdmin/headerAdmin'
import axios from 'axios'
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast'


const AllCourses = () => {
    const [Courses, setCourses] = useState([])
    const [searchCourses, setSearchCourses] = useState([])
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [lecturer, setLecturer] = useState('')
    const [Lecturers, setLecturers] = useState('')


    const searchCourseRef = useRef()
    const inputRefName = useRef()
    const inputRefLecturer = useRef()
    const inputRefLevel = useRef()
    const inputRefDay = useRef()
    const inputRefDuration = useRef()
    const inputRefTime = useRef()

    useEffect(() => {
        getAllCourses()
    }, [])

    const getAllCourses = async () => {
        try {
            const res = await axios.get('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses',
                {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                }
            )
            // if(res.data.data)
            setCourses(res.data.data)
            // console.log(res.data.data.lecturerId.name)
        }
        catch (error) {
            console.log(error)
        }
    }

    const deleteCourse = async (course) => {
        try {
            Swal.fire({
                title: `${course.name}`,
                text: 'Are You Sure Delete Course?',
                showCancelButton: true,
            }).then(async (data) => {
                if (data.isConfirmed) {
                    const res = await axios.delete('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses/' + course._id,
                        {
                            headers: {
                                "Authorization": 'Bearer ' + localStorage.token
                            }
                        }
                    )
                    console.log(res.data.data)
                    getAllCourses()
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    const searchCourse = async () => {
        try {
            let tbodySearchCourse = document.querySelector('#tbody-searchCourse')
            let tbodyAllCourses = document.querySelector('#tbody-AllCourses')

            const res = await axios.get('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses/search/' + searchCourseRef.current.value,
                {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                }
            )
            setSearchCourses(res.data.data.query)
            console.log(searchCourseRef.current.value)

            tbodyAllCourses.classList.add('hide')
            tbodySearchCourse.classList.remove('hide')

            if (searchCourseRef.current.value === '') {
                tbodyAllCourses.classList.remove('hide')
                tbodySearchCourse.classList.add('hide')
                getAllCourses()
                console.log(searchCourseRef.current.value)
            }

        }
        catch (error) {
            console.log(error)
        }
    }
    const getInfo = async (course) => {
        try {
            const res = await axios.get('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses/' + course._id,
                {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                }
            )
            setName(course.email)
            setId(course._id)
            setLecturer(course.lecturerId.name)
            getAllLecturers()

            inputRefDay.current.value = res.data.data.lectureDay
            inputRefName.current.value = res.data.data.name
            inputRefLevel.current.value = res.data.data.level
            inputRefTime.current.value = res.data.data.lectureTime
            inputRefDuration.current.value = res.data.data.lectureDuration
            let divEditData = document.querySelector('#div-EditDataCourse')
            divEditData.classList.remove('hide')
            divEditData.classList.add('div-EditDataCourse')
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleBtnClose = () => {
        let divEditData = document.querySelector('#div-EditDataCourse')
        divEditData.classList.add('hide')
    }

    const handleBtnSeveEdit = async () => {
        try {
            let divEditData = document.querySelector('#div-EditDataCourse')
            divEditData.classList.add('hide')
            if (inputRefName.current.value !== name) {
                const res = await axios.put('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses/' + id,
                    {
                        name: inputRefName.current.value,
                        lecturerId: inputRefLecturer.current.value,
                        level: inputRefLevel.current.value,
                        lectureTime: inputRefTime.current.value,
                        lectureDay: inputRefDay.current.value,
                        lectureDuration: inputRefDuration.current.value
                    },
                    {
                        headers: {
                            "Authorization": 'Bearer ' + localStorage.token
                        }
                    }
                )
                console.log(res)
                toast.success('succsess Edit')
            }
            else {
                const res = await axios.put('https://attendance-by-qr-code-rrmg.vercel.app/api/v1/courses/' + id,
                    {
                        lecturerId: inputRefLecturer.current.value,
                        level: inputRefLevel.current.value,
                        lectureTime: inputRefTime.current.value,
                        lectureDay: inputRefDay.current.value,
                        lectureDuration: inputRefDuration.current.value
                    },
                    {
                        headers: {
                            "Authorization": 'Bearer ' + localStorage.token
                        }
                    }
                )
                console.log(res)
                toast.success('succsess Edit')
            }
            getAllCourses()
        }
        catch (error) {
            console.log(error)
        }

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
        console.log(res.data.data)
    }

    return (
        <div>
            <Header />
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
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
                <Link to={"/AddCourses"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='AddCourses'>
                        <h2>Add Courses</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z" /><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z" /></svg>
                    </div></Link>
                <div className='AllCourses-page'>
                    <h2>All Courses</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v15h3V3zm3 2l4 13l3-1l-4-13zM5 5v13h3V5zM3 19v2h18v-2z" /></svg>
                </div>
            </div>
            <div className='div-All-Lectrer-Student'>
                <div className='hide' id='div-EditDataCourse'>
                    <h4>Name</h4>
                    <input ref={inputRefName} className='inpEditName' />
                    <h4>Day</h4>
                    <input ref={inputRefDay} className='inpEditDay' />
                    <h4>Level</h4>
                    <input ref={inputRefLevel} className='inpEditlevel' />
                    <h4>Time</h4>
                    <input ref={inputRefTime} className='inpEditTime' />
                    <h4>Duration</h4>
                    <input ref={inputRefDuration} className='inpEditDuration' />

                    <h4>lecturer</h4>
                    <select ref={inputRefLecturer} className='inputLecturer'>
                        <option>{lecturer}</option>
                        {Array.isArray(Lecturers) && Lecturers.length > 0 ? (
                            Lecturers.map((Lecturer, index) => (
                                <option
                                    className={Lecturer.role === 'admin' ? 'hide' : ''}
                                    key={index}
                                    value={Lecturer._id}
                                >
                                    {Lecturer.name}
                                </option>
                            ))
                        ) : (
                            <option>No Lecturers Available</option>
                        )}
                    </select>

                    <button onClick={handleBtnSeveEdit} style={{ background: '#022f5c' }} >Save</button>
                    <button onClick={handleBtnClose} style={{ background: 'rgba(165, 42, 42, 0.836)' }} >Close</button>
                </div>
                <div style={{ marginLeft: '20px' }}>

                    <svg xmlns="http://www.w3.org/2000/svg" id='time' color='#1D2649' width="60" height="60" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v15h3V3zm3 2l4 13l3-1l-4-13zM5 5v13h3V5zM3 19v2h18v-2z" /></svg>
                    <input ref={searchCourseRef} className='input-search' placeholder='Search ' onChange={searchCourse} />

                    <h2 style={{
                        marginLeft: '80px', marginTop: '-55px', fontSize: '35px', color: '#1D2649',
                        fontWeight: 'bold', width: '100px'
                    }}>Courses</h2>
                </div>

                <div className='div-list-overall' id='list'>
                    <table className='tab-attend' style={{ width: '100%', border: 'none' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NAME</th>
                                <th>Lecturer</th>
                                <th>Day</th>
                                <th>Level</th>
                                <th>Time</th>
                                <th>Duration</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody id='tbody-AllCourses'>
                            {Courses.map((course, index) => {
                                return <tr key={index}>
                                    <td >{index + 1}</td>
                                    <td >{course.name}</td>
                                    <td>{course.lecturerId ? course.lecturerId.name : 'No Lecturer Assigned'}</td>
                                    <td>{course.lectureDay}</td>
                                    <td> {course.level}</td>
                                    <td> {course.lectureTime}</td>
                                    <td> {course.lectureDuration}</td>
                                    <td><button className='btn-editLecturer' onClick={() => getInfo(course)} ><FiEdit /></button> </td>
                                    <td><button className='btn-deleteLecturer' onClick={() => deleteCourse(course)}><MdDeleteOutline /></button></td>
                                </tr>
                            })
                            }</tbody>
                        <tbody className='hide' id='tbody-searchCourse'>
                            {searchCourses.map((course, index) => {
                                return <tr>
                                    <td >{index + 1}</td>
                                    <td >{course.name}</td>
                                    <td>{course.lectureDay}</td>
                                    <td> {course.level}</td>
                                    <td>  {course.lectureTime}</td>
                                    <td> {course.lectureDuration}</td>
                                    <td><button className='btn-editLecturer' ><FiEdit /></button> </td>
                                    <td><button className='btn-deleteLecturer' onClick={() => deleteCourse(course)}><MdDeleteOutline /></button></td>
                                </tr>
                            })
                            }</tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllCourses
