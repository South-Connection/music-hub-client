import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from './../auth/auth-service';

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
          <div className="logo">
            <img src="/music-hub-logo.png" alt="music-hub"></img>
          </div>
          <div> {userIsLoggedIn && <li>Welcome, {userData.username}</li>}</div>
          <nav className="links">
            <ul>
              <li className="nav-button">
                <Link to="/playlists" style={{ textDecoration: "none" }}>
                Playlists
                </Link>
              </li>
              <li className="nav-button">
                <Link to="/">
                <button onClick={() => this.logoutUser()}>Logout</button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );  
    } else {
      return (
        
        <div className="nav-style">
          <div className="logo">
            <img src="/music-hub-logo.png" alt="music-hub"></img>
          </div>
          <nav className="links">
            <ul>
              <li className="nav-button">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </li>
              <li className="nav-button">
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  Signup
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  }
}
export default Navbar;
