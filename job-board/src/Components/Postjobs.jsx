import axios from 'axios';
import React, { useState } from 'react'
import Loading from './Loading';


function Postjobs() {
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [skillSet,setSkillSet]=useState([]);
    const [skill,setSkill]=useState("");
    const [isJobPosted,setIsJobPosted]=useState(false)
    const [loading,setLoading]=useState(false);


    const postjob=async()=>{
      setLoading(true)
      const url = `${import.meta.env.VITE_BACKEND_URL}/user/postjob`
      const data = {
        title,
        description,
        skillSet,
        accessToken:localStorage.getItem("accessToken")
      }
      const job = await axios(url,{
        
          method: 'POST',
          mode:"no-cors",
      data:{
          ...data
      }
      
      })

      console.log("job posted successfully ",job)
      setIsJobPosted(true)
      setLoading(false)
      
    }


    if(isJobPosted){
      return(
        <div>
          <div className="alert alert-success" role="alert">
            Your job is posted successfully  
            </div>
        </div>
      )
    }
    if(loading){
      return (
        <>
        <Loading/>
        </>
      )
    }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center m-4'>
      <h1 >Post a Job Now</h1>
      <>

  <div className="input-group mb-3">
    <div className="input-group-prepend">
      <span className="input-group-text" id="basic-addon1">
        Enter Form Title
      </span>
    </div>
    <input
      type="text"
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      className="form-control"
      placeholder="Enter title here"
      aria-label="title"
    />
  </div>

  {skillSet[0] && <p>skills you selected : {skillSet.map((item)=>{
            return(<span>
            <button className='btn btn-info m-1' onClick={(e)=>e.preventDefault()}>{item}</button> 
            </span> )
               })}</p>}

  <div className="input-group mb-3">
    <input
      type="text"
      value={skill}
      onChange={(e)=>{
        setSkill(e.target.value)
    
    }}
    onKeyDown={(e)=>{
        if(e.key==="Enter"){
        e.preventDefault()
        setSkillSet((prevSkills)=>{prevSkills.push(skill)
             return prevSkills});
        setSkill("")
        
    }}}
      className="form-control"
      placeholder="Enter skills you need here"
      aria-label="Recipient's username"
      aria-describedby="basic-addon2"
    />

    
    <div className="input-group-append">
      <span className="input-group-text" id="basic-addon2">
        skills Required
      </span>
    </div>
    
  </div>


  <button className="btn btn-primary my-2" onClick={(e)=>{
    e.preventDefault()
    setSkillSet((prevSkills)=>{prevSkills.push(skill)
         return prevSkills});
    setSkill("")
  }}>
                    Add skill
                </button>

  <div>
  

  </div>
  
 
  <div className="input-group">
    <div className="input-group-prepend">
      <span className="input-group-text">Enter Job description</span>
    </div>
    <textarea
      value={description}
      onChange={(e)=>setDescription(e.target.value)}
      className="form-control"
      aria-label="With textarea"
     
    />
  </div>
</>

<button onClick={postjob} type="button" className="btn btn-success my-2">Post Job</button>

    </div>
  )
}

export default Postjobs
