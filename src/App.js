
import React, { Component } from 'react';
import './App.css';
import {  BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AddPlaylist from './components/playlists/AddPlaylist';
// import Navbar from './components/navbar/Navbar';
// import authService from './components/auth/auth-service';
import Signup from './components/auth/Signup';


class App extends Component{
  render(){
  return (
    <div className="App">
    <Router>
    {/* <Navbar/> */}
    <Switch>
      <Route exact path="/signup" component={Signup} /> 
      <Route exact path="/playlists/create" component={AddPlaylist} />
    </Switch>
    </Router>
    </div>
  );
  }
}

export default App;
