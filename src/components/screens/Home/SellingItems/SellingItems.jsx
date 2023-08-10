import React from 'react'
import { useNavigate } from 'react-router-dom'
import './SellingItems.scss'

function SellingItems() {
  const navigate = useNavigate();

  function clickBtn(){
    navigate('/about');
  }

  return (
    <div className='sellItems-container'>
      <h1>Sell Your Items Faster Than Ever.</h1>
      <p>With Clothing Line you can sell your item very fast. The process is very simple, list your item and trade it or sell it very fast.</p>
      <div className="btn-container" >
        <p onClick={clickBtn}>Learn more</p>
      </div>
    </div>
  )
}

export default SellingItems