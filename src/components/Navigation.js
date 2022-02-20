import React from "react";
import { NavLink } from "react-router-dom";
import background from "./img/fond_bandeau.png";

const Navigation = () => {
  return (
    // eslint-disable-next-line react/style-prop-object


    <nav className="navigation" style={{ backgroundImage: `url(${background})` }}>
      <ul>
        <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
          <li>HOME</li>
        </NavLink>
        <NavLink
          to="/launchDate"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>LAUNCH DATE</li>
        </NavLink>
        <NavLink
          to="/submit"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>SUBMIT PROJECT</li>
        </NavLink>
        <NavLink
          to="/register"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>NEWS</li>
        </NavLink>
        <NavLink
          to="/login"
        >
          <button style={{ background: "#52FDFD", borderRadius: "10px", width: "100px" }}>
            Login
          </button>
        </NavLink>
      </ul>
    </nav>


  );
};

export default Navigation;