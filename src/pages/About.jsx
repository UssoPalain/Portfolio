import React, { useEffect, useRef } from 'react'
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

  const vcardUrl = `BEGIN:VCARD
VERSION:3.0
FN: Nassim Bejaoui
EMAIL:votre@email.com
URL:https://linkedin.com/in/votre-profil
URL:https://github.com/votre-pseudo
NOTE:Développeur Front-End React — Promo 2025
END:VCARD`;

  useEffect(() => {
  if (hasHandled.current) return

  if (state.succeeded) {
    hasHandled.current = true

    toast.success("Thank for joining us !")

    setTimeout(() => {
      navigate('/about')
    }, 2000)
  }

  if (state.errors && state.errors.length > 0) {
    hasHandled.current = true

    toast.error("Une erreur est survenue, message non envoyé")

    setTimeout(() => {
      navigate('/about')
    }, 2000)
  }
}, [state])

  return (
    <>
      <NavLink to="/">page home<br/></NavLink>
      <NavLink to="/projects">page Projet<br/></NavLink>
      <NavLink to="/about">page About<br/></NavLink>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address<br/></label>

        <input id="email" type="email" name="email" />

        <ValidationError prefix="Email" field="email" errors={state.errors} /><br/>

        <input name="subject" defaultValue="Need help with order" /><br/>

        <textarea id="message" name="message" />

        <ValidationError prefix="Message" field="message" errors={state.errors} /><br/>

        <button type="submit" disabled={state.submitting}>
          Submit
        </button>
      </form>

      <QRCodeSVG
        value={vcardUrl}
        size={160}
        fgColor='#1E3A5F'
        level='H'
        includeMargin
      />

      <ToastContainer />
    </>
  )
}

export default About