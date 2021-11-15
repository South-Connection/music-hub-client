
import React, { Component } from 'react';
import './App.css';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddPlaylist from './components/playlists/AddPlaylist';
// import Navbar from './components/navbar/Navbar';
import authService from './components/auth/auth-service';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Playlist from './components/playlists/Playlist';
import PlaylistDetails from './components/playlists/PlaylistDetails';
import EditPlaylist from './components/playlists/EditPlaylist';
import ProtectedRoute from './components/auth/ProtectedRoute';


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

          if(data){
          this.setState({
            user: data,
            isLoggedIn: true
          });
        } else {
          this.setState({
            user: null,
            isLoggedIn: false
          });

        }
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
        <Route
         exact
         path="/signup" component={Signup} />
        <Route
         exact
          path="/"
          render={props => <Login {...props} getUser={this.getTheUser} />} />
        <ProtectedRoute
          user={this.state.user}
          path="/playlists/create" 
          component={AddPlaylist}
           />
        <ProtectedRoute
          user={this.state.user}
          path="/playlists" 
          component={Playlist}
           />
        <ProtectedRoute
         path="/playlists/:id" 
         render={props => <PlaylistDetails {...props} 
         user={this.state.user} />} 

         />
        <ProtectedRoute 
        user={this.state.user}
        path="/playlists/:id/edit" 
        component={EditPlaylist} 
        />
        </Switch>
      </Router>
    </div>
  );
  }
}

export default App;
