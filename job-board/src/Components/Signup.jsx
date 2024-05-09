import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../css/button.css"

function Signup() {
 
    const [isEmployer,setIsEmployer]=useState(false)
    const [username,setUsername]= useState("");
    const [organization,setOrganization]=useState("")
    const [fullName,setfullName]=useState("");
    const [skill,setSkill]=useState("")
    const [skills,setSkills]=useState([]);
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [success,setSuccess]=useState(false);
    const [error,setError]=useState(false);
    const [errorMessage,setErrorMessage]=useState("");
    const [isOtpVerified,setIsOtpVerified]=useState(false);
    const [isOtpSent,setIsOtpSent]=useState(false)
    const [otp,setOtp]=useState("")
    const [correctOtp,setCorrectOtp]=useState("")
    const [wrongOtpWritten,setWrongOtpWritten]=useState(false)

        
    const navigate=useNavigate();
    const handleSignup=async(e)=>{
        try {
            e.preventDefault();
            const url = `${import.meta.env.VITE_BACKEND_URL}/user/signup`
            const data={
                username,
                fullName,
                skills,
                email,
                password,isEmployer,organization
            }
            const user = await axios(url,{
                method: 'POST',
                mode:"no-cors",
            data:{
                ...data
            }
            })
            setSuccess(true)
        } catch (error) {
            setError(true);
            setErrorMessage(error.message)

        }
    }

    const sendOtp=async()=>{
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/sendotp`
        const data={
            email
        }
        const res = await axios(url,{
            method: 'POST',
            mode:"no-cors",
            data
        
        })
        const otpFromServer=res.data.data.toString()
    
        setCorrectOtp(otpFromServer);
        setIsOtpSent(true)

    }

    const verifyOtp=()=>{
        if(otp===correctOtp){
            setIsOtpVerified(true)
        }
        else{
            setWrongOtpWritten(true)
        }
    }

  return (
    <>
      <h1 style={{textAlign:"center"}} className='my-2'>Sign Up</h1>


      {success && <div className="alert alert-success" role="alert">
            Your account is created successfully  <Link to="/login"><button type="button" className="btn btn-primary">Login Now</button></Link>
</div>}

    {error && <div className="alert alert-danger" role="alert">
  Some error occured while signing up . <br />
  error : {errorMessage}<br/>
  please try again after some time
</div>}

                        <div className='d-flex justify-content-center align-items-ceter my-4 '>
                                <form className='w-50' >
                                <div className="form-check">
                            <input 
                            checked={isEmployer}
                            onChange={(e)=>{
                                setIsEmployer(e.target.checked)
                            }}
                            className="form-check-input" 
                            type="checkbox"  
                            id="flexCheckDefault"
                            />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Are you a Employer
                    </label>
                    </div>
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                    type="text"
                    className="form-control"
                    value={username}
                    id="Enter UserName"
                    placeholder="Enter UserName"
                    onChange={(e)=>{
                        return setUsername(e.target.value)
                    }}
                    />
                </div>
                    <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    id="fullName"
                    placeholder="Enter Your Full Name"
                    onChange={(e)=>(setfullName(e.target.value))}
                    />
                </div>

                {!isEmployer && 
                <>
                <div className="form-group">
                    <label htmlFor="skills">Skills</label>
                    {skills[0] && <p>skills you selected : {skills.map((item)=>{
                        return(<span>
                            <button className='btn btn-info m-1' onClick={(e)=>e.preventDefault()}>{item}</button> 
                        </span> )
                        })}</p>}
                    <input
                    type="text"
                    className="form-control"
                    value={skill}
                    id="skills"
                    placeholder="Enter Skills you have"
                    onChange={(e)=>{
                        setSkill(e.target.value)
                    
                    }}
                    onKeyDown={(e)=>{
                        if(e.key==="Enter"){
                        e.preventDefault()
                        setSkills((prevSkills)=>{prevSkills.push(skill)
                             return prevSkills});
                        setSkill("")
                        
                    }}}
                    />
                </div>
                
                <button  className="btn btn-success my-2" onClick={(e)=>{
                    e.preventDefault();
                    setSkills((prevSkills)=>{prevSkills.push(skill)
                        return prevSkills});
                   setSkill("")
                }}>
                    Add skill
                </button>
                </>
                }


                {isEmployer && <div className="form-group">
                    <label htmlFor="skills">Organization Name</label>
                    <input
                    type="text"
                    className="form-control"
                    value={organization}
                    id="skills"
                    placeholder="Name of Your Orgaization"
                    onChange={(e)=>{
                        setOrganization(e.target.value)
                    
                    }}
                    />
                </div>}

                <div className="form-group">
                    <label htmlFor="Email">Email address {isOtpVerified&& <span style={{color:"green"}}>verified</span>}</label>
                    <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    id="Email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    disabled={isOtpSent}
                    />
                </div>
                {wrongOtpWritten&&<p className='danger'>OTP was wrong</p>}
                {isOtpSent && !isOtpVerified && <div className='form-group'>
                    <label htmlFor='otp'>Enter Otp</label>
                    <input
                    type="number"
                    className='form-control'
                    value={otp}
                    onChange={(e)=>setOtp(e.target.value)}
                    id="otp"
                    placeholder='Enter Otp'
                    />
                    </div>}
                {!isOtpVerified && !isOtpSent && <button  className="btn btn-primary my-2" onClick={(e)=>{
                    e.preventDefault();
                    sendOtp();
                }}>
                    Send OTP
                </button>
                }
                {!isOtpVerified && isOtpSent &&<button  className="btn btn-primary my-2" onClick={(e)=>{
                    e.preventDefault();
                    verifyOtp();
                }}>
                    verify Otp
                </button>}
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    id="Password"
                    placeholder="Password"
                    />
                </div>
                <div className='d-flex justify-content-center align-items-center my-2'>
                
               {isOtpVerified && <button  className="btn btn-primary my-2" onClick={handleSignup}>
                    Sign up
                </button>
                }
                
                </div>
</form>
</div>
</>
  )
}


export default Signup
