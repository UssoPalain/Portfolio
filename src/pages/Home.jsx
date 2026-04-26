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

      <img src="/130-Bejaoui-Nassim-2.jpg" alt="Photo de Nassim"/>
      <p>bejaouinassim64@gmail.com</p>
      <h3>Hello, I'm</h3>
      <h1>Nassim Bejaoui</h1>
      <h2>Etudiant en M2I</h2>
      <h2>Mon Profil</h2>
      <p>Bonjour,Je suis Nassim Béjaoui Élève de M2i. 
        Mes Passions sont la Programmation et le domaine de L'informatique en général. 
        Dynamique et ayant un excellent sens du contact, j'aime collaborer avec des interlocuteurs variés. 
        Volontaire, je me distingue par mon engagement au service du collectif et mon goût d'apprendre.</p>
    </div>
  )
}

export default Home