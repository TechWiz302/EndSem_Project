import React from 'react'
import "./Sidebar.css"
import logo from "../../assets/images/logo-long.png"
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="sidebar-content">
                    <div className="sidebar-menu">

                        <div className="menu-list">
                            <p className="menu-heading">Dashboard</p>
                            <Link to="/dashboard/profile">Profile</Link>
                        </div>

                        <div className="menu-list">
                            <p className="menu-heading">Appointment</p>
                            <Link to="/dashboard/make-appointment">Book appointment</Link>
                            <Link to="/dashboard/appointment">Appointments</Link>
                        </div>

                        <div className="menu-list">
                            <p className="menu-heading">Health Records</p>
                            <Link to="/dashboard/insurance">Insurance</Link>
                            <Link to="/dashboard/allergies">Allergies</Link>
                            <Link to="/dashboard/medical-history">Medical History</Link>
                            <Link to="/dashboard/hospitalization-history">Hospitalization History</Link>
                            <Link to="/dashboard/vaccination-record">Vaccination Records</Link>
                        </div>

                        <div className="menu-list">
                            <p className="menu-heading">Record Access</p>
                            <Link to="/dashboard/requests">Approval requests</Link>
                            <Link to="/dashboard/approved-requests">Approved Requests</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar