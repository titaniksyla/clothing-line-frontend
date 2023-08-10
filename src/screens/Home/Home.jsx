import React from 'react'
import './Home.scss'
import Banner from '../../components/screens/Home/Banner/Banner'
import AllCollections from '../../components/screens/Home/AllCollections/AllCollections'
import AllBrands from '../../components/screens/Home/AllBrands/AllBrands'
import SellingItems from '../../components/screens/Home/SellingItems/SellingItems'

function Home(){
  return (
    <div className='home-container'>
      <Banner />
      <AllCollections />
      <SellingItems />
      <AllBrands />
    </div>
  )
}

export default Home