import React from 'react'
import "./Footer.css"
import logo from "../../assets/images/long-logo.png"
import { useLocation } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';

function Footer() {
  const location = useLocation();
  let isDashboardPage;

  if (location.pathname.includes("dashboard")) {
    isDashboardPage = true;
  }

  return (
    <>
      {!isDashboardPage ? (
        <>
          <section id='contactus' className="footer-area">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6 footer-box-item">
                  <div className="footer-about footer-list">
                    <a className="footer-logo" href="#">
                      <img src={logo} className="white-logo" alt="logo" />
                    </a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt labore et dolore magna aliqua</p>
                    <ul className="footer-social-icon">
                      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                      <li><a href="#"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 footer-box-item">
                  <div className="footer-list">
                    <h5 className="title">Contact Info</h5>
                    <div className="footer-contact-info">
                      <ul className="footer-contact-list">
                        <li><i className="fa fa-location-dot"></i> MG Road, Kiwale</li>
                        <li><i className="fa fa-mobile-screen-button"></i> <a href="tel:101202303">+91 123456789</a></li>
                        <li><i className="fa fa-envelope"></i> <a href="medichain@example.com">medichain@example.com</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 footer-box-item">
                  <div className="footer-list">
                    <h5 className="title">Opening Time</h5>
                    <ul className="footer-opening-time-list">
                      <li>Monday: <span>8:30 to 5:00</span></li>
                      <li>Tuesday: <span>8:30 to 5:00</span></li>
                      <li>Wednesday: <span>8:30 to 5:00</span></li>
                      <li>Thursday: <span>8:30 to 5:00</span></li>
                      <li>Friday: <span>8:30 to 1:00</span></li>
                      <li>Saturday: <span>Closed</span></li>
                      <li>Sunday: <span>Closed</span></li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 footer-box-item">
                  <div className="footer-list">
                    <h5 className="title">Subscribe Newsletter</h5>
                    <div className="footer-info-newsletter">
                      <form className="newsletter-form">
                        <input type="email" className="input-newsletter" placeholder="Enter Your Email" name="EMAIL" required="" autoComplete="off" />
                        <button className="default-btn" type="submit">Subscribe Now <span></span></button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="copyright-area">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <p>© 2024 - All Rights Reserved - Designed by <span className="author-name">Rushikesh Shinde</span></p>
                </div>
                <div className="col-lg-6 col-md-6">
                  <ul>
                    <li> <a href="terms-condition.html">Terms & Conditions</a></li>
                    <li> <a href="privacy-policy.html">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : ""}
    </>
  )
}

export default Footer