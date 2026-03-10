import React from 'react'
import { NavLink } from 'react-router-dom'

function Projets() {
  return (
    <div>
        <p>Projets</p>
        <NavLink to="/">page home<br/></NavLink>
        <NavLink to="/projects">page Projet<br/></NavLink>
        <NavLink to="/about">page About<br/></NavLink>
    </div>
    
  )
  async function getProjet(id) {
    try {
        const response = await fetch(`https://api.github.com/users/UssoPalain/repos?per_page=30&sort=updated`)
        if (!response.ok) {
            alert('Projets introuvable')
        }
        const data = await response.json()
        const projet = {
            name: data.name,
            desc: data.description,
            lang: data.language,
            link: data.html_url,
            date: data.updated_at,
            star: data.stargazers_count,
        }
        projets.set(id, projet)
        return projet
        } catch (error) {
        console.error("Erreur lors de la récupération des projets");
        return null;
    }
}
}
export default Projets