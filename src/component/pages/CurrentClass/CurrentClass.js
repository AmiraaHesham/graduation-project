import React, { useState, useEffect, useRef } from 'react'
import './CurrentClass.css'
import { Link } from 'react-router-dom'
import Header from '../header/header'
import axios from 'axios'
import { toast, Toaster } from 'react-hot-toast';
import QRCode from "react-qr-code";
import { FaArrowsRotate } from "react-icons/fa6";

const CurrentClass = () => {

    useEffect(() => {
        getCoursePresent()
    }, [])
    // useEffect(() => {
    //     viewLectureAttendance()
    // }, [LectureAtten])
    const [course, setcourse] = useState([])
    const [LectureAtten, setLectureAtten] = useState([])
    const [courseId, setcourseId] = useState()
    const [LectureTitle, setLectureTitle] = useState()
    const [LectureNum, setLectureNum] = useState()
    const [lectureId, setlectureId] = useState()

    const subjectSelectRef = useRef()


    const getCoursePresent = async () => {

        try {
            const res = await axios.get('http://127.0.0.1:3000/api/v1/lecturer/lecturer_courses/' + localStorage.id
                , {
                    headers: {
                        "authorization": 'Bearer ' + localStorage.token
                    }

                },
            )
            setcourse(res.data.data)

        }


        catch (error) {
            console.log(error)
        }
    }
    const handleDivShowQR = () => {
        let divgenrat = document.querySelector('#genratQR')
        let AttendList = document.querySelector('#attendList')
        let list = document.querySelector('#list')
        let conteiner_attendList = document.querySelector('#conteiner_attendList')
        conteiner_attendList.classList.toggle('div-attendList-after')
        divgenrat.classList.toggle("hide")
        divgenrat.classList.toggle("generQR")
        AttendList.classList.toggle("attendList")
        AttendList.classList.toggle("attendList-after")
        list.classList.toggle('div-list-after')
        list.classList.toggle('div-list')
    }

    const handleShowAttendList = () => {
        let conteiner_attendList = document.querySelector('#conteiner_attendList')
        conteiner_attendList.classList.toggle("hide")
        conteiner_attendList.classList.toggle("div-attendList")
        viewLectureAttendance()
    }

    const btnGenratQR = async () => {

        try {

            if (subjectSelectRef.current.value !== "Choose Course...") {
                setcourseId(subjectSelectRef.current.value)
                const res = await axios.post(`http://127.0.0.1:3000/api/v1/attendance/takeAttendance/${courseId}/${lectureId}`, {},
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.token
                        }
                    })

                let QRimg = document.querySelector('#div-QRimg')
                QRimg.classList.remove('hide')
                console.log(res)

            }
            else (
                toast.error("Choose Course or Create Lecture")
            )
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleBtnClose = () => {
        let QRimg = document.querySelector('#div-QRimg')
        QRimg.classList.add('hide')
    }
    const handelBtnCreateLecture = () => {
        let divCreateLecture = document.querySelector('#div-create-lecture')
        divCreateLecture.classList.remove('hide')
        console.log(subjectSelectRef.current.value)

    }

    const handelBtnDiscard = () => {
        let divCreateLecture = document.querySelector('#div-create-lecture')
        divCreateLecture.classList.add('hide')
    }

    const handelBtnCreate = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:3000/api/v1/lecture',
                {
                    lectureTitle: LectureTitle,
                    lectureNumber: LectureNum,
                    course: subjectSelectRef.current.value
                },
                {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.token
                    }
                }

            )
            setlectureId(res.data.data.lecture._id)
            viewLectureAttendance()
            let divCreateLecture = document.querySelector('#div-create-lecture')
            divCreateLecture.classList.add('hide')
        }
        catch (error) {
            toast.error("Enter lectureTitle || lectureNumber || course")
        }

    }

    const viewLectureAttendance = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:3000/api/v1/attendance/viewLectureAttendance/' + lectureId, {},
                {
                    headers: {
                        "Authorization": "Bearer " + localStorage.token
                    }
                }
            )
            setLectureAtten(res.data.data.attendances)
            // console.log(res.data.data.attendances)

        }
        catch (error) {
            console.log(error)

        }
    }



    return (
        <div>
            <Toaster
                position="bottom-center"
                reverseOrder={true}
            />
            <Header />
            <div className='side-bar'>
                <Link to={"/Dashboard"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='Dashboard'>
                        <h2>Dashboard</h2>
                        <svg id='time' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill="currentColor"
                            d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-86 24-167t73-153h-97v-128h128v86q41-51 91-90t108-67t121-42t128-15q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128zM384 1024h128v128H384zm256 0h128v128H640zm0-256h128v128H640zm-256 512h128v128H384zm256 0h128v128H640zm384-384H896V768h128zm256 0h-128V768h128zm256 0h-128V768h128z" /></svg>
                    </div></Link>
                <div className='Current-Class-page '>
                    <h2>Current Class</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round"
                        d="M5.5 15.5c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293c-1.414 0-2.121 0-2.56-.44" /><path d="M5.5 8.5c0-1.414 0-2.121.44-2.56c.439-.44 1.146-.44 2.56-.44c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293C5.5 9.914 5.5 9.443 5.5 8.5Zm8 7c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44c-.943 0-1.414 0-1.707-.293c-.293-.293-.293-.764-.293-1.707z" /><path stroke-linecap="round" d="M18.5 8.5c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293c-.293-.293-.293-.764-.293-1.707v-1c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293c1.414 0 2.121 0 2.56.44M22 14v1m-8 7c3.771 0 5.657 0 6.828-1.172c.654-.653.943-1.528 1.07-2.828M10 22c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14m8-12C6.229 2 4.343 2 3.172 3.172C2.518 3.825 2.229 4.7 2.102 6M2 10V9" /><path stroke-linecap="round" d="M14 2c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10" /></g></svg>
                </div>

                <Link to={"/Timetable"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='Timetable'>
                        <h2>Timetable</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' viewBox="0 0 24 24"><g fill="currentColor"><path d="M8 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m3-1a1 1 0 1 0 2 0a1 1 0 0 0-2 0m5 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2m-5-5a1 1 0 1 0 2 0a1 1 0 0 0-2 0m5 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2M8 7a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2z" /><path fill-rule="evenodd"
                            d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm12 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1" clip-rule="evenodd" /></g></svg>
                    </div>
                </Link>

                <Link to={"/OverAll"} style={{ textDecoration: 'none', color: '#1D2649' }}>
                    <div className='Students-Attendance'>
                        <h2>Students’ Attendance</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor"
                            d="M17 24c3.867 0 7-3.133 7-7s-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7m22-3.5c0 3.039-2.461 5.5-5.5 5.5a5.499 5.499 0 0 1-5.5-5.5c0-3.039 2.461-5.5 5.5-5.5s5.5 2.461 5.5 5.5M17 26c2.734 0 7.183.851 10.101 2.545C28.293 29.758 29 31.081 29 32.4V38H4v-5.6c0-4.256 8.661-6.4 13-6.4m27 12H31v-5.6c0-1.416-.511-2.72-1.324-3.883c1.541-.344 3.058-.517 4.217-.517C37.62 28 44 29.787 44 33.333z" /></svg>
                    </div>
                </Link>
            </div>

            <div className='div-continer-currentclass'>
                <Toaster
                    position="bottom-center"
                    reverseOrder={true}
                />
                <div className='div-selectCourse-btn-Create-Lecture'>
                    <select ref={subjectSelectRef} className='selectCourse'>
                        <option> Choose Course... </option>
                        {course.map((course, index) => {
                            return <option key={index} value={course._id}>
                                {course.name} </option>
                        })
                        }
                    </select>
                    <button onClick={handelBtnCreateLecture} className='btn-Create-Lecture'>Create Lecture</button>
                </div>
                <div className='hide' id='div-create-lecture'>
                    <input placeholder='Lecture Title' type='text' onChange={(e) => setLectureTitle(e.target.value)}></input>
                    <input placeholder='Lecture Number' type='text' onChange={(e) => setLectureNum(e.target.value)}></input>
                    <div>
                        <button onClick={handelBtnCreate} className='btn-confirm'>CREATE</button>
                        <button onClick={handelBtnDiscard} className='btn-discard'>DISCARD</button>
                    </div>
                </div>
                <div className='div-QRcode' onClick={handleDivShowQR}>
                    <h3>QR Code</h3>
                </div>

                <div className='hide' id='div-QRimg'>

                    <QRCode
                        size={256}
                        fgColor={'#1D2649'}
                        style={{ marginLeft: "190px", marginTop: "40px", height: "auto", width: "65%", border: "10px solid #ffffff" }}
                        value={`CourseID: ${courseId} 
lectureId: ${lectureId}`}
                        viewBox={`0 0 256 256`}
                    />
                    <button onClick={handleBtnClose} className='btn-Close'>Close</button>
                </div>

                <div className='hide' id='genratQR'>
                    <button onClick={btnGenratQR} className='btn-genrat'>Generate QR code</button>
                </div>

                <div className='attendList' id='attendList' onClick={handleShowAttendList}>
                    <h3>Attendance List</h3>
                </div>

                <div className='hide' id='conteiner_attendList'>
                    <div className='btns-prs-aps'>
                        <button className='btn-present'>Present</button>
                        <button className='btn-absent'>Absent</button>
                        <button className='btn-refresh' onClick={viewLectureAttendance} ><FaArrowsRotate />                        </button>

                    </div>

                    <div className='div-list' id='list'>
                        <table className='tab-attend' style={{ width: '100%', border: 'none' }}>
                            <tr>
                                <th>#</th>
                                <th>NAME</th>
                                <th>STATUS</th>
                            </tr>
                            {LectureAtten.map((LectureAtten, index) => {
                                return <tr>
                                    <td>{index + 1}</td>
                                    <td>{LectureAtten.studentName}</td>
                                    <td>{LectureAtten.status}</td>
                                </tr>
                            })
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CurrentClass
