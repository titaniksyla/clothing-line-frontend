import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Link , useNavigate} from 'react-router-dom';
// import Loader from "../../partials/Loader/Loader";
import "./MyProfile.scss";

function MyProfile(props) {
  // const [loading, setLoading] = useState(true);
  const [userProfileData, setUserProfileData] = useState({});
  const [sellerProfileData , setSellerProfileData] = useState({});
  const [changed, setChanged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user_id")) {
      let user_id = localStorage.getItem("user_id");

      axios
        .post("http://localhost:8080/myprofile", {
          user_id: user_id,
        })
        .then((data) => {
          // setTimeout(() => {
          //   setLoading(false);
          // }, 500);

          setUserProfileData(data.data);
          console.log(data.data);
        });

        axios.post("http://localhost:8080/sellerprofile" , {
          user_id: user_id,
        }).then((data) => {
          setSellerProfileData(data.data);
          console.log('seller data', data.data);
        })
    }
  }, []);

  

  function updateProfileData() {
    if (changed) {
      try {
        let user_id = localStorage.getItem("user_id");
        axios
          .put("http://localhost:8080/myprofile", {
            ...userProfileData,
            user_id: user_id,
          })
          .then((data) => {
            console.log(data.data);
            toast.success('You\'ve  updated your info', {
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

          axios
          .put("http://localhost:8080/sellerprofile", {
            ...sellerProfileData,
            user_id: user_id,
          })
          .then((data) => {
            console.log('seller profile', data.data);
            navigate('/')
          });
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <div className="myprofile-container">
      <div className="myprofile-form-container">
        <div className="myprofile-title">
          <h1>My Profile</h1>
        </div>
        {/* {loading &&
                  <Loader/>
              } */}

        {
          /* {!loading && */ userProfileData && (
            <form action="" className="myprofile-form">
              <div className="sm-input-container">
                <div className="sm-input">
                  <label htmlFor="first_name">Name:</label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    value={userProfileData.firstname}
                    onChange={(e) => {
                      setUserProfileData({
                        ...userProfileData,
                        firstname: e.target.value,
                      });
                      setChanged(true);
                    }}
                  />
                </div>
                <div className="sm-input">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    value={userProfileData.lastname}
                    onChange={(e) => {
                      setUserProfileData({
                        ...userProfileData,
                        lastname: e.target.value,
                      });
                      setChanged(true);
                    }}
                  />
                </div>
              </div>

              <div className="lg-input">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  value={userProfileData.email}
                  onChange={(e) => {
                    setUserProfileData({
                      ...userProfileData,
                      email: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>

              <div className="lg-input">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={userProfileData.username}
                  onChange={(e) => {
                    setUserProfileData({
                      ...userProfileData,
                      username: e.target.value,
                    });
                    setChanged(true);
                  }}
                />
              </div>


              {localStorage.getItem("user_role") === "seller" && (
                <>
                  <div className="lg-input">
                    <label htmlFor="location">Location:</label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      value={sellerProfileData.location}
                      onChange={(e) => {
                        setSellerProfileData({
                          ...sellerProfileData,
                          location: e.target.value,
                        });
                        setChanged(true);
                      }}
                    />
                  </div>

                  <div className="lg-input">
                    <label htmlFor="website-url">Website-url:</label>
                    <input
                      type="text"
                      name="website-url"
                      id="website-url"
                      value={sellerProfileData.website}
                      onChange={(e) => {
                        setSellerProfileData({
                          ...sellerProfileData,
                          website: e.target.value,
                        });
                        setChanged(true);
                      }}
                    />
                  </div>

                  <div className="sm-input-container">
                    <div className="sm-input">
                      <label htmlFor="working-start">Work starts:</label>
                      <input
                        type="time"
                        name="working-start"
                        id="working-start"
                        value={sellerProfileData.working_start}
                        onChange={(e) => {
                          setSellerProfileData({
                            ...sellerProfileData,
                            working_start: e.target.value,
                          });
                          setChanged(true);
                        }}
                      />
                    </div>

                    <div className="sm-input">
                      <label htmlFor="working-ends">Work ends:</label>
                      <input
                        type="time"
                        name="working-ends"
                        id="working-ends"
                        value={sellerProfileData.working_end}
                        onChange={(e) => {
                          setSellerProfileData({
                            ...sellerProfileData,
                            working_end: e.target.value,
                          });
                          setChanged(true);
                        }}
                      />
                    </div>
                  </div>

                  <div className="lg-input">
                    <label htmlFor="shipping">Shipping:</label>
                    <select name="shipping" id="shipping">
                      <option 
                        name="shipping"
                        id="shipping"
                        value={sellerProfileData.shipping}
                        onClick={(e) => {
                          setSellerProfileData({
                            ...sellerProfileData,
                            shipping: e.target.value,
                          });
                          setChanged(true);
                        }}
                        >false</option>
                      <option 
                         value={sellerProfileData.shipping}
                         onClick={(e) => {
                           setSellerProfileData({
                             ...sellerProfileData,
                             shipping: e.target.value,
                           });
                           setChanged(true);
                         }}
                        name="shipping"
                        id="shipping"
                        >true</option>
                    </select>
                    {/* <input
          
                      value={sellerProfileData.shipping}
                      onChange={(e) => {
                        setSellerProfileData({
                          ...sellerProfileData,
                          shipping: e.target.value,
                        });
                        setChanged(true);
                      }}
                    /> */}
                  </div>
                </>
              )}

              <div className="btn-container">
                <div
                  className={changed ? "save" : " disabled"}
                  onClick={updateProfileData}
                >
                  Save
                </div>
              </div>
              
              {localStorage.getItem("user_role") === "seller"  &&
                <div className="btn-container">
                  <Link to={`/myproducts`}>My Listings</Link>
                </div>
              }
              
            </form>
          )
        }
      </div>
    </div>
  );
}

export default MyProfile;
