import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './OverAll.css'
import Header from '../header/header'
import axios from 'axios'
const OverAll = () => {
  const [course, setCourse] = useState([])

  useEffect(() => {
    getCourses()
  })

  const getCourses = async () => {
    // try {
    //   const res = await axios.get('http://127.0.0.1:3000/api/v1/courses',
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //         "Access-Control-Allow-Credentials": "true",
    //         "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    //         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    //         "Authorization": 'Bearer ' + localStorage.token
    //       }
    //     })
    //   setCourse(res.data.data.name)

    // }
    // catch (error) {
    //   console.log(error)
    // }
  }


  return (
    <div>
      <Header />
      <div className='side-bar'>
        <Link to={"/LecturesDates"} style={{ textDecoration: 'none', color: '#1D2649' }}>
          <div className='Lecture-Dates'>
            <h2>Lectures Dates</h2>
            <svg id='time' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path fill="currentColor"
              d="M1792 993q60 41 107 93t81 114t50 131t18 141q0 119-45 224t-124 183t-183 123t-224 46q-91 0-176-27t-156-78t-126-122t-85-157H128V128h256V0h128v128h896V0h128v128h256zM256 256v256h1408V256h-128v128h-128V256H512v128H384V256zm643 1280q-3-31-3-64q0-86 24-167t73-153h-97v-128h128v86q41-51 91-90t108-67t121-42t128-15q100 0 192 33V640H256v896zm573 384q93 0 174-35t142-96t96-142t36-175q0-93-35-174t-96-142t-142-96t-175-36q-93 0-174 35t-142 96t-96 142t-36 175q0 93 35 174t96 142t142 96t175 36m64-512h192v128h-320v-384h128zM384 1024h128v128H384zm256 0h128v128H640zm0-256h128v128H640zm-256 512h128v128H384zm256 0h128v128H640zm384-384H896V768h128zm256 0h-128V768h128zm256 0h-128V768h128z" /></svg>
          </div>
        </Link>
        <Link to={"/CurrentClass"} style={{ textDecoration: 'none', color: '#1D2649' }}>
          <div className='Current-Class'>
            <h2>Current Class</h2>
            <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round"
              d="M5.5 15.5c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293c-1.414 0-2.121 0-2.56-.44" /><path d="M5.5 8.5c0-1.414 0-2.121.44-2.56c.439-.44 1.146-.44 2.56-.44c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707v1c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293C5.5 9.914 5.5 9.443 5.5 8.5Zm8 7c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293h1c.943 0 1.414 0 1.707.293c.293.293.293.764.293 1.707c0 1.414 0 2.121-.44 2.56c-.439.44-1.146.44-2.56.44c-.943 0-1.414 0-1.707-.293c-.293-.293-.293-.764-.293-1.707z" /><path stroke-linecap="round" d="M18.5 8.5c0 .943 0 1.414-.293 1.707c-.293.293-.764.293-1.707.293h-1c-.943 0-1.414 0-1.707-.293c-.293-.293-.293-.764-.293-1.707v-1c0-.943 0-1.414.293-1.707c.293-.293.764-.293 1.707-.293c1.414 0 2.121 0 2.56.44M22 14v1m-8 7c3.771 0 5.657 0 6.828-1.172c.654-.653.943-1.528 1.07-2.828M10 22c-3.771 0-5.657 0-6.828-1.172C2 19.657 2 17.771 2 14m8-12C6.229 2 4.343 2 3.172 3.172C2.518 3.825 2.229 4.7 2.102 6M2 10V9" /><path stroke-linecap="round" d="M14 2c3.771 0 5.657 0 6.828 1.172C22 4.343 22 6.229 22 10" /></g></svg>
          </div></Link>

        <Link to={"/Timetable"} style={{ textDecoration: 'none', color: '#1D2649' }}>
          <div className='Timetable'>
            <h2>Timetable</h2>
            <svg xmlns="http://www.w3.org/2000/svg" id='time' viewBox="0 0 24 24"><g fill="currentColor"><path d="M8 13a1 1 0 1 1 0-2a1 1 0 0 1 0 2m0 4a1 1 0 1 1 0-2a1 1 0 0 1 0 2m3-1a1 1 0 1 0 2 0a1 1 0 0 0-2 0m5 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2m-5-5a1 1 0 1 0 2 0a1 1 0 0 0-2 0m5 1a1 1 0 1 1 0-2a1 1 0 0 1 0 2M8 7a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2z" /><path fill-rule="evenodd"
              d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3zm12 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1" clip-rule="evenodd" /></g></svg>
          </div> </Link>
        <Link to={"/Assignments"} style={{ textDecoration: 'none', color: '#1D2649' }}>
          <div className='Assignments'>
            <h2>Assignments</h2>
            <svg id='time' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-7 0c.55 0 1 .45 1 1s-.45 1-1 1s-1-.45-1-1s.45-1 1-1m1 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1m3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1" /></svg>
          </div>
        </Link>
        <div className='Students-Attendance-page '>
          <h2>Students’ Attendance</h2>
          <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 48 48"><path fill="currentColor"
            d="M17 24c3.867 0 7-3.133 7-7s-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7m22-3.5c0 3.039-2.461 5.5-5.5 5.5a5.499 5.499 0 0 1-5.5-5.5c0-3.039 2.461-5.5 5.5-5.5s5.5 2.461 5.5 5.5M17 26c2.734 0 7.183.851 10.101 2.545C28.293 29.758 29 31.081 29 32.4V38H4v-5.6c0-4.256 8.661-6.4 13-6.4m27 12H31v-5.6c0-1.416-.511-2.72-1.324-3.883c1.541-.344 3.058-.517 4.217-.517C37.62 28 44 29.787 44 33.333z" /></svg>
        </div>
        <div className='div-OverAll'>
          <div className='Over-All'>
            <h2>Over All</h2>
            <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 14 14"><path fill="currentColor" fill-rule="evenodd" d="M1.5.75a.75.75 0 0 0-1.5 0v12.5c0 .414.336.75.75.75h12.5a.75.75 0 0 0 0-1.5H1.5V9.72l2.202-2.352c.291.166.628.26.986.26c.454 0 .872-.15 1.208-.406L7.319 8.55a2.002 2.002 0 1 0 3.387-.71l.002-.005l1.159-3.183a1.999 1.999 0 1 0-1.437-.438l-1.081 2.97a2.029 2.029 0 0 0-1.057.223L6.75 5.967a.758.758 0 0 0-.08-.065a1.998 1.998 0 1 0-3.902.274l-.03.029L1.5 7.525z" clip-rule="evenodd" /></svg>
          </div>
        </div>

        <Link to={'/Weekly'} style={{ textDecoration: 'none', color: '#1D2649' }}>
          <div className='div-Weekly-OverAll'>
            <div className='Weekly-OverAll'>
              <h2>Weekly</h2>
              <svg xmlns="http://www.w3.org/2000/svg" id='time' width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 1h10v2h4v20H3V3h4zm0 4H5v16h14V5h-2v2H7zm8-2H9v2h6z" /></svg>
            </div>
          </div></Link>


      </div>
      <div className='div-chooseSubject'>
        <div className='div-chooseSubject'>

        </div>
      </div>
    </div>
  )
}

export default OverAll
