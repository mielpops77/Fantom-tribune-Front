import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    // eslint-disable-next-line react/style-prop-object


    <nav className="navigation" style={{ backgroundImage: `url("http://localhost:3000/fond_bandeau.png")` }}>
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
          to="/admin"
          className={(nav) => (nav.isActive ? "nav-active" : "")}
        >
          <li>Admin</li>
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