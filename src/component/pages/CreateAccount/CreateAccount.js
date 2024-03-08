import React from 'react';
import './CreateAccount.css';
import { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateAccount = () => {
    const [fullname, setFullName] = useState([]);
    const [Email, setEmail] = useState([]);
    const [password, setPassword] = useState([]);
    const [Confirmpassword, setConfirmPassword] = useState([]);
    const empty = useRef();

    const addNewUser = async () => {
        await axios.post('http://localhost:9000/users', {
            name: fullname,
            email: Email,
            password: password
        })
    }




    const handleCreate = async () => {

        if (empty.current.value !== '' && password === Confirmpassword) {
            let create = document.querySelector('#btn-create');
            let signin = document.querySelector('#btn-signin');
            create.classList.add("hide");
            signin.classList.remove("hide");
            await addNewUser();
            toast.success('Created Account', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light",
                transition: 'Bounce',
            });
        }


    }


    return (
        <div>
            <div className='createaccount-continer'>
                <h3>Create Account </h3>
                <div className='div-addPhoto' >
                    <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24"><path fill="currentColor"
                        d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13q0-1.875-1.312-3.187T11 8.5q-1.875 0-3.187 1.313T6.5 13q0 1.875 1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13q0-1.05.725-1.775T11 10.5q1.05 0 1.775.725T13.5 13q0 1.05-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z" /></svg>
                    <h5>Add Photo</h5>

                </div>
                <div className='div-inputs'>
                    <input placeholder='Full Name' type='text' ref={empty} onChange={(e) => setFullName(e.target.value)}></input>
                    <input placeholder='Email' type='text' ref={empty} onChange={(e) => setEmail(e.target.value)}></input>
                    <input placeholder='Password' type='password' ref={empty} onChange={(e) => setPassword(e.target.value)}></input>
                    <input placeholder='Confirm Password' type='password' ref={empty} onChange={(e) => setConfirmPassword(e.target.value)}></input>
                </div>
                < ToastContainer />
                <button className='btn-create' id='btn-create' onClick={handleCreate}>Create</button >
                <Link to="/SignIn" ><button className='hide' id='btn-signin'>SignIn</button ></Link>

            </div>
        </div>
    )
}

export default CreateAccount
