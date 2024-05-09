import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Job({title,description,job}) {
  let context = useOutletContext()
  const navigate = useNavigate()
  const showDetail=()=>{
    context[4]=job;
  console.log(context[4])
  navigate("/jobdetail")
  }
  
  return (
    <div className="card m-4" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <button to="/jobdetail" className="btn btn-primary" onClick={showDetail}>Apply now</button>
  </div>
</div>
  )
}

export default Job
