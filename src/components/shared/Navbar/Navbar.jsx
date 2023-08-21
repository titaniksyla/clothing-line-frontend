import React , {useState, useEffect}from 'react'
import axios from 'axios'
import {Link } from 'react-router-dom'
import './Navbar.scss'

import {BiMenu} from 'react-icons/bi'
import {MdOutlineShoppingCart} from 'react-icons/md'
import { GrFormClose } from 'react-icons/gr'

function Navbar(props){
  
  const [cartCounter ,setCartCounter] = useState(0);
  const [toggleMenu,setToggleMenu] = useState(false);

  function showNavbar(){
    setToggleMenu(!toggleMenu)
  }

  function closeMenu(){
    setToggleMenu(false)
    props.logUserOut()
  }

  console.log('togglemenu',toggleMenu)
  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      let user_id = localStorage.getItem("user_id");
      try {
        axios.get(`http://localhost:8080/cartproducts/${user_id}`)
        .then((data) => {
          console.log(data.data.findAllCartProducts.length);
          setCartCounter(data.data.findAllCartProducts.length);
        });
      } catch (error) {
        console.log(error);
      }}
      else{
        console.log('ki ba gabim');
      }
  }, [cartCounter]);
  return (
    <div className='nav-switch'>
      {!toggleMenu && (
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
    }
    {toggleMenu && (
      <div className='responsive-nav-container'>

      <div className="responsive-nav-head">
        <div className="responsive-nav-logo">
          <Link to='/'>Clothing Line</Link>
        </div>

        <div className="responsive-nav-hamburgermenu">
          <GrFormClose size={40} onClick={showNavbar}/>
        </div>
      </div>

      <div className="responsive-nav-links">
        <div className="responsive-nav-link">
          <Link to='/'><p>Home</p></Link>
        </div>
        {props.loginBtn ? 
          <div className="responsive-nav-link">
          <Link to='/products'><p>Shop</p></Link>
          </div> 
        :
          null
        }
        <div className="responsive-nav-link">
          <Link to='/about'><p>About</p></Link>
        </div>
        <div className="responsive-nav-link">
          <Link to='/contact'><p>Contact</p></Link>
        </div>
        {props.loginBtn ? <div className="responsive-nav-link">
         <Link to='/myprofile'><p>My Profile</p></Link>
        </div> 
        :
        null
        }
      </div>
      
      <div className="responsive-nav-auth">
        <div className="responsive-nav-buttons">
          {props.loginBtn ? <Link to='/'><div className='btn login' onClick={closeMenu}>Log out</div></Link> : <Link to='/login'><div className='btn login' onClick={() => setToggleMenu(false)}>Log in</div></Link>}
          {props.loginBtn ? '' :<Link to='/signup'><div className="btn signup" onClick={() => setToggleMenu(false)}>Sign up</div></Link>}
          {props.loginBtn ? <Link to='/cartproducts'><div className='btn cart' onClick={() => setToggleMenu(false)}><MdOutlineShoppingCart size={33} className='cart-icn'/><div className="cart-counter">{cartCounter}</div></div></Link> : ''} 
        </div>
      </div>
    </div>
    )
    }
    </div>
  )
}

export default Navbar