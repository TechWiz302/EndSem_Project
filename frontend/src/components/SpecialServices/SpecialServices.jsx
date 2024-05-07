import React from 'react'
import service1 from "../../assets/images/services/service-1.jpg"
import service2 from "../../assets/images/services/service-2.jpg"
import service3 from "../../assets/images/services/service-3.jpg"
import service4 from "../../assets/images/services/service-4.jpg"
import service5 from "../../assets/images/services/service-5.jpg"
import service6 from "../../assets/images/services/service-6.jpg"

const SpecialServices = () => {
    return (
        <>
            <section className="services-section pt-100 pb-70">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-title">
                                <h6 className="sub-title">What We Provide</h6>
                                <h2>Special Services</h2>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-box">
                                <div className="services-img">
                                    <img src={service1} alt=""/>
                                </div>
                                <div className="services-info">
                                    <h3>Medicine Care</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                    <div className="services-btn-box">
                                        <a href="single-services.html" className="services-btn-link"><i className="fa fa-arrow-right"></i> Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-box">
                                <div className="services-img">
                                    <img src={service2} alt=""/>
                                </div>
                                <div className="services-info">
                                    <h3>Neurologists</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                    <div className="services-btn-box">
                                        <a href="single-services.html" className="services-btn-link"><i className="fa fa-arrow-right"></i> Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-box">
                                <div className="services-img">
                                    <img src={service3} alt=""/>
                                </div>
                                <div className="services-info">
                                    <h3>Orthopaedic</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                    <div className="services-btn-box">
                                        <a href="single-services.html" className="services-btn-link"><i className="fa fa-arrow-right"></i> Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-box">
                                <div className="services-img">
                                    <img src={service4} alt=""/>
                                </div>
                                <div className="services-info">
                                    <h3>Cardiologists</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                    <div className="services-btn-box">
                                        <a href="single-services.html" className="services-btn-link"><i className="fa fa-arrow-right"></i> Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-box">
                                <div className="services-img">
                                    <img src={service5} alt=""/>
                                </div>
                                <div className="services-info">
                                    <h3>Dental Care</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                    <div className="services-btn-box">
                                        <a href="single-services.html" className="services-btn-link"><i className="fa fa-arrow-right"></i> Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="single-services-box">
                                <div className="services-img">
                                    <img src={service6} alt=""/>
                                </div>
                                <div className="services-info">
                                    <h3>Gynaecology</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt dolore magna aliqua</p>
                                    <div className="services-btn-box">
                                        <a href="single-services.html" className="services-btn-link"><i className="fa fa-arrow-right"></i> Read More</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SpecialServices