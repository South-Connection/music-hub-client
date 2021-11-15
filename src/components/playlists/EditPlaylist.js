import React, { Component } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
 
class EditPlaylist extends Component {
  state = {
    title: this.title, 
    description: this.description
  }
  
  handleFormSubmit = (event) => {
    const title = this.state.title;
    const description = this.state.description;
 
    event.preventDefault();
 
    axios.put(`http://localhost:5000/api/playlists/${this._id}`, { title, description }, { withCredentials: true })
    .then( () => {
      // Use the passed down api call to render the updated project data
        this.getThePlaylist();   
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
  renderEditForm = () => {
    if(this.state.title){
      return <EditPlaylist thePlaylist={this.state} getThePlaylist={this.getSinglePlaylist} />
    } 
} 


 
    render(){
    return (
      <div>
      <Navbar />
        <hr />
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChangeDesc(e)} />
          
          <input type="submit" value="Submit" />
        </form>
        <div>{this.renderEditForm()} </div>
        <Link to={'/playlists'}>Back to playlists</Link>
    
      </div>
    )
  }
}
 
export default EditPlaylist;