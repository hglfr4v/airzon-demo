import React from 'react';
import { FaLinkedin } from 'react-icons/fa';
import '../airzon.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        <div>
          <strong>AirGlobal Corporate Website</strong>
          <p>Contact us</p>
          <p>Scam warning</p>
          <p>Privacy policy</p>
          <p>Terms of use</p>
          <p>Cookies</p>
        </div>
        <div>
          <strong>Airzon General Settings</strong>
          <p>Language preference</p>
          <p>FAQ</p>
          <p>Access to web trainings</p>
        </div>
        <div>
          <strong>Anchor Partner Website</strong>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="store-badges">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" />
          <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
        </div>
      <div className="linkedin">
  Follow us on
  <a href="https://www.linkedin.com/company/airglobal" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    <FaLinkedin size={36} />
  </a>
</div>
         <div className="footer-rights">AirGlobal all rights reserved</div>
       
      </div>
      
    </footer>
  );
};

export default Footer;