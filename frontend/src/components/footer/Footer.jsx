import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../../styles/index.css";
import logo from "../../assets/imagedemo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footer_brand_logo">
          <img src={logo} alt="logo" className="footer_logo" />
        </div>

        <div className="footer_brand_text">
          <ul className="footer_list">
            <li>Mentions légales |</li>
            <li>Cookies |</li>
            <li>CGU |</li>
            <li>Politique de confidentialité</li>
          </ul>
        </div>

        <div className="footer_socials">
          <a href="www.facebook.com" className="footer_link">
            <FacebookIcon />
          </a>
          <a href="www.instagram.com" className="footer_link">
            <InstagramIcon />
          </a>
          <a href="www.twitter.com" className="footer_link">
            <TwitterIcon />
          </a>
          <a href="www.youtube.com" className="footer_link">
            <YouTubeIcon />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
