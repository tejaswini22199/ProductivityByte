import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({showNavbar, setshowNavbar}) {
    
    return (
        <div>
            <div className={showNavbar ? "viewport-nav" : "viewport-open"} style={{fontFamily: 'Syncopate, sans-serif' , fontSize: '4vh' , letterSpacing:'0.25vw'}} onClick={() => setshowNavbar(!showNavbar)}>
                <Link to="/">My Tasks</Link>
                {/* <Link to="/tasks/monthly">Monthly Overview</Link> */}
                <Link to="/create">Create Task</Link>
                <Link to="/login">Login </Link>
                <Link to="/register">Create an account</Link>
            </div>
        </div>
    )
}