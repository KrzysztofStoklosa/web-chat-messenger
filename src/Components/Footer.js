import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <h2>
        {"Copyright © "}

        {"Krzysztof Stoklosa "}

        {new Date().getFullYear()}
        {"."}
      </h2>
    </div>
  );
};

export default Footer;
