import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/shared/Navbar/Navbar";
import Footer from "./components/shared/Footer/Footer";

import Home from "./screens/Home/Home";
import About from "./screens/About/About";
import Shop from "./screens/Shop/Shop";
import Contact from "./screens/Contact/Contact";
import Login from "./screens/auth/Login/Login";
import Signup from "./screens/auth/Signup/Signup";
import MyProfile from "./screens/MyProfile/MyProfile";
import NewProduct from "./components/shared/NewProduct/NewProduct";
import MyItems from "./screens/MyItems/MyItems";
import Brands from "./screens/Brands/Brands";
import Brand from "./screens/Brand/Brand";
// import MyProfile from './screens/MyProfile/MyProfile';

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);


  function userIsLoggedIn(userLoggedIn) {
    setIsUserLoggedIn(userLoggedIn);
  }

  function logUserOut(){
    setIsUserLoggedIn(false);
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
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/newproduct" element={<NewProduct/>} />
            <Route path="/itemslisted" element={<MyItems />} />
            <Route path='/brands/:brandId' element={<Brand />} />
          </Routes>
        )}
        {!isUserLoggedIn && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/brands/:brandId' element={<Brand />} />
            <Route path='/brands' element={<Brands />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={<Login logUserIn={userIsLoggedIn} />}
            />
            <Route />
            <Route path="/signup" element={<Signup logUserIn={userIsLoggedIn}/>} />
          </Routes>
        )}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
