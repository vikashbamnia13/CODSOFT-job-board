import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import "../css/form.css"

function Login() {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const [success,setSuccess]=useState(false);
  const [error,setError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [loading,setLoading]=useState(false);

  const navigate=useNavigate()

  const [isLogin,setIsLogin]=useOutletContext()
  console.log(isLogin)

  let accessToken = Cookies.get("accessToken")
  console.log(accessToken)
  const handleLogin=async(e)=>{
    setLoading(true)
    try {
        e.preventDefault();
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/login`
        const data={
            email,
            password
        }
        const user = await axios(url,{
            method: 'POST',
            mode:"no-cors",
        data:{
            ...data
        }
        })
        const accesstoken = user.accesstoken;
        console.log(user.data.data.accessToken)
        Cookies.set("accessToken",user.data.data.accessToken)
        setSuccess(true)
        setLoading(false)
        setIsLogin(true)
        localStorage.setItem("accessToken",user.data.data.accessToken)
        navigate("/")
    } catch (error) {
        setError(true);
        setLoading(false)
        setErrorMessage(error.message)

    }
}

if(loading){
  return (<>
  <Loading/>
  </>)
}

  return (
    <>

    {success && <div className="alert alert-success" role="alert">
            You are logged in <Link to="/login"><button type="button" className="btn btn-primary">Login Now</button></Link>
</div>}

    {error && <div className="alert alert-danger" role="alert">
  Some error occured while Logging in . <br />
  error : {errorMessage}<br/>
  please try again after some timea
</div>}


    <div className='d-flex justify-content-center align-items-ceter my-4'>
   
<form action="" className="form_main">
    <p className="heading">Login</p>
    <div className="inputContainer">
        <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
        </svg>
        <input
      type="email"
      className="inputField"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      id="Email"
      aria-describedby="emailHelp"
      placeholder="Enter email"
    />
    </div>
    
<div className="inputContainer">
    <svg className="inputIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#2e2e2e" viewBox="0 0 16 16">
    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
    </svg>
    <input
      type="password"
      className="inputField"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      id="Password"
      placeholder="Password"
    />
</div>
              
           
<button id="button" onClick={handleLogin}>Submit</button>
    <a className="forgotLink" href="#">Forgot your password?</a>
</form>   

</div>
<Loading/>
</>
  )
}

export default Login
