import React from 'react';
import './CreateAccount.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast, Toaster } from 'react-hot-toast'

const CreateAccount = () => {
    const [fullname, setFullName] = useState([]);
    const [Email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [Confirmpassword, setConfirmPassword] = useState([]);
    const [programme, setprogramme] = useState([]);
    const [photo, setPhoto] = useState([]);
    const inputRef = useRef()
    const navigate = useNavigate();
    // const headers = {
    //     'authorization': 'Bearer '
    // }

    const addNewUser = async () => {
        try {
            const res = await axios.post('http://127.0.0.1:3000/api/v1/authLec/signup', {
                name: fullname,
                email: Email,
                password: password,
                passwordConfirm: Confirmpassword,
                programme: programme,
                profileImage: photo,
            }
                , {
                    headers: {
                        Accept: 'application/json, text/plain, */*',
                        "Content-Type": 'application/json'
                    }
                }


            )



            if (res.data.data.active === true) {
                navigate('/SignIn')
            }
        }
        catch (error) {
            console.log(error.response)
            toast.error(error.response.data.errors[0].msg)

        }


    }


    const handleImage = () => {
        inputRef.current.click()
    }
    const handelupload = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result)
            setPhoto(reader.result)
        }

        let upload = document.querySelector('#upload')
        let img = document.querySelector('#img')
        img.classList.remove('hide');
        upload.classList.add('hide')
    }

    return (
        <div>
            <div className='createaccount-continer'>
                <h3>Create Account </h3>
                <div className='div-addPhoto' onClick={handleImage} >
                    <svg id='upload' xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24"><path fill="currentColor"
                        d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z" /></svg>
                    <h5>Add Photo</h5>
                    <input accept='image/*' className='iupt-photo' type='file' ref={inputRef} onChange={handelupload} />

                    <img id='img' className='hide' src={photo} alt='' />

                </div>
                <div className='div-inputs'>
                    <input placeholder='Full Name' type='text' onChange={(e) => setFullName(e.target.value)}></input>
                    <input placeholder='Email' type='text' onChange={(e) => setEmail(e.target.value)}></input>
                    <input placeholder='Password' type='password' onChange={(e) => setPassword(e.target.value)}></input>
                    <input placeholder='Confirm Password' type='password' onChange={(e) => setConfirmPassword(e.target.value)}></input>
                    <input placeholder='programme ' type='text' onChange={(e) => setprogramme(e.target.value)}></input>
                </div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <button className='btn-create' id='btn-create' onClick={addNewUser}>Create</button >


            </div>
        </div>
    )
}

export default CreateAccount
