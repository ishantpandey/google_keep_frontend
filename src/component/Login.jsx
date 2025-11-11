import React, { useState,useContext } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import UserContext from '../context/userContext';
import  '../styles/login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

function Login() {
    const  {LogedIn ,setLogedIn}  = useContext(UserContext)
    const navigate = useNavigate()
    const [val, setval] = useState({
        names: '',
        email: '',
        phone: '',
        password: ''
    })
    const handleEvent = (e) => {
        const { name, value } = e.target;
        setval({
            ...val,
            [name]: value
        })

    }
    const formSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await fetch(`${BASE_URL}/api/login`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(val),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            const userdata = await user.json()
            console.log(userdata);
            setval({

                email: '',
                password: ''
            })
            
            if (userdata.msg === "true") {
                setLogedIn(true)
                toast.success("Logined")
                navigate('/')
               
            }
            else {
                toast.error("Login Failed")
                navigate('/login')
            }

        } catch (error) {
            console.log(error);
        }


    }
    return (
        <>
          {LogedIn ? navigate('/') : 
           <div className='loginpage'>
           <div class="box">
	<form onSubmit={formSubmit}>
		<span class="text-center-icon "><span class="material-symbols-outlined icon">
person
</span></span>
	<div class="input-container">
		<input type="email"ariaDescribedby = "emailHelp" name='email' value={val.email} onChange={handleEvent} required />
		<label>Email</label>		
	</div>
	<div class="input-container">		
		<input type="password"  name='password' value={val.password} onChange={handleEvent} required/>
		<label>Password</label>
	</div>
    <div className='register-link'>
    <NavLink htmlFor = "exampleInputEmail1" className="text-light" to={'/register'}><label>Create an account ?</label></NavLink>
              
    </div>
		<div className='text-center'>
        <button type="submit" class="login-btn">submit</button>
        </div>
</form>	
</div>
</div>
}        
 <ToastContainer/>           
        </>
    )
}

export default Login
