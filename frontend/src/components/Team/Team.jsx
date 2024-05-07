import React from 'react'
import "./Team.css"
import team_1 from "../../assets/images/team/team-1.jpg"
import team_2 from "../../assets/images/team/team-2.jpg"
import team_3 from "../../assets/images/team/team-3.jpg"
import team_4 from "../../assets/images/team/team-4.jpg"

const Team = () => {
    return (
        <>
            <section className="team-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h6 className="sub-title">Expert Physicians</h6>
                                <h2>Specialist Doctors</h2>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-team-box">
                                <div className="team-image">
                                    <img src={team_1} alt="team" />
                                    <div className="team-social-icon">
                                        <a href="#" className="social-color-1"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#" className="social-color-2"><i className="fab fa-twitter"></i></a>
                                        <a href="#" className="social-color-3"><i className="fab fa-linkedin"></i></a>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>Dr. Lewis Lucas</h3>
                                    <span>Liver Specialist</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-team-box">
                                <div className="team-image">
                                    <img src={team_2} alt="team" />
                                    <div className="team-social-icon">
                                        <a href="#" className="social-color-1"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#" className="social-color-2"><i className="fab fa-twitter"></i></a>
                                        <a href="#" className="social-color-3"><i className="fab fa-linkedin"></i></a>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>Dr. Arturo Fuller</h3>
                                    <span>Medicine Specialist</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-team-box">
                                <div className="team-image">
                                    <img src={team_3} alt="team" />
                                    <div className="team-social-icon">
                                        <a href="#" className="social-color-1"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#" className="social-color-2"><i className="fab fa-twitter"></i></a>
                                        <a href="#" className="social-color-3"><i className="fab fa-linkedin"></i></a>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>Dr. Velma Cain</h3>
                                    <span>Chest & Asthma Specialist</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <div className="single-team-box">
                                <div className="team-image">
                                    <img src={team_4} alt="team" />
                                    <div className="team-social-icon">
                                        <a href="#" className="social-color-1"><i className="fab fa-facebook-f"></i></a>
                                        <a href="#" className="social-color-2"><i className="fab fa-twitter"></i></a>
                                        <a href="#" className="social-color-3"><i className="fab fa-linkedin"></i></a>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>Dr. Marc Gibbs</h3>
                                    <span>Urology Department</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Team