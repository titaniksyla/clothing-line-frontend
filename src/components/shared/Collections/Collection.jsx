import React from 'react'
import Product from '../Product/Product'
import {Link} from 'react-router-dom'
import './Collection.scss'

function Collection() {
  return (
    <div className='collections-container'>
      <Product />
      <Product />
      <Product />
    </div>
  )
}

export default Collection