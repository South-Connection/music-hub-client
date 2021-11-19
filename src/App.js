import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import AddPlaylist from "./components/playlists/AddPlaylist";
import Navbar from "./components/navbar/Navbar";
import authService from "./components/auth/auth-service";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Playlist from "./components/playlists/Playlist";
import PlaylistDetails from "./components/playlists/PlaylistDetails";
import EditPlaylist from "./components/playlists/EditPlaylist";
import ProtectedRoute from "./components/auth/ProtectedRoute";


class App extends Component {
  //adding state in order to keep track of user
  state = {
    isLoggedIn: false,
    user: null,
    usersFromDb: [],
  };

  getAllUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then((responseFromApi) => {
        this.setState({
          usersFromDb: responseFromApi.data,
        });
      });
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  //function to let user still be logged in, even is reload page
  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((data) => {
          if (data) {
            this.setState({
              user: data,
              isLoggedIn: true,
            });
          } else {
            this.setState({
              user: null,
              isLoggedIn: false,
            });
          }
        })
        .catch((err) => {
          this.setState({
            user: null,
            isLoggedIn: false,
          });
        });
    }
    this.getAllUsers();
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App" style={{ 
        backgroundImage: `url("/imgs/background-pysche.jpg")`
      }}>
        <Router>
          <Navbar
            userData={this.state.user}
            userIsLoggedIn={this.state.isLoggedIn}
            getUser={this.getTheUser}
          />

          <Switch>
            <Route
              exact
              path="/signup"
              render={(props) => (
                <Signup {...props} getUser={this.getTheUser} />
              )}
            />
            <Route
              exact
              path="/"
              render={(props) => <Login {...props} getUser={this.getTheUser} />}
            />
            <Route
              exact
              path="/playlists/create"
              render={(props) => (
                <AddPlaylist {...props} allUsers={this.state.usersFromDb} />
              )}
            />
            <Route
              exact
              path="/playlists"
              render={(props) => (
                <Playlist {...props} getUser={this.getTheUser} />
              )}
            />
            {/* <Route exact path="/playlists" component={Playlist} /> */}

            <Route exact path="/playlists/:id" component={PlaylistDetails} />

            <Route exact path="/playlists/:id/edit" component={EditPlaylist} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
