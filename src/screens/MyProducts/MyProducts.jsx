import React, { useEffect, useState } from "react";
// import Product from '../../components/shared/Product/Product'
import { Link , useParams } from "react-router-dom";
import axios from "axios";

import "./MyProducts.scss";

function MyProducts() {

  const {userId} = useParams();
  const [myProductsData, setMyProductsData] = useState([]);

  function activeBox(key) {
    for (let i = 1; i <= key; i++) {
      switch (key) {
        case i:
          return i;
          break;
      }
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      let user_id = localStorage.getItem("user_id");
      try {
        axios.get(`http://localhost:8080/myproducts/${user_id}`).then((data) => {
          // console.log(data.data.myProducts);
          setMyProductsData(data.data.myProducts);
        });
      } catch (error) {
        console.log(error);
      }
    }
    else{
      console.log('ki ba gabim');
    }
  }, [userId]);

  return (
    <div className="myproducts-container">
      <div className="myproducts-boxes">
        <Link to="/newproduct" className="new-product-link">
          <p>Add product +</p>
        </Link>
        {/* {myProductsData.length <= 0 &&
          <h1>no data has been found</h1>
        } */}
        {myProductsData.map((data) => {
          return (
            <Link to={`/product/${activeBox(data.id)}`} key={data.id}>
              <div className="myproduct-container">
                <div className="myproduct-img">
                  <img src={data.product_image} alt="product-img" />
                </div>
              </div>
            </Link>
          );
        })} 
      </div>
    </div>
  );
}

export default MyProducts;
