import React from "react";
import "../css/Footer.scss";
function Footer() {
  return (
      <footer>
        <div className="footer-title">
          <h3>G-Store</h3>
          <p>We are here to help you find products of your choice</p>
        </div>
        <div className="social-media">
          <h3>Social Media</h3>
          <ul className="social-media-list">
            <li>
              <a href="https://www.facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com">Instagram</a>
            </li>
            <li>
              <a href="https://www.tiktok.com">TikTok</a>
            </li>
          </ul>
        </div>
        <div className="about">
          <h3>About Us</h3>
          <ul className="about-us">
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <p className="copyright">COPYRIGHT © 2023 - 2025 ALL RIGHTS RESERVED</p>
      </footer>
  );
}

export default Footer;
