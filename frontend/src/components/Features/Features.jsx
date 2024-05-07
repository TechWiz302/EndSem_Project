import React from 'react'
import "./Features.css"
import doctor from "../../assets/images/icons/doctor-plus.png"
import emergency from "../../assets/images/icons/emergency-call.png"
import badge from "../../assets/images/icons/guarantee.png"

const Features = () => {
    return (
        <>
            <section className="features-section pt-70 pb-30">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-features-item">
                                <div className="features-icon">
                                    <img src={doctor} />
                                </div>
                                <h3>Top Qualified Doctors</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-features-item">
                                <div className="features-icon">
                                <img src={emergency} />
                                </div>
                                <h3>Emergency Support</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-features-item">
                                <div className="features-icon">
                                <img src={badge} />
                                </div>
                                <h3>International Certification</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Features