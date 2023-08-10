import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import './Brands.scss'

// import nikeLogo from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.svgrepo.com%2Fsvg%2F303214%2Fnike-4-logo&psig=AOvVaw2LGZXzcqStdLQ7xAFggdJ0&ust=1690886980829000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJi-soHjuIADFQAAAAAdAAAAABAE'
// import adidasLogo from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Fadidas-logo-2%2F&psig=AOvVaw2_gJH8YekhiHbp2EEcJhC6&ust=1690887014202000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCiwpHjuIADFQAAAAAdAAAAABAI'
// import newbalanceLogo from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Fnew-balance-logo%2F&psig=AOvVaw1OPItV0jhiP0wvScfhL701&ust=1690887147331000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCLjRw9DjuIADFQAAAAAdAAAAABAE'
// import fogLogo from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2Fnow-available-fear-of-god-essentials-collection-in-2022--1034279870645574249%2F&psig=AOvVaw2x9yU6iWHe17i4sbmLtjB8&ust=1690887117335000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCTscLjuIADFQAAAAAdAAAAABAE'
// import truereligionLogo from 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F765823111637570001%2F&psig=AOvVaw1ep1om1QhBEXTU7z-jr7BC&ust=1690887180756000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCTuuDjuIADFQAAAAAdAAAAABAE'

function Brands() {

  const[brandsData, setBrandsData] = useState([]);

  function activeBox(key){
    switch(key){
      case 1:
        return 1;
      break;
      case 2:
        return 2;
      break;
      case 3:
        return 3;
      break;
      case 4:
        return 4;
       break;
      case 5:
       return 5;
      break;
    }
  }

  useEffect(() => {
    try{
      axios.get('http://localhost:8080/brands').then( data => {
        setBrandsData(data.data.allBrands);
      })
    }catch(error){
      console.log(error);
    }
  }, [])

  return (
    <div className='brands-container'>
      <div className="brands-boxes">
        {brandsData.map((data) => {
          return(
            <Link to={`/brands/${activeBox(data.id)}`} key={data.id}>
              <div className="brand-container" >
                <div className="brand-img">
                  <img src={data.brand_image_url} alt='logo' />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      
    </div>
  )
}

export default Brands