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
import Assignments from './component/pages/Assignments/Assignments.js'
import StudentSolution from './component/pages/StudentSolution/StudentSolution.js'


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
        <Route path='/Assignments' element={<Assignments />} />
        <Route path='/StudentSolution' element={<StudentSolution />} />
      </Routes>
    </div>
  );
}

export default App;
