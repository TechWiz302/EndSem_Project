import React from 'react'
import "./Records.css"

const Records = ({heading, subheading}) => {
    return (
        <>
            <section className="hire-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <div className="hire-content">
                                <h2>{heading}</h2>
                                {subheading ? (<a className="default-btn" href="#0">Get Records<span></span></a>): ""}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Records