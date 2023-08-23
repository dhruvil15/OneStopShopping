import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShop, faCartShopping, faSignOut } from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

const Navbar = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname ? "active" : "";
  };

  return (
    <div className="navbar">
      <div className="navbar-title">
        <h1>OneStopShopping</h1>
      </div>
      <div className="links">
        <Link to="/" className={isActive("/")}>
          <FontAwesomeIcon icon={faShop} />
        </Link>
        <Link to="/Checkout" className={isActive("/Checkout")}>
          <FontAwesomeIcon icon={faCartShopping} />
        </Link>
        <Link onClick={onLogout} to="/">
          <FontAwesomeIcon icon={faSignOut} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
