import React from 'react'
import './EditProduct.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link , useNavigate, useParams} from 'react-router-dom';

function EditProduct() {

  const [productData , setProductData] = useState([]);
  const [brandsData, setBrandsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [collectionsData, setCollectionsData] = useState([]);

  const {productId} = useParams();

  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();

  useEffect( () => {
    axios.get('http://localhost:8080/product')
    .then( data => {
      // console.log(data.data);
      setBrandsData(data.data.allBrands);
      setCategoriesData(data.data.allCategories);
      setCollectionsData(data.data.allCollections);
    })
  }, [])

  useEffect(() => {
    axios.get(`http://localhost:8080/product/${productId}`).then( data => {
      // localStorage.setItem('product_id', productId);
      console.log(data.data.product);
      setProductData(data.data.product);
    })
  }, [productId])

  function checkBrand(id){
    switch(id){
      case 1:
        return 'Nike' || 'Tops'
      break;
      case 2:
        return 'Adidas'
      break;
      case 3:
        return 'Fear Of God'
      break;
      case 4:
        return 'New Balance'
      break;
      case 5:
        return 'True Religion'
      break;
    }
  }
  function checkCategory(id){
    switch(id){
      case 1:
        return 'Tops'
      break;
      case 2:
        return 'Bottoms'
      break;
      case 3:
        return 'Shoes'
      break;
      case 4:
        return 'Beanies'
      break;
      case 5:
        return 'Hats'
      break;
    }
  }
  function checkCollection(id){
    switch(id){
      case 1:
        return 'Hot'
      break;
      case 2:
        return 'Shirts'
      break;
      case 3:
        return 'Hoodies'
      break;
      case 4:
        return 'Shorts'
      break;
      case 5:
        return 'On Sale'
      break;
    }
  }

  function updateProductData(){
    // let product_id = localStorage.getItem('product_id');
    if (changed) {
      try {
        axios
          .put(`http://localhost:8080/editproduct/${productId}`, {
            ...productData,
            brandId: Number(productData.brand_id),
            categoryId: Number(productData.category_id),
            collectionId: Number(productData.collection_id)
            // productId: product_id
          })
          .then((data) => {
            console.log(data.data);
            toast.success('You\'ve  updated product info', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              });
          });
          navigate('/myproducts');
        }
        catch(error) {
          console.log(error);
        }
      }
  }

  return (
  <div className='editproduct-container'>
    <div className="editproduct-form-container">
        <div className="editproduct-title">
          <h1>Edit product with ID:{productId}</h1>
        </div>
      {productData && (
        <form action="" className="editproduct-form">
            <div className="lg-input">
              <label htmlFor="productname">Product Name:</label>
              <input
                type="text"
                name="productname"
                id="productname"
                value={productData.product_name}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    product_name: e.target.value,
                  });
                  setChanged(true);
                }}
              />
            </div>
            <div className="lg-input">
              <label htmlFor="productdescription">Product Description:</label>
              <input
                type="text"
                name="productdescription"
                id="productdescription"
                value={productData.product_description}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    product_description: e.target.value,
                  });
                  setChanged(true);
                }}
              />
            </div>

          <div className="lg-input">
            <label htmlFor="brand">Brand:</label>
            <select 
              name="brand" 
              id="brand"
              onChange={(e) => {
                setProductData({
                  ...productData,
                  brand_id: e.target.value
                })
                setChanged(true);
              }}>
                <option value={productData.brand_id}>{checkBrand(productData.brand_id)}</option>
                {brandsData.map( brand => {
                  return(
                    <option value={brand.id} key={brand.id}>{brand.brand_name}</option>
                  )
                })
                }
              </select>
          </div>

          <div className="lg-input">
            <label htmlFor="category">Category:</label>
            <select 
              name="category" 
              id="category"
              onChange={(e) => {
                setProductData({
                  ...productData,
                  category_id: e.target.value
                })
                setChanged(true);
              }}>
              <option value={productData.category_id}>{checkCategory(productData.category_id)}</option>
              {categoriesData.map( category => {
                  return(
                    <option value={category.id} key={category.id}>{category.category_name}</option>
                  )
                })
                }
            </select>
          </div>

          <div className="lg-input">
            <label htmlFor="collection">Collection:</label>
            <select 
              name="collection" 
              id="collection"
              onChange={(e) => {
                setProductData({
                  ...productData,
                  collection_id: e.target.value
                })
                setChanged(true);
              }}>
              <option value={productData.collection_id}>{checkCollection(productData.collection_id)}</option>
              {collectionsData.map( collection => {
                  return(
                    <option value={collection.id} key={collection.id}>{collection.collection_name}</option>
                  )
                })
                }
            </select>
          </div>

          <div className="lg-input">
            <label htmlFor="productimage">Product Image URL..:</label> 
              <input
                type="text"
                name="productimage"
                id="productimage"
                value={productData.product_image}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    product_image: e.target.value,
                  });
                  setChanged(true);
                }}
              />
          </div>

          <div className="lg-input">
            <label htmlFor="productcolor">Product Color:</label> 
              <input
                type="text"
                name="productcolor"
                id="productcolor"
                value={productData.product_color}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    product_color: e.target.value,
                  });
                  setChanged(true);
                }}
              />
          </div>

          <div className="lg-input">
            <label htmlFor="productsize">Product Size:</label> 
              <input
                type="text"
                name="productsize"
                id="productsize"
                value={productData.product_size}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    product_size: e.target.value,
                  });
                  setChanged(true);
                }}
              />
          </div>

          <div className="lg-input">
              <label htmlFor="qty_in_stock">Quantity:</label> 
              <input
                type="text"
                name="qty_in_stock"
                id="qty_in_stock"
                value={productData.qty_in_stock}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    qty_in_stock: e.target.value,
                  });
                  setChanged(true);
                }}
              />
            </div>
          <div className="lg-input">
          <label htmlFor="price">Price:</label> 
              <input
                type="text"
                name="price"
                id="price"
                value={productData.price}
                onChange={(e) => {
                  setProductData({
                    ...productData,
                    price: e.target.value,
                  });
                  setChanged(true);
                }}
              />
          </div>

          <div className="btn-container">
                <div
                  className={changed ? "save" : " disabled"}
                  onClick={updateProductData}
                >
                  Save
                </div>
              </div>
          </form>
        )
      }
    </div>
  </div>
  )
}

export default EditProduct
