import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import projetsLocauxData from '../data/projets.json'

function Projets() {

  const [projets, setProjets] = useState([])
  const [projetsLocaux, setProjetsLocaux] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getProjet() {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(
        'https://api.github.com/users/UssoPalain/repos?per_page=30&sort=updated'
      )

      if (!response.ok) {
        throw new Error("Erreur API")
      }

      const data = await response.json()

      const projetsFormates = data.map(repo => ({
        name: repo.name,
        desc: repo.description,
        lang: repo.language,
        link: repo.html_url,
        date: repo.updated_at,
        star: repo.stargazers_count,
      }))

      setProjets(projetsFormates)

    } catch (error) {
      console.error(error)
      setError("Impossible de charger les projets")
    } finally {
      setLoading(false)
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
      <div className="header">
              <h1 className="page-title">Projets</h1>
      
              <nav className="nav-links">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/projects">Projects</NavLink>
                <NavLink to="/about">About</NavLink>
              </nav>
            </div>

      <h1>Mes projets GitHub</h1>

      {loading && <div className="spinner"></div>}

      {error && (
        <div>
          <p>{error}</p>
          <button onClick={getProjet} disabled={loading}>
            {loading ? "Chargement..." : "Réessayer"}
          </button>
        </div>
      )}

      {!error && !loading && projets.map((projet) => (
        <a
          key={projet.name}
          href={projet.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3>{projet.name}</h3>
          <p>{projet.desc}</p>
          <p>{projet.lang}</p>
          <p>⭐ {projet.star}</p>
        </a>
      ))}
      <h1>Mes projets Locaux</h1>

      {projetsLocaux.map((projet, index) => (
        <div key={projet.name} className="card">
          <h3>{projet.name}</h3>
          <p>{projet.desc}</p>
          <p>{projet.lang}</p>
        </div>
      ))}

    </div>
  )
}

export default Projets