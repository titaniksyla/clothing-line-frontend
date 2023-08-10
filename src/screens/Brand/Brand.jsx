import React, { useEffect } from 'react'
import axios from 'axios'
import './Brand.scss'

import { useParams } from 'react-router-dom'
import { useState } from 'react'

function Brand(props) {

  const [brand, setBrand] = useState({});
  const {brandId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/brand/${brandId}`).then( data => {
      let brand_id = localStorage.setItem('brand_id', `${brandId}`);
      setBrand(data.data.brand);
    })
  }, [brandId])

  return (
    <div className='brand-container'>
      <div className="brand-banner">
        <h1>All {brand.brand_name} products are listed here</h1>
        <h3>Rating: {brand.brand_rating}</h3>
        <img src={brand.brand_image_url} alt="banner-img"/>
      </div>
    </div>
  )
}

export default Brand