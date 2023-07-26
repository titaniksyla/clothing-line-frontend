import React from 'react'
import Product from '../../components/shared/Product/Product'
import {Link} from 'react-router-dom'

import './MyItems.scss'

function MyItems() {
  return (
    <div className='myitems-container'>
      <Link to="/newproduct" className='new-product-link'><p>Add product +</p></Link>
      <Product />
      <Product />
    </div>
  )
}

export default MyItems