import React, {useState, useEffect } from 'react'
import axios from 'axios'
import './Collection.scss'
import { toast } from "react-toastify";

import { useParams, Link } from 'react-router-dom'



function Collection() {

  const [collection, setCollection] = useState([]);
  const [collectionProduct, setCollectionProduct] = useState([]);
  const {collectionId} = useParams();

  useEffect(() => {
    try {
      axios.get(`http://localhost:8080/collection/${collectionId}`)
    .then( data => {
      // let collection_id = localStorage.setItem('collection_id', `${collectionId}`);
      // console.log(data.data);
      setCollection(data.data.collection);
      setCollectionProduct(data.data.collectionProducts)
    })
    } catch (error) {
      console.log('qetu o errori',error);
    }
  }, [collectionId])

  function addCart() {
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
    // navigate('/');
  }

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
    <div className='collection-container'>
      <div className="collections-boxes">        
        {collectionProduct.map((data) => {
          return(
            <div key={data.id} className='prod'>
              <div className="abs-container">
                    <p className='cmimi'>${data.price}</p>
                    <p className='zbritja'>-20%</p>
                  </div>
              <div className="producti-container" >
                <div className="product-img">
                  <img src={data.product_image} alt='logo'/>
                </div>
                <div className="product-info">
                  <Link to={`/product/${activeBox(data.id)}`}>Shiko produktin</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Collection