import React from 'react'
import { NavLink } from 'react-router-dom'

function Projets() {

    async function getProjet() {
  try {
    const response = await fetch(
      'https://api.github.com/users/UssoPalain/repos?per_page=30&sort=updated'
    )

    const data = await response.json()

    const projets = data.map(repo => ({
      name: repo.name,
      desc: repo.description,
      lang: repo.language,
      link: repo.html_url,
      date: repo.updated_at,
      star: repo.stargazers_count,
    }))

    console.log(projets)

    return projets

  } catch (error) {
    console.error("Erreur lors de la récupération des projets")
    return null
  }
}

    getProjet()
    return (
        <div>
            <p>Projets</p>
            <NavLink to="/">page home<br/></NavLink>
            <NavLink to="/projects">page Projet<br/></NavLink>
            <NavLink to="/about">page About<br/></NavLink>
        </div>
        
    )
}
export default Projets