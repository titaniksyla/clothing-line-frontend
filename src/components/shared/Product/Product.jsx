import React from 'react'
import axios from 'axios'
import './Product.scss'

function Product(){

  try{
    // axios.post('http://localhost:8080/product')
    // .then(data => console.log(data))
  }catch(error){
    console.log(error);
  }

  return (
    <div className='product-container'>
      Product
    </div>
  )
}

export default Product