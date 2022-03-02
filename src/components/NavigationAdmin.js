import React from "react";
import { NavLink } from "react-router-dom";
import background from "./img/fond_bandeau.png";

const NavigationAdmin = () => {
  return (
    // eslint-disable-next-line react/style-prop-object


    <nav className="navigation" style={{ backgroundImage: `url(${background})` }}>
      <ul>
      
        <NavLink
          to="/Admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>ADMINISTRATION</li>
        </NavLink>
        <NavLink
          to="/Admin/EditionNews"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>NEWS EDITION</li>
        </NavLink>

        <NavLink
          to="/Admin/Tutorial"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>TUTORIAL</li>
        </NavLink>
        
        
        <NavLink
          to="/Admin/Promotion"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>PROMOTION</li>
        </NavLink>

        <NavLink
          to="/Admin/Statistique"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>STATISTIQUE</li>
        </NavLink>
      </ul>
    </nav>


  );
};

export default NavigationAdmin;