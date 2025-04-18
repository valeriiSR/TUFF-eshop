import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../images/logo.png'
import './Footer.css'
import YoutubeIcon from '../Icons/YoutubeIcon';
import Instagram from '../Icons/Instagram';
import Facebook from '../Icons/Facebook';

export default function Footer() {
  return (
    <div className="container">
      <footer className='footer'>
        <Link to="/"><img src={logo} alt="Footer Logo" /></Link>
        <p className="copy-rights">Developed by <a href="#!" className='private-link'>S.Valerii</a></p>
        <div className="social-links">
          <YoutubeIcon to="#!" />
          <Instagram to="#!" />
          <Facebook to="#!" />
        </div>
      </footer>
    </div>
  )
}

