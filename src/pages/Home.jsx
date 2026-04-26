import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
      <div className="header">
        <h1 className="page-title">Home</h1>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>
    </div>
  )
}

export default Home