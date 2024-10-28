import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <div className="navBar">

      <div className="left-section">
        <div className="logo">
          <img src="https://via.placeholder.com/80" alt="Logo" />
          Casino Roulette
        </div>
        <div className="nav-links">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/balance">Środki</NavLink></li>
        </div>
      </div>


      <div className="right-section">
        <div className="user-info">
          <span className="user-balance"><FontAwesomeIcon icon={faWallet} className="wallet-icon" /> 200$</span>
          <span className="user-name">nazwa</span>
        </div>
        <NavLink to="/profile">
        <div className="avatar">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navigation;
