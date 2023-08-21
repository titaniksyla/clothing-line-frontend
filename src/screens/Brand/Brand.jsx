import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './Brand.scss'

import { useParams } from 'react-router-dom'
import { useState } from 'react'

function Brand(props) {

  const [brand, setBrand] = useState({});
  const [products, setProducts] = useState([]);
  const {brandId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/brand/${brandId}`).then( data => {
      // let brand_id = localStorage.setItem('brand_id', `${brandId}`);
      setBrand(data.data.brand);
      setProducts(data.data.productsToShow);
      console.log(data.data.productsToShow);
    })
  }, [brandId])

  function activeBox(key){
    for(let i=1; i<=key;i++){
      switch(key){
        case i:
          return i;
        break;
      }
    }
  }

  return (
    <div className='brand-container'>
      <div className="brand-banner">
        <h1>All {brand.brand_name} products are listed here</h1>
        <h3>Rating: {brand.brand_rating}</h3>
        <img src={brand.brand_image_url} alt="banner-img"/>
      </div>
      <div className="products-boxes">        
        {products.map(({price, id, product_name, product_image}) => {
          return(
            <div key={id} className='prod'>
              <div className="abs-container">
                    <p className='cmimi'>${price}</p>
                    <p className='zbritja'>-20%</p>
              </div>
              <div className="producti-container" >
                <div className="product-img">
                  <img src={product_image} alt='logo'/>
                </div>
                <h4>{product_name}</h4>
                <div className="product-info">
                  <Link to={`/product/${activeBox(id)}`}>Shiko produktin</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Brand