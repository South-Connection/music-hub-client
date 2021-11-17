import React, { Component } from "react";
import axios from "axios";
// import Playlist from "./Playlist";
// import Navbar from "../navbar/Navbar";

class AddPlaylist extends Component {
  state = {
    title: "",
    description: "",
    guests: ["", ...this.props.allUsers],
    songs: [],
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const guests = this.state.guests;
    const songs = this.state.songs;

    axios
      .post("http://localhost:5000/api/playlists", {
        title,
        description,
        guests,
        songs,
      }, {withCredentials: true })
      .then(() => {
        this.setState({ title: "", description: "", guests: [], songs: [] }); 
        this.props.history.push("/playlists");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSongs = (event) => {
    const { name, value } = event.target;
    
    console.log("bonjour")
    this.setState(prevState => ({
      songs: {
        ...prevState.songs,        
        [name]: value,
      }
    }))
  };

  render() {
    // console.log("hello", this.state.songs);
    // console.log("hello 2", this.state.songs.title)
    
    return (
      <div className="box">
        {/* <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} /> */}
        <form onSubmit={this.handleFormSubmit}>
          <label>Playlist name</label>
          <br />
          <input
            //key={this.state._id}
            placeholder="Name"
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <label></label>
          <textarea
            placeholder="Description"
            type="text"
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <label>Add song:</label>
          <br />
          <input
            placeholder="song name"
            type="text"
            name="title"
            value={this.state.songs.title}
            onChange={(e) => this.handleSongs(e)}
          />
          <br />
          <input
            placeholder="song link"
            type="url"
            name="link"
            value={this.state.songs.link}
            onChange={(e) => this.handleSongs(e)}
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
                  // id="guest._id"
                  multiple
                  value={guest._id}
                  onChange={(e) => this.handleChange(e)}
                >
                  {guest.username}
                </option>
              );
            })}
          </select>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddPlaylist;
