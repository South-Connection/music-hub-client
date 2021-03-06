import React, { Component } from "react";
import { Link } from "react-router-dom";
import authService from "../auth/auth-service";

class Navbar extends Component {
  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };

  render() {
    const { userIsLoggedIn, userData } = this.props;

    if (userIsLoggedIn) {
      return (
        <div className="nav-style">
          <div >
            <Link className="logo" to="/playlists">
              <img src="/music-hub-logo.png" alt="music-hub"></img>
            </Link>
          </div>
          {/* <div> {userIsLoggedIn && <li>Welcome, {userData.username}</li>}</div> */}
          <nav className="links">
            <ul>
              <li className="nav-button">
                <Link
                  className="hover"
                  to="/playlists"
                  style={{ textDecoration: "none" }}
                >
                  Playlists
                </Link>
              </li>
              <li className="nav-button">
                <Link
                  className="hover"
                  to="/playlists/create"
                  style={{ textDecoration: "none" }}
                >
                  Create
                </Link>
              </li>
              <li className="nav-button">
                <Link to="/">
                  <button className="logout" onClick={() => this.logoutUser()}>
                    Logout
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    } else if (userData == null && userData == undefined) {
      return (
        <div className="nav-style">
          <div className="logo">
            <img src="/music-hub-logo.png" alt="music-hub"></img>
          </div>
          <nav className="links">
            <ul>
              <li className="nav-button">
                <Link
                  className="hover"
                  to="/about"
                  style={{ textDecoration: "none" }}
                >
                  About
                </Link>
              </li>
              {/* <li className="nav-button">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  Signup
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      );
    }
  }
}
export default Navbar;
