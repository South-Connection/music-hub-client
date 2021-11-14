
import React, { Component } from 'react';
import './App.css';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddPlaylist from './components/playlists/AddPlaylist';
// import Navbar from './components/navbar/Navbar';
import authService from './components/auth/auth-service';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Playlist from './components/playlists/Playlist';


class App extends Component{
//adding state in order to keep track of user
  state = {
    isLoggedIn: false,
    user: null
  };
 
  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn
    });
  };
  
  //function to let user still be logged in, even is reload page
  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then(data => {
          this.setState({
            user: data,
            isLoggedIn: true
          });
        })
        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render(){
  return (
    <div className="App">
    <Router>
    {/* <Navbar/> */}
    <Switch>
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
    <Route exact path="/playlists/create" component={AddPlaylist} />
    <Route exact path="/playlists" component={Playlist} />
    </Switch>
    </Router>
    </div>
  );
  }
}

export default App;
