import React from 'react'
import "./Navbar.css"
import logo from "../../assets/images/long-logo.png"
import {Link} from "react-router-dom"

const Navbar = () => {
  return (
    <>
      <div className="header-navber-area">
        <div className="nav-top-bar">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="nav-contact-info">
                  <p><i className="fa fa-location-dot"></i> MG Road, Kiwale</p>
                  <p><i className="fa-regular fa-envelope"></i> <a href="mailto:medichain@example.com">medichain@example.com</a></p>
                  <p><i className="fa fa-mobile-screen-button"></i><a href="tel:+91 123456789">+91 123456789</a></p>
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <ul className="top-social">
                  <li><a href="/"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="/"><i className="fab fa-linkedin"></i></a></li>
                  <li><a href="/"><i className="fab fa-youtube"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="navbar-area">
          <div className="medicare-responsive-nav">
            <div className="container">
              <div className="medicare-responsive-menu">
                <div className="logo">
                  <a href="index.html">
                    <img src="assets/img/logo-black.png" className="white-logo" alt="logo" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="medicare-nav">
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <a className="navbar-brand" href="index.html">
                  <img src={logo} className="long-logo" alt="logo" />
                </a>
                <div className="collapse navbar-collapse mean-menu" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/about" className="nav-link">About</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/services" className="nav-link">Services</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/signup" className="nav-link">Signup</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/#contactus" className="nav-link">Contact</Link>
                    </li>
                  </ul>
                  <div className="other-option">
                    <a className="default-btn" href="/0">Book Appointment <span></span></a>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar