import React from 'react'
import {Link} from 'react-router-dom'
import './Banner.scss'

function Banner(){
  return (
    <div className='banner-container'>
      <div className='banner-description'>
      <h1>Clothing Line</h1>
      <p>Exclusive & High-Quality Apparel Of The Most Popular Brands In The World Listed Here</p>
      </div>
      <div className='shop-btn'>
        <Link to='/shop'>Shop All</Link>
      </div>
    </div>
  )
}

export default Banner