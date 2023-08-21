import React from 'react'
import {Link } from 'react-router-dom'
import './ResponsiveNavbar.scss'

function ResponsiveNavbar() {
  return (
    <div className='nav-container'>
      <div className="nav-logo">
        <Link to='/'>Clothing Line</Link>
      </div>

      <div className="nav-links">
        <div className="nav-link">
          <Link to='/'><p>Home</p></Link>
        </div>
        {props.loginBtn ? 
          <div className="nav-link">
          <Link to='/products'><p>Shop</p></Link>
          </div> 
        :
          null
        }
        <div className="nav-link">
          <Link to='/about'><p>About</p></Link>
        </div>
        <div className="nav-link">
          <Link to='/contact'><p>Contact</p></Link>
        </div>
        {props.loginBtn ? <div className="nav-link">
         <Link to='/myprofile'><p>My Profile</p></Link>
        </div> 
        :
        null
        }
      </div>
      
      <div className="nav-auth">
        <div className="nav-buttons">
          {props.loginBtn ? <Link to='/'><div className='btn login' onClick={props.logUserOut}>Log out</div></Link> : <Link to='/login'><div className='btn login'>Log in</div></Link>}
          {props.loginBtn ? '' :<Link to='/signup'><div className="btn signup">Sign up</div></Link>}
          {props.loginBtn ? <Link to='/cartproducts'><div className='btn cart'><MdOutlineShoppingCart size={33} className='cart-icn'/><div className="cart-counter">{cartCounter}</div></div></Link> : ''} 
        </div>
      </div>

      <div className="nav-hamburgermenu">
        <BiMenu size={40} onClick={showNavbar}/>
      </div>
    </div>
    )
  )
}

export default ResponsiveNavbar