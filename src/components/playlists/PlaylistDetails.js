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
    axios.get(`${process.env.REACT_APP_API_URL}/playlists/${params.id}`)
    .then( responseFromApi =>{
        const thePlaylist = responseFromApi.data;
        this.setState(thePlaylist);
    })
    .catch((err)=>{
        console.log(err)
    }, {withCredentials: true })
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
        }, {withCredentials: true })
    }

  //   renderEditForm = () => {
  //     if(this.state.title){
  //       return <EditPlaylist thePlaylist={this.state} getThePlaylist={this.getSinglePlaylist} />
  //     } 
  // } 

    render(){
    return(
      <div>
      {/* <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} /> */}
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
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
        <br/>
        
      </div>
    )
  }
}

export default PlaylistDetails;
