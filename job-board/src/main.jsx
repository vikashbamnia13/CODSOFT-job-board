import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Components/Login.jsx'
import Signup from './Components/Signup.jsx'
import Profile from './Components/Profile.jsx'
import BrowseJobs from './Components/BrowseJobs.jsx'
import Postjobs from './Components/Postjobs.jsx'
import Jobdetail from './Components/Jobdetail.jsx'
import SearchJob from './Components/Searchjob.jsx'
import JobRemoved from './Components/JobRemoved.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/login",
        element:<Login />
      },
      {
        path:"/signup",
        element:<Signup/>,
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/browsejobs",
        element:<BrowseJobs/>

      },
      {
        path:"/postjob",
        element:<Postjobs/>
      },
      {
        path:"/jobdetail",
        element:<Jobdetail/>
      },
      {
        path:"/search",
        element:<SearchJob/>
      },{
        path:"/removed",
        element:<JobRemoved/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
