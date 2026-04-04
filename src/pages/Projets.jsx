import React from 'react'
import { NavLink } from 'react-router-dom'

function Projets() {

    async function getProjet(){
        try {
            const response = await fetch(`https://api.github.com/users/UssoPalain/repos?per_page=30&sort=updated`)
            console.log(response)
            if (!response.ok) {
                alert('Projets introuvable')
            }
            const data = await response.json()
            console.log(data)
            const projet = {
                name: data.name,
                desc: data.description,
                lang: data.language,
                link: data.html_url,
                date: data.updated_at,
                star: data.stargazers_count,
            }
            console.log(projet)
            projets.set(projet)
            return projet
            } catch (error) {
            console.error("Erreur lors de la récupération des projets");
            return null;
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