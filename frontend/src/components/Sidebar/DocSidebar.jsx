import React from 'react'
import "./Sidebar.css"
import logo from "../../assets/images/logo-long.png"
import { Link } from 'react-router-dom'

const DocSidebar = () => {
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
                            <Link to="/doc/dashboard/profile">Profile</Link>
                        </div>

                        <div className="menu-list">
                            <p className="menu-heading">Appointment</p>
                            <Link to="/doc/dashboard/appointment">Appointments</Link>
                        </div>

                        <div className="menu-list">
                            <p className="menu-heading">Patient Records</p>
                            <Link to="/doc/dashboard/patient">Patient</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DocSidebar