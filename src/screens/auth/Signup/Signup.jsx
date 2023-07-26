import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Signup.scss";

function Signup(props) {
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const [showError, setShowError] = useState(false);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  function handleName(e) {
    setFirstName(e.target.value);
    setShowError(false);
  }
  function handleLastname(e) {
    setLastname(e.target.value);
    setShowError(false);
  }
  function handleUsername(e) {
    setUsername(e.target.value);
    setShowError(false);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
    setShowError(false);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    setShowError(false);
  }

  function validateSignup() {
    if (firstname && lastname && username && email && password) {
      setShowError(false);
      let userObj = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password,
        role: role,
      };

      // console.log(userObj)

      axios
        .post("http://localhost:8080/register", userObj)
        .then(
          (data) => {
            console.log(data)
            toast.success('You\'ve been signed up.', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
              props.logUserIn(true);
              let role;
              if (data.data.role == "1") {
                role = "user";
                navigate('/')
              } else if (data.data.role == "2") {
                role = "seller";
                navigate('/myprofile')
              }
              let signupRole = localStorage.setItem('user_role', role);
              let signupId = localStorage.setItem('user_id', data.data.user_id);
          }
        );
    } else {
      setShowError(true);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-title">
          <h1>Sign up</h1>
        </div>
        <form action="" className="signup-form">
          {showError && (
            <h6 className="error-trigger">
              Please fill all the input fieds in order to register!!
            </h6>
          )}

          <div className="sm-input-container">
            <div className="sm-input">
              <input type="text" name="name" id="name" placeholder="Name.." onChange={handleName} />
            </div>
            <div className="sm-input">
              <input
                type="text"
                name="lastname"
                id="lastname"
                placeholder="Last Name.."
                onChange={handleLastname}
              />
            </div>
          </div>
            <div className="lg-input">
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username.."
                onChange={handleUsername}
              />
            </div>
          <div className="lg-input">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email.."
              onChange={handleEmail}
            />
          </div>
          <div className="lg-input">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password.."
              onChange={handlePassword}
            />
          </div>

          <div className="role-toggle">
            <div
              className={role === "user" ? "role role-active" : "role"}
              onClick={() => setRole("user")}
            >
              <p>Costumer(buying)</p>
            </div>
            <div
              className={role === "seller" ? "role role-active" : "role"}
              onClick={() => setRole("seller")}
            >
              <p>Seller(selling)</p>
            </div>
          </div>

          <div className="login-popup">
            <p>Already have an account? Log in <Link to='/login'>here</Link> </p> 
          </div>

          <div className="btn-container">
            <div className="signup-btn" onClick={validateSignup}>
              Sign up
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
