import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isLogin] = useOutletContext();
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center my-5" style={{height:"400px",fontSize:"20px"}}>
        <h2 style={{fontSize:"70px"}}>Search ,Apply</h2>
        <h2 style={{fontSize:"80px"}}>And get Your <span className="text-success">Dream Job</span></h2>
        <p style={{fontSize:"30px"}}>Start Your hunt for the best life changing career opportunity</p>
        <button type="button" onClick={()=>{
          navigate("/browsejobs")
        }} className="btn btn-info " style={{height:"60px",fontSize:"30px",color:"white"}}>Browse Jobs</button>
        <Link to={isLogin?"/postjob":"/signup"} style={{textDecoration:"none"}}><p style={{color:"rgb(4, 102, 135)",fontWeight:"bold",fontSize:"15px"} } className="my-2">Employer ? Post a JOB now </p>  </Link>  
      </div>
      </>
  )
}

export default Home
