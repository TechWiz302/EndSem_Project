import React from 'react'
import "./Overview.css"
import overview from "../../assets/images/overview.jpg"
import { RiCheckDoubleLine } from "react-icons/ri";

const Overview = () => {
    return (
        <>
            <section className="overview-section pt-50 pb-100">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="overview-content">
                                <h6 className="sub-title">Why Choose Us</h6>
                                <h2>We are Committed to Provide you with the <span className="color-text">Highest Standards Care</span></h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <ul className="features-list">
                                    <li> <span><RiCheckDoubleLine /> Personalized Care</span></li>
                                    <li> <span><RiCheckDoubleLine /> Emergency Support</span></li>
                                    <li> <span><RiCheckDoubleLine /> Experienced Staff</span></li>
                                    <li> <span><RiCheckDoubleLine /> Top Qualified Doctors</span></li>
                                    <li> <span><RiCheckDoubleLine /> Comfortable Treatments</span></li>
                                    <li> <span><RiCheckDoubleLine /> Medical Advices & Care</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="overview-image">
                                <img src={overview} alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Overview