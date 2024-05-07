import React from 'react'
import "./Appointment.css"

const Appointment = () => {
  return (
    <>
        <section className="appointment-section">
		<div className="container-fluid">
			<div className="row">
				<div className="col-lg-6">
					<div className="appointment-img"></div>
				</div>
				<div className="col-lg-6">
					<div className="appointment-content">
						<div className="section-title">
							<h6 className="sub-title">Online Appointment</h6>
							<h2 style={{color: "#fff"}}>Make An Appointment</h2>
						</div>
						<div className="appointment-form">
							<form>
								<div className="row">
									<div className="col-lg-6 col-md-12">
										<div className="form-group">
											<input type="text" name="name" id="name" className="appointment-control" required placeholder="Your Name" />
										</div>
									</div>
									<div className="col-lg-6 col-md-12">
										<div className="form-group">
											<input type="email" name="email" id="email" className="appointment-control" required placeholder="Your Email"/>
										</div>
									</div>
									<div className="col-lg-6 col-md-12">
										<div className="form-group">
											<input type="text" name="phone" id="phone" required className="appointment-control" placeholder="Your Phone"/>
										</div>
									</div>
									<div className="col-lg-6 col-md-12">
										<div className="form-group">
											<input type="text" name="datepicker" id="datepicker" className="appointment-control" placeholder="Schedule Date"/>
										</div>
									</div>
									<div className="col-lg-12 col-md-12">
										<div className="form-group">
											<textarea name="message" className="appointment-control" id="message" cols="30" rows="6" required placeholder="Your Message"></textarea>
										</div>
									</div>
									<div className="col-lg-12 col-md-12">
										<button type="submit" className="default-btn">Book Appointment <span></span></button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
    </>
  )
}

export default Appointment