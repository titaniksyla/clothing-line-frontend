import React from 'react'
import Product from '../../components/shared/Product/Product'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './MyItems.scss'

function MyItems() {
  try{
    axios.get('http://localhost:8080'
    ).then(data => {
      console.log(data.data);
    })
  }catch(error){
    console.log(error);
  }
  return (
    <div className='myitems-container'>
      <Link to="/newproduct" className='new-product-link'><p>Add product +</p></Link>
      <Product />
      <Product />
    </div>
  )
}

export default MyItems