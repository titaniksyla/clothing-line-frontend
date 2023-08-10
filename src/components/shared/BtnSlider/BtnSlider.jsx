import React from 'react'
import './BtnSlider.scss'

import {BsArrowLeft} from 'react-icons/bs'
import {BsArrowRight} from 'react-icons/bs'

function BtnSlider({moveSlide, direction}) {
  return (
      <button className={direction == 'next' ? 'btn-slide next' : 'btn-slide prev'} onClick={moveSlide}>
        {direction == 'next' ? <BsArrowLeft className='arrowleft'/> : <BsArrowRight className='arrowright'/>}
      </button>  
  )
}

export default BtnSlider