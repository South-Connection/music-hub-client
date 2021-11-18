import React, { Component } from "react";
import axios from "axios";
// import Playlist from "./Playlist";
// import Navbar from "../navbar/Navbar";

class AddPlaylist extends Component {
  state = {
    title: "",
    description: "",
    songName: "",
    songLink: "",
    guests: [],
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const songName = this.state.songName;
    const songLink = this.state.songLink;
    const guests = this.state.guests;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/playlists`,
        {
          title,
          description,
          songName,
          songLink,
          guests,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({
          title: "",
          description: "",
          guests: [],
          songName: "",
          songLink: "",
        });
        this.props.history.push("/playlists");
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSelect = (event) => {   
    this.setState({guests: Array.from(event.target.selectedOptions, (item) => item.value)})    
  };

  render() {
    return (
      <div className="box">
        
        <form onSubmit={this.handleFormSubmit}>
          <label>Playlist name</label>
          <br />
          <input
            //key={this.state._id}
            placeholder="Playlist title"
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
            name="songName"
            value={this.state.songName}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <input
            placeholder="song link"
            type="url"
            name="songLink"
            value={this.state.songLink}
            onChange={(e) => this.handleChange(e)}
          />
          <br />
          <label>Add guests</label>
          <br />
          <select multiple onChange={(e) => this.handleSelect(e)}>
            {this.props.allUsers.map((guest) => {
              return (
                <option type="text" name="guest" value={guest._id}>
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
