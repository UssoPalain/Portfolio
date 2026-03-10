import React from 'react'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div>
        <p>Home</p>
        <NavLink to="/">page home<br/></NavLink>
        <NavLink to="/projects">page Projet<br/></NavLink>
        <NavLink to="/about">page About<br/></NavLink>
    </div>
  )
}

export default Home