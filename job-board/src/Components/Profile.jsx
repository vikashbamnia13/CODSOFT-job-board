import React, { useEffect, useState } from 'react'
import { useNavigate, useOutletContext, } from 'react-router-dom'
import { Link } from 'react-router-dom';
import axios from 'axios';

// {!isLogin && <h1>Please Login to see your profile</h1>}
function Profile() {
    const [isLogin]=useOutletContext()
    let context = useOutletContext();
    const navigate = useNavigate()
    const user=context[2]

    const [isJobRemoved,setIsJobRemoved]=useState(false)
  
    console.log(user)
    let lastLoginTime=null;
    if(isLogin){
        const date=new Date(user.updatedAt)
        console.log(date)
        lastLoginTime=date.toString()
    }

    if(isJobRemoved){
        navigate("/removed")
    }

    
     if(!isLogin){
        return(
            
            <div className='h-100 d-flex justify-content-center align-items-center flex-column'>
                <h2 className='h-200 ' style={{margin:"300px"}}>Please <Link to="/login"><button type="button" className="btn btn-info text-white" style={{fontSize:"24px" , fontWeight:"bold"}}>Login</button></Link> to see your profile</h2>
                </div>
        )
     }
     if(isLogin){
        return(
            <>
             {/* <div className='h-100 d-flex justify-content-center align-items-center flex-column'>
                <h2 className='h-200 ' style={{margin:"300px"}}>hello this is your profile {user.fullName}</h2>
               </div> */}
            <div className='container d-flex flex-column justify-content-center align-items-center' style={{height:"600px", width:"100%"}}>

                <div className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor:"lightblue",border:"2px solid black",borderRadius:"50%",width:"150px", height:"190px"}}><h1 style={{textAlign:"center",fontSize:"70px"}}><i className="fa-solid fa-user "></i><br/><p style={{textAlign:"center",fontSize:"30px"}}>{user.username}</p></h1></div>
                <div className="my-2" style={{backgroundColor:"lightgray",height:"60%",width:"100%",padding:"20px",borderRadius:"10px"}}>
                {!user.isEmployer&&<h3>Skills: </h3>}{user.skills.map((item)=>{
                    return(
                        <span style={{fontWeight:"bold",fontSize:"30px"}} key={user.skills.indexOf(item)}>{item} </span>
                    )
                })}
                <h3>Joined at: </h3>
                        <span style={{fontWeight:"bold",fontSize:"30px"}}>
                            {new Date(user.createdAt).toDateString()}
                            </span>
                
                <h3>Email: </h3>
                <span style={{fontWeight:"bold",fontSize:"30px"}}>{user.email} </span>
                
                <h3>Last login: </h3>
                <span style={{fontWeight:"bold",fontSize:"30px"}}>{lastLoginTime} </span>
                </div>

                {user.isEmployer && <button onClick={()=>{
          navigate("/postjob")
        }} type="button" className="btn btn-success my-2">Post Jobs</button>}


            </div>
           {!user.isEmployer && <div className='d-flex justify-content-center align-items-center flex-column'>
                <h1>Applied jobs</h1>
                <div className='d-flex justify-content-center align-items-center'>

                    {   
                        user.jobs.map((item)=>{
                            const [title,setTitle]=useState("")
                            const [description,setDescription]=useState("")
                            useEffect(()=>{
                                (async()=>{
                                    const url = `${import.meta.env.VITE_BACKEND_URL}/user/getitem/${item}`;
                                    const res = await axios(url,{
                                    method:"post",
                                    mode:"no-core"
                                    })
                                    console.log(res.data.data)
                                    setTitle(res.data.data.title);
                                    setDescription(res.data.data.description)
                                })()
                            })

                            const removeJob=async()=>{
                                const url = `${import.meta.env.VITE_BACKEND_URL}/user/removejob`;
                                const res = await axios(url,{
                                    method:"post",
                                    mode:"no-cors",
                                    data:{
                                        userid:user._id,
                                        jobid:item
                                    }
                                })
                                console.log(res)
                                context[2]=res.data.data.user
                                setIsJobRemoved(true)
                                
                            }

                            

                            return(
                                <div className="card m-4" style={{width: "18rem"}}>
                                <div className="card-body">
                                    <h5 className="card-title">{title}</h5>
                                    <p className="card-text">{description}</p>
                                    <button to="/jobdetail" className="btn btn-primary" onClick={removeJob}>remove JOB</button>
                                </div>
                                </div>
                            )
                            


                        })


                            


                    }

            </div>
            </div>}
            </>
        )
     }
}

export default Profile











// function dispatchSetState(fiber, queue, action) {
//     {
//       if (typeof arguments[3] === "function") {
//         error("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
//       }
//     }