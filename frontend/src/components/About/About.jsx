import React from 'react'
import "./About.css"
import about_img from "../../assets/images/about-1.jpg"

const About = () => {
    return (
        <>
            <section className="about-area section-padding">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <h6 className="sub-title">Welcome To Medical & Health Care</h6>
                                <h2>We're here when you need us - for every <span className="color-text">Care in the World</span></h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, nostrud consectetur adipiscing elit.</p>
                                <ul className="feature-list">
                                    <li><i className="ri-check-double-line"></i> Specialist Doctors At Affordable Prices</li>
                                    <li><i className="ri-check-double-line"></i> Modern Facilities In A Relaxed Environment</li>
                                    <li><i className="ri-check-double-line"></i> Professional And Highly Skilled Staff</li>
                                </ul>
                                <a href="#" className="default-btn">Schedule Appointment <span></span></a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img src={about_img} alt="" />
                                <div className="years-design">
                                    <h2>20</h2>
                                    <h5>Years Of Experience</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About