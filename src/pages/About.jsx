import React, { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react'
import { QRCodeSVG } from 'qrcode.react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'


function About() {
  const [state, handleSubmit] = useForm("xwvrllnj")
  const navigate = useNavigate()
  const hasHandled = useRef(false)
  const isSubmittingRef = useRef(false)
  const formRef = useRef(null)
  const [message, setMessage] = useState("")

  const vcardUrl = `BEGIN:VCARD
VERSION:3.0
FN: Nassim Bejaoui
EMAIL:votre@email.com
URL:https://linkedin.com/in/votre-profil
URL:https://github.com/votre-pseudo
NOTE:Développeur Front-End React — Promo 2025
END:VCARD`;

  useEffect(() => {

    //envoi réussi
  if (state.succeeded && !hasHandled.current) {
    hasHandled.current = true

    toast.success("Thank for joining us !")
    if (formRef.current) {
      formRef.current.reset()
    }
    setMessage("")
    setTimeout(() => {navigate('/about')}, 2000)
  }

  //erreur d'envoi
  if (state.errors && state.errors.length > 0 && !hasHandled.current) {
    hasHandled.current = true

    toast.error("Une erreur est survenue, message non envoyé")

    setTimeout(() => {navigate('/about')}, 2000)
  }

  //envoi en cours
  if (state.submitting && !isSubmittingRef.current) {
    isSubmittingRef.current = true
    toast.info("Envoi du message en cours...")
  }

  //bloque boucle toast
  if (!state.submitting) {
    isSubmittingRef.current = false
  }
}, [state])

  return (
    <>
      <div className="header">
        <h1 className="page-title">About</h1>

        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
      </div>

      <h2 className="form-title">Envoyer un Mail</h2>

      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" required />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Objet</label>
          <select id="reason" name="reason">
            <option value="">Choisir un objet</option>
            <option value="Opportunité">Opportunité</option>
            <option value="Question">Question</option>
            <option value="Collaboration">Collaboration</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="20 caractères minimum"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <button
          className="submit-btn"
          type="submit"
          disabled={state.submitting || message.length < 20}
        >
          Envoyer
        </button>
      </form>

      <a href="/Nassim_Bejaoui_CV.pdf" download className="cv-button">
        Télécharger mon CV
      </a>
      <br/>

      <div className="about-container">
        <h1>À propos</h1>
        <p>
          Développeur passionné, je réalise des projets web en JavaScript et React.
          Ce portfolio regroupe mes projets GitHub ainsi que des projets personnels.
        </p>

        <div className="qr-box">
          <p>Scannez pour enregistrer mon contact</p>
          <QRCodeSVG
            value={vcardUrl}
            size={160}
            fgColor='#1E3A5F'
            level='H'
            includeMargin
          />
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default About