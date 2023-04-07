import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_socials">
          <a href="wwww.facebook.com" className="footer_link">
            <FacebookIcon />
          </a>
          <a href="wwww.instagram.com" className="footer_link">
            <InstagramIcon />
          </a>
          <a href="wwww.twitter.com" className="footer_link">
            <TwitterIcon />
          </a>
          <a href="www.youtube.com" className="footer_link">
            <YouTubeIcon />
          </a>
        </div>
        <ul className="footer_links">
          <li className="footer_links">
            <a href="/">Bouton 1</a>
          </li>
          <li className="footer_links">
            <a href="/">Bouton 2</a>
          </li>
        </ul>
        <div className="footer_rights">
          Origins Digital - Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

export default Footer;
