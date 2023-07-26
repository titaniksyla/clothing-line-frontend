import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.scss";

function Login(props) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [authError, setAuthError] = useState(false);
  const [showError, setShowError] = useState(false);
  
  const navigate = useNavigate();

  function handleEmail(e) {
    setEmail(e.target.value);
    setShowError(false);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    setShowError(false);
  }

  function validateLogin() {
    if (email && password) {
      try {
        axios
          .post("http://localhost:8080/login", {
            email: email,
            password: password,
          })
          .then((data) => {
            if (data.data.message == "Keni dhene fjalkalimin e duhur") {
              props.logUserIn(true);
              toast.success('You\'ve been logged in', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
              console.log("roli i userit", data.data.role);
              localStorage.setItem("user_role", data.data.role);

              let role;
              if (data.data.role == "1") {
                role = "user";
                navigate('/');
              } else if (data.data.role == "2") {
                role = "seller";
                navigate('/myprofile')
              }

              console.log("roli mas login", role);

              localStorage.setItem("user_role", role);
              localStorage.setItem("user_id", data.data.user_id);
            } else {
              setAuthError(true);
              toast.error('Wrong email or password!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            }
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-title">
          <h1>Log in</h1>
        </div>
        <form className="login-form">
          {showError && <h5>Please fill all the input fields!</h5>}
          {authError && <h5>You've typed the wrong email or password!!</h5>}
          <div className="sm-input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email.."
              onChange={handleEmail}
            />
          </div>
          <div className="sm-input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password.."
              onChange={handlePassword}
            />
          </div>
          <div className="signup-popup">
            <p>
              Don't have an account yet? Sign up <Link to="/signup">here</Link>{" "}
            </p>
          </div>
          <div className="btn-container">
            <div className="login-btn" onClick={validateLogin}>
              Log in
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
