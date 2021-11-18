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
        // console.log("hello response", responseFromApi);
        // console.log(typeof responseFromApi.data);
        // console.log("hello owner", responseFromApi.data[0].owner);
      });
  };

  //get playlist I own or guest
  // getAllowedPlaylists = () => {
  //   axios.get(`${process.env.REACT_APP_API_URL}/playlists`, {withCredentials: true })
  //   .then(responseFromApi => {
  //     responseFromApi.data.owner

  //   }

  // }

  componentDidMount() {
    this.getAllPlaylists();
  }

  render() {
    return (
      <div>
        <div>
          {this.state.listOfPlaylists.map((playlist) => {
            return (
              <div key={playlist._id}>
                <Link to={`/playlists/${playlist._id}`}>
                  <h3>{playlist.title}</h3>
                </Link>
              </div>
            );
          })}
        </div>
        <Link to="/playlists/create" className="btn-create">
          Create your playlist
        </Link>
      </div>
    );
  }
}

export default Playlist;
