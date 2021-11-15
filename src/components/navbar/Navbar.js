import React from "react";
import { Link } from "react-router-dom";

const navbar = () => {
  return (
    <div className="nav-style">
      <div className="logo">
          <img src="/music-hub-logo.png" alt="music-hub"></img>
      </div>
      <nav className="links">
        <ul>
          <li className="nav-button">
            <Link to="/playlists" style={{ textDecoration: "none" }}>
              Playlists
            </Link>
          </li>
          <li className="nav-button">
            <Link  to="/logout" style={{ textDecoration: "none" }}>
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default navbar;
