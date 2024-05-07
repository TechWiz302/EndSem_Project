import React from 'react'
import "./Home.css"
import Navbar from '../Navbar/Navbar'
import HeroSection from '../HeroSection/HeroSection'
import Features from '../Features/Features'
import About from '../About/About'
import Services from '../Services/Services'
import Overview from '../Overview/Overview'
import Appointment from '../Appointment/Appointment'
import Team from '../Team/Team'
import Records from '../Records/Records'
import Blog from '../Blog/Blog'

const Home = () => {

  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <About />
      <Services />
      <Overview/>
      <Appointment/>
      <Team/>
      <Records heading={"Get a Patient Medical Records"} subheading={"Get Records"}/>
      <Blog/>
    </>
  )
}

export default Home