import React from 'react'
import Navbar from '../Navbar/Navbar'
import Records from '../Records/Records'
import Services from '../Services/Services'
import SpecialServices from '../SpecialServices/SpecialServices'

const ServicesPage = () => {
  return (
    <>
        <Navbar/>
        <Records heading={"OUR SERVICES"}/>
        <Services/>
        <Records heading={"Make an Appointment"} subheading={"Book Appointment"}/>
        <SpecialServices/>
    </>
  )
}

export default ServicesPage