import React from 'react'
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import './AllBrands.scss'
import BtnSlider from '../../../shared/BtnSlider/BtnSlider';

import img1 from './../../../../assets/screens/Home/allbrands-assets/image1.jpg'
import img2 from './../../../../assets/screens/Home/allbrands-assets/image2.jpg'
import img3 from './../../../../assets/screens/Home/allbrands-assets/image3.jpg'
import img4 from './../../../../assets/screens/Home/allbrands-assets/image4.jpg'
import img5 from './../../../../assets/screens/Home/allbrands-assets/image5.jpg'


function AllBrands(){

  const [slideIndex, setSlideIndex] = useState(1);

  const brandsData = [
    {
      id:1,
      alt: 'nike-logo'
    },
    {
      id:2, 
      alt: 'adidas-logo'
    },
    {
      id:3,
      alt: 'fog-logo'
    },
    {
      id:4,
      alt: 'newbalance-logo'
    },
    { 
      id:5,
      alt: 'truereligion-logo'
    }
  ]

  function imgGenerator(i){
      switch(i){
        case 1:
           return img1
        break;
        case 2:
           return img2
        break;
        case 3:
           return img3
        break;
        case 4:
           return img4
        break;
        case 5:
           return img5
        break;
        default:
           return 'keq o puna';
      }
    }

  function nextSlide() {
    if(slideIndex !== brandsData.length){
      setSlideIndex(slideIndex+1);
    }
    else if(slideIndex === brandsData.length){
      setSlideIndex(1);
    }
  }

  function prevSlide() {
    if(slideIndex !== 1){
      setSlideIndex(slideIndex-1);
    }
    else if(slideIndex === 1){
      setSlideIndex(brandsData.length)
    }
  }
  return (
    <div className='allbrands-container'>
      <div className="title-button">
        <div className="allbrands-title">
          <h1>Brands featured</h1>
        </div>
        <div className="allbrands-btn">
            <Link to='/brands' className="view-allbrands-btn">
              All Brands
            </Link>
        </div>
      </div>
         {brandsData.map((data, index) => {
           return(
             <div key={data.id}
              className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}>
               <img src={imgGenerator(index+1)} alt={data.alt}/>
             </div>
           )
         })}
 
         <BtnSlider moveSlide={nextSlide} direction={'next'}/>
         <BtnSlider moveSlide={prevSlide} direction={'prev'}/>
       
     </div>
   )
}


export default AllBrands