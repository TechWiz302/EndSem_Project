import React from 'react'
import "./Services.css"
import medicine from "../../assets/images/icons/medicine.png"
import cardiology from "../../assets/images/icons/cardiology.png"
import doctor_plus from "../../assets/images/icons/doctor-plus.png"
import skin_care from "../../assets/images/icons/skin-care.png"
import gastroenterologist from "../../assets/images/icons/gastroenterologist.png"
import brain from "../../assets/images/icons/brain.png"
import kidneys from "../../assets/images/icons/kidneys.png"
import clinic from "../../assets/images/icons/clinic.png"
import orthopedics from "../../assets/images/icons/orthopedics.png"


const Services = () => {
    return (
        <>
            <section className="services-design-two bg-grey section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h6 className="sub-title">What We Provide</h6>
                                <h2>Our Special Services</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={medicine} />
                                </div>
                                <h3>Medicine Care</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={cardiology} />
                                </div>
                                <h3>Cardiologists</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={doctor_plus} />
                                </div>
                                <h3>Dental care</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={skin_care} />
                                </div>
                                <h3>Dermatologists</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={gastroenterologist} />
                                </div>
                                <h3>Gastroenterologists</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={brain} />
                                </div>
                                <h3>Neurologists</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={kidneys} />
                                </div>
                                <h3>Urologist</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={clinic} />
                                </div>
                                <h3>Gynaecology</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-two">
                                <div className="services-icon">
                                    <img src={orthopedics} />
                                </div>
                                <h3>Orthopaedic</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                <div className="services-btn">
                                    <a href="#" className="link-btn">Read More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Services