import './App.css';
import SignIn from './component/pages/SignIn/SignIn.js';
import './component/pages/SignIn/SignIn.js'
import { Routes, Route } from 'react-router-dom';
import CreateAccount from "./component/pages/CreateAccount/CreateAccount.js";
import Dashboard from './component/pages/Dashboard/Dashboard.js';
import CurrentClass from './component/pages/CurrentClass/CurrentClass.js'
import Timetable from './component/pages/Timetable/Timetable.js';
import OverAll from './component/pages/OverAll/OverAll.js';
import Weekly from './component/pages/Weekly/Weekly.js';
import Profile from './component/pages/Profile/Profile.js';
import AddCourses from './component/admin/AddCourses/AddCourses.js';
import CreateStu from './component/admin/CreateStu/CreateStu.js';
import CreateLec from './component/admin/CreateLec/CreateLec.js';
function App() {
  return (
    <div className="App">

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

      </Routes>
    </div>
  );
}

export default App;
