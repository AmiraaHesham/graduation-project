import './App.css';
import SignIn from './component/manager/SignIn/SignIn.js';
import './component/manager/SignIn/SignIn.js'
import { Routes, Route } from 'react-router-dom';
import CreateAccount from "./component/manager/CreateAccount/CreateAccount.js";
import Dashboard from './component/manager/Dashboard/Dashboard.js';
import CurrentClass from './component/manager/CurrentClass/CurrentClass.js'
import Timetable from './component/manager/Timetable/Timetable.js';
import OverAll from './component/manager/OverAll/OverAll.js';
import Weekly from './component/manager/Weekly/Weekly.js';
import Profile from './component/manager/Profile/Profile.js';
import AddCourses from './component/admin/AddCourses/AddCourses.js';
import CreateStu from './component/admin/CreateStu/CreateStu.js';
import CreateLec from './component/admin/CreateLec/CreateLec.js';
import AllStudents from './component/admin/AllStudents/AllStudents.js';
import AllLecturers from './component/admin/AllLecturer/AllLecturers.js';
import AllCourses from './component/admin/AllCourses/AllCourses.js';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <div className="App">
      <SpeedInsights />
      <Routes>
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/CurrentClass' element={<CurrentClass />} />
        <Route path='/Timetable' element={<Timetable />} />
        <Route path='/OverAll' element={<OverAll />} />
        <Route path='/Weekly' element={<Weekly />} />
        <Route path='/CreateLecturer' element={<CreateLec />} />
        <Route path='/CreateStudent' element={<CreateStu />} />
        <Route path='/AddCourses' element={<AddCourses />} />
        <Route path='/AllStudents' element={<AllStudents />} />
        <Route path='/AllLecturers' element={<AllLecturers />} />
        <Route path='/AllCourses' element={<AllCourses />} />

      </Routes>
    </div>
  );
}

export default App;
