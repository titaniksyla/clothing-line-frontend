import React from 'react'
import './Contact.scss'

function Contact(){
  return (
    <div className='contact-container'>
      <div className="form-container">
        <div className="form-title">
          <h1>Contact us</h1>
        </div>
        <form className='contact-form'>
          <div className='name-email'>
            <div className="sm-input">
              <input type="text" name="name" id="name" placeholder='Name..' />
            </div>
            <div className="sm-input">
              <input type="email" name="email" id="email" placeholder='Email..'/>
            </div>
          </div>
          <div className="phonenumber">
            <div className="lg-input">
              <input type="text" name="phonenumber" id="phonenumber" placeholder='Phone number..' />
            </div>
          </div>
          <div className="comment">
            <div className="lg-input">
              <textarea name="comment" id="comment" cols="30" rows="10" placeholder='Comment..'></textarea>
            </div>
          </div>
          <div className="submit-btn">
            Submit
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact