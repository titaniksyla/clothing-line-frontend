import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./NewProduct.scss";
import { useNavigate } from "react-router-dom";

function NewProduct() {

  const [brandsData, setBrandsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [collectionsData, setCollectionsData] = useState([]);

  const [productName, setProductName] = useState(null);
  const [productDescription, setProductDescription] = useState(null);
  const [brandValue, setBrandValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [collectionValue, setCollectionValue] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [productColor, setProductColor] = useState(null);
  const [productSize, setProductSize] = useState(null);
  const [qtyInStock, setQtyInStock] = useState(null);
  const [price, setPrice] = useState(null);

  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  // const [productData, setProductData] = useState({});
  // const [changed, setChanged] = useState(false);

  useEffect( () => {
    axios.get('http://localhost:8080/product')
    .then( data => {
      // console.log(data.data);
      setBrandsData(data.data.allBrands);
      setCategoriesData(data.data.allCategories);
      setCollectionsData(data.data.allCollections);
    })
  }, [])


  function handleProductName(e) {
    setProductName(e.target.value);
    setShowError(false);
  }
  function handleProductDescription(e) {
    setProductDescription(e.target.value);
    setShowError(false);
  }
  function handleBrandSelector(e) {
    setBrandValue(e.target.value);
    setShowError(false);
  }
  function handleCategorySelector(e) {
    setCategoryValue(e.target.value);
    setShowError(false);
  }
  function handleCollectionSelector(e) {
    setCollectionValue(e.target.value);
    setShowError(false);
  }
  function handleProductImage(e) {
    setProductImage(e.target.value);
    setShowError(false);
  }
  function handleProductColor(e) {
    setProductColor(e.target.value);
    setShowError(false);
  }
  function handleProductSize(e) {
    setProductSize(e.target.value);
    setShowError(false);
  }
  function handleQtyInStock(e) {
    setQtyInStock(e.target.value);
    setShowError(false);
  }
  function handlePrice(e) {
    setPrice(e.target.value);
    setShowError(false);
  }

  function validateProduct() {
    if (productName && productDescription  && brandValue && categoryValue && productImage && productColor && productSize && qtyInStock && price) {
      let user_id = localStorage.getItem('user_id'); 

      let productObj = {
        userId: user_id,
        brandId: brandValue,
        categoryId: categoryValue,
        collectionId: collectionValue,
        product_name: productName,
        product_description: productDescription,
        product_image: productImage,
        product_color: productColor,
        product_size: productSize,
        qty_in_stock: qtyInStock,
        price: price
      };
      
      try{
        axios
        .post("http://localhost:8080/product", productObj)
        .then((data) => {
          console.log('product data',data.data);
          navigate(`/myproducts`);
          toast.success('You\'ve  registred your new product', {
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
      }catch(error){
        console.log(error);
        setShowError(true);
      }
    }
    else{
      toast.error('Please fill all the input fields', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  return (
    <div className="newproduct-container">
      <div className="newproduct-form-container">
        <div className="newproduct-title">
          <h1>New Product</h1>
        </div>
        <form action="" className="newproduct-form">
          {showError && (
            <h6 className="error-trigger">
              Please fill all the input fieds in order to register the new product!!
            </h6>
          )}

          <div className="sm-input-container">
            <div className="sm-input">
              <input type="text" name="productName" id="productName" placeholder="ProductName.."  onChange={handleProductName} />
            </div>
            <div className="sm-input">
              <input
                type="text"
                name="productdescription"
                id="productdescription"
                placeholder="Product Description.."
                onChange={handleProductDescription}
              />
            </div>
          </div>
          <div className="lg-input">
            <select name="brand" id="brand" onChange={handleBrandSelector}>
              <option value="">Select brand..</option>
              {brandsData.map( brand => {
                return(
                  <option key={brand.id} value={brand.id}>{brand.brand_name}</option>    
                )
              })}
            </select>
          </div>
            <div className="lg-input">
              <select name="category" id="category" onChange={handleCategorySelector}>
                <option value="">Select category..</option>
                {categoriesData.map( category => {
                  return(
                    <option key={category.id} value={category.id}>{category.category_name}</option>    
                  )
                })}
              </select> 
            </div>
            <div className="lg-input">
              <select name="collection" id="collection" onChange={handleCollectionSelector}>
                <option value="">Select collection..</option>
                {collectionsData.map( collection => {
                  return(
                    <option key={collection.id} value={collection.id}>{collection.collection_name}</option>    
                  )
                })}
              </select> 
            </div>
            <div className="lg-input">
              <input
                type="text"
                name="productimage"
                id="productimage"
                placeholder="Product Image URL.."
                onChange={handleProductImage}
              />
            </div>
          <div className="lg-input">
            <input
              type="text"
              name="productcolor"
              id="productcolor"
              placeholder="Product Color.."
              onChange={handleProductColor}
            />
          </div>
          <div className="lg-input">
            <input
              type="text"
              name="productsize"
              id="productsize"
              placeholder="Product Size.."
              onChange={handleProductSize}
            />
          </div>

          <div className="lg-input">
            <input
              type="text"
              name="qty_in_stock"
              id="qty_in_stock"
              placeholder="Pairs left.."
              onChange={handleQtyInStock}
            />
          </div>
          
          <div className="lg-input">
            <input
              type="text"
              name="price"
              id="price"
              placeholder="Price.."
              onChange={handlePrice}
            />
          </div>

          <div className="btn-container">
            <div className="newproduct-btn" onClick={validateProduct}>
              Enter
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
