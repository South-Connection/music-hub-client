import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

class PlaylistDetails extends Component {
  state = {}


  componentDidMount(){
    this.getSinglePlaylist();
}

  getSinglePlaylist = () => {
    const { params } = this.props.match;
    axios.get(`http://localhost:5000/api/playlists/${params.id}`)
    .then( responseFromApi =>{
        const thePlaylist = responseFromApi.data;
        this.setState(thePlaylist);
    })
    .catch((err)=>{
        console.log(err)
    })
}

    render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <Link to={'/playlists'}>Back to playlists</Link>
      </div>
    )
  }
}

export default PlaylistDetails;
