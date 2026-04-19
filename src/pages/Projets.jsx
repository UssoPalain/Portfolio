import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import projetsLocauxData from '../projetsLocaux.json'

function Projets() {

  const [projets, setProjets] = useState([])
  const [projetsLocaux, setProjetsLocaux] = useState([])

  async function getProjet() {
    try {

      const response = await fetch(
        'https://api.github.com/users/UssoPalain/repos?per_page=30&sort=updated'
      )

      const data = await response.json()

      const projetsFormates = data.map(repo => ({
        name: repo.name,
        desc: repo.description,
        lang: repo.language,
        link: repo.html_url,
        date: repo.updated_at,
        star: repo.stargazers_count,
      }))

      console.log(projetsFormates)

      setProjets(projetsFormates)

    } catch (error) {
      console.error("Erreur lors de la récupération des projets")
    }
  }

  useEffect(() => {
    getProjet()
    setProjetsLocaux(projetsLocauxData)
  }, [])

  return (
    <div>
      <p>Projets</p>

      <NavLink to="/">page home<br/></NavLink>
      <NavLink to="/projects">page Projet<br/></NavLink>
      <NavLink to="/about">page About<br/></NavLink>

      <h1>Mes projets GitHub</h1>

      {projets.map((projet, index) => (
        <div
          key={index}
          onClick={() => window.open(projet.link, "_blank")}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
            cursor: "pointer"
          }}
        >
          <h3>{projet.name}</h3>
          <p>{projet.desc}</p>
          <p>{projet.lang}</p>
          <p>⭐ {projet.star}</p>
        </div>
      ))}
      <h1>Mes projets Locaux</h1>

      {projetsLocaux.map((projet, index) => (
        <div
          key={index}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}
        >
          <h3>{projet.name}</h3>
          <p>{projet.desc}</p>
          <p>{projet.lang}</p>
        </div>
      ))}

    </div>
  )
}

export default Projets