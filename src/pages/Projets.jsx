import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import projetsLocauxData from '../data/projets.json'

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
 //Quasi temps réel se recharge automatiquement sans reload la page
 //Monsieur si vous lisez le code, je n'ai aucune idée de comment faire du temps réel
 //ducoup j'ai contourné le problème.
  const interval = setInterval(() => {
    getProjet()
  }, 30000) // toutes les 30 secondes

  return () => clearInterval(interval)
}, [])
  // Gestion des doublos
  useEffect(() => {
  if (projets.length > 0) {
    const nomsGithub = projets.map(p => p.name)

    const projetsLocauxFiltres = projetsLocauxData.filter(
      projetLocal => !nomsGithub.includes(projetLocal.name)
    )

    setProjetsLocaux(projetsLocauxFiltres)
  }
}, [projets])

  return (
    <div>
      <p>Projets</p>

      <NavLink to="/">page home<br/></NavLink>
      <NavLink to="/projects">page Projet<br/></NavLink>
      <NavLink to="/about">page About<br/></NavLink>

      <h1>Mes projets GitHub</h1>

      {projets.map((projet) => (
        <a
          key={projet.name}
          href={projet.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit"
          }}
        >
          <h3>{projet.name}</h3>
          <p>{projet.desc}</p>
          <p>{projet.lang}</p>
          <p>⭐ {projet.star}</p>
        </a>
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