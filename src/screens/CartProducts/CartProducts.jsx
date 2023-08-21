import React, { useState,  useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import './CartProducts.scss'

import {GrFormClose} from 'react-icons/gr'
import { toast } from 'react-toastify';

function CartProducts() {

  const [cartProducts, setCartProducts] = useState([]);
  const {userId} = useParams();
  const {cartProductId} = useParams();


  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      let user_id = localStorage.getItem("user_id");
      try {
        axios.get(`http://localhost:8080/cartproducts/${user_id}`)
        .then((data) => {
          console.log(data.data.findAllCartProducts);
          setCartProducts(data.data.findAllCartProducts);
        });
      } catch (error) {
        console.log(error);
      }}
      else{
        console.log('ki ba gabim');
      }
  }, [userId]);

  function deleteCardProduct(cartProductId){
    try{
      axios.delete(`http://localhost:8080/cartproduct/${cartProductId}`)
      .then( data => {
        console.log(`Deleted product number ${cartProductId} in cart table`);
        const filteredProducts = [...cartProducts].filter(product => product.id !== cartProductId)
        setCartProducts(filteredProducts)
      })
      toast.success(`You\'ve deleted from cart product with ID ${cartProductId}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className='cartproducts-container'>
      {cartProducts.length === 0 && 
        <div className="addItem">
          <h1>There's no product added to cart</h1>
          <Link to='/products'>Go Shop</Link>
        </div>
      }
      {cartProducts.length > 0 && 
        <div className="cartproducts">
        <div className="cartproducts-title">
          <h1>Added to cart</h1>
        </div>
        <div className="cartproducts-table">

          <div className="cartproducts-table-info">
            {/* <h3>ID:</h3> */}
            <h3>Image:</h3> 
            <h3>Name:</h3> 
            <h3>Quantity:</h3> 
            <h3>Price:</h3> 
            <h3>Delete:</h3>
          </div>
          {cartProducts.map( product => {
            return(
              <div className="cartproduct-row" key={product.id}>
                {/* <p>{product.product_id}</p> */}
                <img src={product.product_image} alt="prod-img"/>
                <p>{product.product_name}</p>
                <p>{product.product_quantity}</p>
                <p>{product.product_price}</p>
                <div className="delete-btn" onClick={() => deleteCardProduct(product.id)}>
                  <GrFormClose size={40} className='close'/>
                </div>
              </div>
            )
          })

          }
        </div>
      </div>
      }
    </div>
  )
}

export default CartProducts