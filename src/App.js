import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/Footer/Footer";

import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import Contact from "./screens/Contact/Contact";

import Login from "./screens/auth/Login/Login";
import Signup from "./screens/auth/Signup/Signup";
import MyProfile from "./screens/MyProfile/MyProfile";

import Brands from "./screens/Brands/Brands";
import Brand from "./screens/Brand/Brand";

import Products from "./screens/Products/Products";
import Product from "./screens/Product/Product";
import MyProducts from "./screens/MyProducts/MyProducts";
import NewProduct from "./components/shared/NewProduct/NewProduct";

import Collection from './screens/Collection/Collection'

import Error from "./screens/Error/Error";
import EditProduct from "./screens/EditProduct/EditProduct";
import CartProducts from "./screens/CartProducts/CartProducts";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('user_id'));


  function userIsLoggedIn(userLoggedIn) {
    setIsUserLoggedIn(userLoggedIn);
  }

  function logUserOut(){
    setIsUserLoggedIn(false);
    console.log(isUserLoggedIn);
    localStorage.clear();
    toast.success('You\'ve been logged out', {
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

  useEffect(() => {
    if(localStorage.getItem('user_role')){
      setIsUserLoggedIn(true)
      setUserRole(localStorage.getItem('user_role'))
    }
  } , [])

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Navbar loginBtn={isUserLoggedIn} logUserOut={logUserOut}/>
      
        {isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/newproduct" element={<NewProduct/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/product/:productId" element={<Product/>} />
            <Route path='/myproducts' element={<MyProducts />} />
            <Route path='/brands' element={<Brands />} />
            <Route path='/brands/:brandId' element={<Brand />} />
            <Route path='/collection/:collectionId' element={<Collection />} />
            <Route path='/editproduct/:productId' element={<EditProduct/>} />
            <Route path='/cartproducts' element={<CartProducts/>} />
            <Route path='*' element={<Error />} />
          </Routes>
        )}
        {!isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path='/brands/:brandId' element={<Brand />} /> */}
            <Route path='/brands' element={<Brands />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* <Route path="/products" element={<Products/>} /> */}
            <Route
              path="/login"
              element={<Login logUserIn={userIsLoggedIn} />}
            />
            <Route />
            <Route path="/signup" element={<Signup logUserIn={userIsLoggedIn}/>} />
            <Route path='*' element={<Error />} />
          </Routes>
        )}
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
