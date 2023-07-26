import React from 'react'
import './About.scss'

function About(){
  return (
    <div className='about-container'>
      <div className="about-rows">
        <h1>About us</h1>
      </div>
      <div className="about-rows">
        <h3>Our Mission</h3>
        <p>Connecting and providing people around the world clothes from the most popular brands in the world!</p>
      </div>
      <div className="about-rows">
        <h3>Our Story</h3>
        <p>Seeing all the problems within streetwear fashion distribution, our group started developing in early 2010s this idea of making possible
           for everyone in the world who has access to internet buy clothes for the best streetwear brands.
           So, we created an online store to help people buy easier. 
           We welcome you and hope you have a great experience buying from our online store.
        </p>
      </div>
      <div className="about-rows last">
        <h3>Our Services</h3>
        <ul>
          <li>Buying</li>
          <li>Selling</li>
          <li>Legit checking</li>
          <li>Sustainability</li>
          <li>Customer Services</li>
        </ul>
      </div>
    </div>
  )
}

export default About