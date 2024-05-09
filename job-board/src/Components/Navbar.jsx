import React from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

function Navbar({isLogin,user,setIsLogin,setUser}) {
  console.log(user)

  const logout =()=>{
    setIsLogin(false)
    setUser({})
    Cookies.remove("accessToken")
    localStorage.setItem("accessToken",null)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">
     &nbsp; Job Board
  </Link>
  <button
    className="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavDropdown"
    aria-controls="navbarNavDropdown"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span className="navbar-toggler-icon" />
  </button>
  <div className="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav">
      
      <li className="nav-item">
        <Link className="nav-link" to="/search">
           Search Jobs 
        </Link>
      </li>
      
      
    </ul>
    
  </div>
  {!isLogin&&<Link to="/login"><button>
    Login
    <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
</button></Link>}
  {!isLogin&&<Link to="/signup"><button>
    Sign up
    <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
</button></Link>}
  {isLogin&&<button type="button" onClick={logout} className="btn btn-primary mx-2">Logout</button>}
  {isLogin&&<Link to="/profile"><button type="button" className="btn btn-warning  mx-2 rounded-circle font-weight-bold ">{user.fullName }</button></Link>} 
</nav>

  

  )
}

export default Navbar
