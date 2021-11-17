// components/projects/ProjectList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Playlist extends Component {
  state = { listOfPlaylists: [] }

  getAllPlaylists = () =>{
    axios.get(`http://localhost:5000/api/playlists`, {withCredentials: true })
    .then(responseFromApi => {
      this.setState({
        listOfPlaylists: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllPlaylists();
  }

  render(){
    return(
      <div>
        {/* <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} /> */}
        <div>
          { this.state.listOfPlaylists.map( playlist => {
            return (
              <div key={playlist._id}>
                <Link to={`/playlists/${playlist._id}`}>
                  <h3>{playlist.title}</h3>
                </Link>

              </div>
            )})
          }
        </div>
        <Link to="/playlists/create" className="btn-create">Create your playlist</Link>
      </div>
    )
  }
}

export default Playlist;
