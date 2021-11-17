import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

 
class EditPlaylist extends Component {
  state = {
    title: "",
    description: "",
    // guests: [],
    // songs: [],
  };
  
  handleFormSubmit = (event) => {
    const title = this.state.title;
    const description = this.state.description;
    // const guests = this.state.guests;
    // const songs = this.state.songs;
 
    event.preventDefault();
 
    axios.put(`${process.env.REACT_APP_API_URL}/playlists/${this._id}`,{
      title,
      description,
      // guests,
      // songs,
    }, {withCredentials: true })
    .then( () => {
      // Use the passed down api call to render the updated project data
        this.props.getThePlaylist();   
    })
    .catch( error => console.log(error) )
  }
 
  handleChangeTitle = (event) => {  
    this.setState({
      title:event.target.value
    })
  }
 
  handleChangeDesc = (event) => {  
    this.setState({
      description:event.target.value
    })
  }

  // handleChangeSongTitle = (event) => {  
  //   this.setState({
  //     songs:event.target.value
  //   })
  // }
  // handleChangeSongLink = (event) => {  
  //   this.setState({
  //     songs:event.target.value
  //   })
  // }

  // handleChangeSongGuest = (event) => {  
  //   this.setState({
  //     guests:event.target.value
  //   })
  // }


  renderEditForm = () => {
    if(this.state.title){
      return <EditPlaylist thePlaylist={this.state} getThePlaylist={this.getSinglePlaylist} />
    } 
} 


 
    render(){
      console.log("props", this.props)
      console.log("state", this.state)
    return (
      
      <div>
      
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <br />          
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          <br />
          <label>Description:</label>
          <br />
          <textarea type="text" name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          {/* <br />
          <label>Add song:</label>
          <br />
          <input
            placeholder="song name"
            type="text"
            name="title"
            value={this.state.songs.title}
            onChange={(e) => this.handleChangeSongTitle(e)}
          />
          <br />
          <input
            placeholder="song link"
            type="url"
            name="link"
            value={this.state.songs.link}
            onChange={(e) => this.handleChangeSongTitle(e)}
          />
          <br />
          <label>Add guests</label>
          <br />
          <select>
            {this.state.guests.map((guest) => {
              return (
                <option
                  type="text"
                  name="guest"
                  multiple
                  value={guest._id}
                  onChange={(e) => this.handleChangeGuest(e)}
                >
                  {guest.username}
                </option>
              );
            })}
          </select> */}
          <br />
          
          <input type="submit" value="Submit" />
        </form>
        
        <Link to={'/playlists'}>Back to playlists</Link>
    
      </div>
    )
  }
}
 
export default EditPlaylist;