import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./header.css"
const Header = () => {

    const [name, setName] = useState();
    const [profileImage, setprofileImage] = useState();
    useEffect(() => {
        sessionDoctor()
    }
        , [])
    const sessionDoctor = () => {
        const name = localStorage.name;
        const profileImage = localStorage.profileImage;
        setName(name)
        if (profileImage !== 'undefined' || profileImage !== '') {
            setprofileImage(profileImage);
        }
        else {
            setprofileImage('logoUser.png');
        }
    }

    return (
        <div>
            <div className='header' >
                <Link to={'/Dashboard'}><svg id='time' xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200" ><path fill="currentColor"
                    d="M0 0v240h1200V0zm0 480v240h1200V480zm0 480v240h1200V960z" /></svg></Link>
                <h4>Smart Attendance System</h4>
            </div>

            <Link to={'/Profile'}> <div className='profile'>
                <div className='profile-picture'>
                    <img src={profileImage} alt='' />
                </div>
                <div className='profile-nameLec'>
                    {name}
                </div>
            </div></Link>

            <div className='div-infoProfile'>
                {/* <div className='cheld-infoProfile'>

                </div> */}
            </div>
        </div>
    )
}

export default Header
