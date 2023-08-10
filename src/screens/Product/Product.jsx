import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import './Product.scss'

import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'

import {AiOutlineEdit} from 'react-icons/ai'

function Product(props) {

  const [product, setProduct] = useState([]);
  const {productId} = useParams();
  const userId = localStorage.getItem('user_id');
  const user_role = localStorage.getItem('user_role');
   
  function changeCategory(categoryId){
    switch(categoryId){
      case 1: 
        return 'Tops'
      break;
      case 2: 
        return 'Bottoms'
      break;
      case 3: 
        return 'Shoes'
      break;
      case 4: 
        return 'Beanies'
      break;
      case 5: 
        return 'Hats'
      break;
      default: 
        return "this category doesn't exist"
    }
  }
  function changeBrand(brandId){
    switch(brandId){
      case 1: 
        return 'Nike'
      break;
      case 2: 
        return 'Adidas'
      break;
      case 3: 
        return 'Fear Of God'
      break;
      case 4: 
        return 'New Balance'
      break;
      case 5: 
        return 'True Religion'
      break;
      default: 
        return "this brand doesn't exist"
    }
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${productId}`).then( data => {
      console.log(data.data.product);
      setProduct(data.data.product);
    })
  }, [productId])

  const cartProductObj = {
    userId:userId,
    productId: productId,
    productName: product.product_name,
    productImage: product.product_image,
    productQuantity: product.qty_in_stock,
    productPrice: product.price
  }
   
  function addCart() {
    try{
      axios.post('http://localhost:8080/cartproducts',cartProductObj)
      .then(data => {
        toast.success('You\'ve added a product', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      }
      
      )
    }catch(error){
      console.log(error);
    }
    
    // navigate('/');
  }

  return (
    <div className='product-container'>
      <div className="product-flex-container">
        <div className="product-right">
          <img src={product.product_image} alt="prod-img"/>
        </div>
        <div className="product-left">
          <h1>{product.product_description}</h1>
          <p>{product.product_name}</p>
          <p>Color: {product.product_color}</p>
          <p>Category: {changeCategory(product.category_id)}</p>
          <p>Brand: {changeBrand(product.brand_id)}</p>
          <p>Size: {product.product_size}</p>
          <p>In Stock: {product.qty_in_stock}</p>
          <h3>Price: {product.price}</h3>
          
          {product.user_id == userId  &&
            <Link to={`/editproduct/${productId}`} className='edit-link'><AiOutlineEdit size={30} color='#252525'/>Edit product</Link>
          }
          {product.user_id != userId &&
          <div className="btn-container">
            <div className="addCart-btn" onClick={addCart} >
              Add to cart
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Product