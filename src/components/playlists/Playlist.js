// components/projects/ProjectList.js

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Playlist extends Component {
  state = { listOfPlaylists: [] };

  getAllPlaylists = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/playlists`, {
        withCredentials: true,
      })
      .then((responseFromApi) => {
        this.setState({
          listOfPlaylists: responseFromApi.data,
        });
      });
  };

  componentDidMount() {
    this.getAllPlaylists();
  }

  render() {
    return (
      <div className="box-container">
        <h1>My playlists</h1>
        
        <div className="container">
          {this.state.listOfPlaylists.map((playlist) => {
            return (
              <div className="list" key={playlist._id}>
                <Link to={`/playlists/${playlist._id}`}>
                  <h3>{playlist.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="main-btn">
          <Link className="main-btn-text" to="/playlists/create">
            New Playlist
          </Link>
        </div>
      </div>
    );
  }
}

export default Playlist;
