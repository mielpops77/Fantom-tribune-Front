import React from "react";
import { NavLink } from "react-router-dom";
import background from "./img/fond_bandeau.png";

const Navigation = () => {
  return (
    // eslint-disable-next-line react/style-prop-object
    

      <nav className="navigation" style={{backgroundImage: `url(${background})`}}>
        <ul>
          <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
            <li>HOME</li>
          </NavLink>
          <NavLink
            to="/about"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>LAUNCH DATE</li>
          </NavLink>
          <NavLink
            to="/contact"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>SUBMIT PROJECT</li>
          </NavLink>
          <NavLink
            to="/connexion"
            className={(nav) => (nav.isActive ? "nav-active" : "")}
          >
            <li>NEWS</li>
          </NavLink>
        </ul>
      </nav>


  );
};

export default Navigation;