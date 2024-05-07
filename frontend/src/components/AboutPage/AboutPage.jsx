import React from 'react'
import Navbar from '../Navbar/Navbar'
import Features from '../Features/Features'
import About from '../About/About'
import Team from '../Team/Team'
import Records from '../Records/Records'

const AboutPage = () => {
  return (
    <>
        <Navbar/>
        <Records heading={"ABOUT US"}/>
        <Features/>
        <About/>
        <Team/>
    </>
  )
}

export default AboutPage