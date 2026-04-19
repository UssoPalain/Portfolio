import React from 'react'
import { NavLink } from 'react-router-dom'
import { useForm, ValidationError } from '@formspree/react';
import {QRCodeSVG} from 'qrcode.react';


function About() {
  const [state, handleSubmit] = useForm("xwvrllnj");
  const vcardUrl = `BEGIN:VCARD
VERSION:3.0
FN: Nassim Bejaoui
EMAIL:votre@email.com
URL:https://linkedin.com/in/votre-profil
URL:https://github.com/votre-pseudo
NOTE:Développeur Front-End React — Promo 2025
END:VCARD`;
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <>
        <NavLink to="/">page home<br/></NavLink>
        <NavLink to="/projects">page Projet<br/></NavLink>
        <NavLink to="/about">page About<br/></NavLink>

        <form onSubmit={handleSubmit}>
        <label htmlFor="email">
            Email Address<br/>
        </label>
        <input
            id="email"
            type="email" 
            name="email"
        />
        <ValidationError 
            prefix="Email" 
            field="email"
            errors={state.errors}
        /><br/>
        <input name="subject" defaultValue="Need help with order" />
        <textarea
            id="message"
            name="message"
        />
        <ValidationError 
            prefix="Message" 
            field="message"
            errors={state.errors}
        /><br/>
        {state.errors && state.errors.length > 0 && (
            <p>Une erreur est survenue, le message n'a pas été envoyé.</p>
        )}
        {state.submitting && <p>Envoi en cours</p>}

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

    </>
  );
}

export default About;