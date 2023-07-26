import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./NewProduct.scss";

function NewProduct() {

  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productColor, setProductColor] = useState('');
  const [productSize, setProductSize] = useState('');
  const [qtyInStock, setQtyInStock] = useState('');
  const [price, setPrice] = useState('');

  const [showError, setShowError] = useState(false);

  function handleProductName(e) {
    setProductName(e.target.value);
    setShowError(false);
  }
  function handleProductDescription(e) {
    setProductDescription(e.target.value);
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
    if (productName && productDescription && productImage && productColor && productSize && qtyInStock && price) {
      setShowError(false);

      let user_id = localStorage.getItem('user_id'); 

      let productObj = {
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
          console.log(data)
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
            // console.log("id e productit", data.data.id);
            // localStorage.setItem("product_id", data.data.id);
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
              <input type="text" name="productName" id="productName" placeholder="ProductName.." onChange={handleProductName} />
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
