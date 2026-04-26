import React from 'react'
import { NavLink } from 'react-router-dom'
import './App.css'

function Home() {
  return (
    <div>
        <p>Home</p>
        <div className="header">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </div>
    </div>
  )
}

export default Home