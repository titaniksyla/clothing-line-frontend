import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

import { footerLinksData , socialMediaData } from "./footerData";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-top">
        <div className="footer-left">
          <div className="footer-left-top">
            <div className="footer-logo">
              <Link to="/"><h1>Clothing Line</h1></Link>
            </div>
            <p>Buy and Sell Quality Clothes For The Best Prices.</p>
          </div>
          <div className="footer-left-bottom">
            <p>Download App</p>
            <div className="footer-download">
              <Link to="/">
                <div className="app-store"></div>
              </Link>
              <Link to="/">
                <div className="google-store"></div>
              </Link>
            </div>
          </div>
        </div>
        <div className="footer-right">
          {footerLinksData.map((link) => {
            return(
              <div className="footer-links-container" key={link.id}>
                <h3 className="footer-links-title">{link.title}</h3>
                <div className="footer-link-container">
                  <p>{link.link1}</p>
                  <p>{link.link2}</p>
                  <p>{link.link3}</p>
                  <p>{link.link4}</p>
                </div>
              </div>
            )
          } )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2022 Clothing Line. All rights reserved</p>
        <div className="social-media-container">
          {socialMediaData.map((image) => {
            return(
              <div className="img-container" key={image.id}>
                <img src={image.img} alt={image.alt} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default Footer;
