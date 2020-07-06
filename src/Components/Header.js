import React from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <header className="header-container">
      <h1>
        Web <span>Chat</span>
      </h1>

      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>

          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="signup">Sign Up</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
