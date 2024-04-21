import './App.css';
import SignIn from './component/pages/SignIn/SignIn.js';
import './component/pages/SignIn/SignIn.js'
import { Routes, Route } from 'react-router-dom';
import CreateAccount from "./component/pages/CreateAccount/CreateAccount.js";
import LecturesDates from './component/pages/LecturesDates/LecturesDates.js';
import CurrentClass from './component/pages/CurrentClass/CurrentClass.js'
import Timetable from './component/pages/Timetable/Timetable.js';
import OverAll from './component/pages/OverAll/OverAll.js';
import Weekly from './component/pages/Weekly/Weekly.js';
import Profile from './component/pages/Profile/Profile.js';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/CreateAccount' element={<CreateAccount />} />
        <Route path='/' element={<SignIn />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/LecturesDates' element={<LecturesDates />} />
        <Route path='/CurrentClass' element={<CurrentClass />} />
        <Route path='/Timetable' element={<Timetable />} />
        <Route path='/OverAll' element={<OverAll />} />
        <Route path='/Weekly' element={<Weekly />} />
      </Routes>
    </div>
  );
}

export default App;
