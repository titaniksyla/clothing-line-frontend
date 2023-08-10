import React, {useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './AllCollections.scss'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function AllCollections(){

  const [collectionsData, setCollectionsData] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1300 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1300, min: 800 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8080/product')
    .then( (data) => {                      
      console.log(data.data.allCollections);
      setCollectionsData(data.data.allCollections);
    })
  }, []);

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

  return (
    <div className='allcollections-container'>
      <div className="allcollections-title">
        <h1>Collections featured</h1>
      </div>
      <div className="allcollections-boxes">
      <Carousel responsive={responsive} className='carousel'>
        {collectionsData.map((collection) => {
          return(
            <Link to={`/collection/${activeBox(collection.id)}`} className='collection-box' key={collection.id}>
              <div className='collection-link'>
                <div className="collection-container" >
                  <div className="collection-img">
                    <img src={collection.collection_img} alt='collection-pic' />
                  </div>
                </div>
              </div>
              <h1>{collection.collection_name}</h1>
            </Link>
          )
        })}
        </Carousel>
      </div>
    </div>
  )
}

export default AllCollections