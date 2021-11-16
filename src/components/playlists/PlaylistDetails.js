import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Playlist from './Playlist';
import Navbar from '../navbar/Navbar';

class PlaylistDetails extends Component {
  state = {}


    componentDidMount(){
    this.getSinglePlaylist();
    }

    getSinglePlaylist = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/playlists/${params.id}`, { withCredentials: true })
    .then( responseFromApi =>{
        const thePlaylist = responseFromApi.data;
        this.setState(thePlaylist);
    })
    .catch((err)=>{
        console.log(err)
    })
    }
    // DELETE PROJECT:
    deleteProject = () => {
        const { params } = this.props.match;
        console.log('hello clg', params)
        axios.delete(`${process.env.REACT_APP_API_URL}/playlists/${params.id}`)
        .then( () =>{
            this.props.history.push('/playlists');      
        })
        .catch((err)=>{
            console.log(err)
        })

        //is throwing error: ownershipCheck is undefined//

        // ownershipCheck = (playlist) => {
        //   const currentUserIsOwner =
        //     this.props.user && (playlist.owner === this.props.user._id);
       
        //   if (currentUserIsOwner) {
        //     return (
        //       <div>
        //         <button onClick={() => this.deletePlaylist(this.state._id)}>
        //           Delete project
        //         </button>
        //       </div>
        //     );
        //   }
        // };
    }

    render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div> {this.ownershipCheck(this.state)} </div> 
        <Link to={`/playlists/${this.state._id}/edit`}>Edit playlist</Link>
        <br/>
        {/* { this.state.songs.map( song => {
            return (
              <ol key={song._id}>                
                  <li>{song.title}</li>
                  <button>delete</button>
              </ol>
            )})
          } // Work in progress*/} 
        <button type="button">Add Song</button>

        <br/>
        <button onClick={() => this.deleteProject()}>Delete playlist</button>
        <br/>
        
        <Link to={'/playlists'}>Back to playlists</Link>
      </div>
    )
  }
}

export default PlaylistDetails;
