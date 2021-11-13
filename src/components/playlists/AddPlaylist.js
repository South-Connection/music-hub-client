import React, { Component } from "react";
import axios from "axios";

class AddPlaylist extends Component {
  state = {
    title: "",
    description: "",
    songs: []
    
  };


  handleFormSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const songTitle = this.state.songs[0].title;
    // const songLink = this.state.songs[0].link
    

    // console.log(songsTitle)
    // const songsLink = this.state.songs.link;
    // const guests = this.state.guests;

    axios
      .post("http://localhost:5000/api/playlists", { title, description, songTitle})
      .then(() => {
        // this.props.getData();
        this.setState({ title: "", description: "" , songTitle: ""});
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Add a cool title for your playlist:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
          />
          <label>what's the occasion?</label>
          <textarea
            type="text"
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
          />
           {/* <label>add song name:</label>
           <textarea
            type="text"
            name="songTitle"
            value={this.state.songs[0].title}
            onChange={(e) => this.handleChange(e)} */}
          {/* /> */}
          <label>and link:</label>
          {/* <textarea
            type="text"
            name="songs.link"
            value={this.state.songLink}
            onChange={(e) => this.handleChange(e)}
          /> */}
          <label>add guests:</label>
          <select name="guests" id="guests" multiple>
          value={this.state.guests}
            onChange={(e) => this.handleChange(e)}
          </select>
          
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddPlaylist;
