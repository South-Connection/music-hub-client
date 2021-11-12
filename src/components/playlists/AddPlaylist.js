import React, { Component } from "react";
import axios from "axios";

class AddPlaylist extends Component {
  state = {
    title: "",
    description: "",
    songs: [{}],
    // guests : ""
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const songs = this.state.songs;
    // const songsLink = this.state.songs.link;
    // const guests = this.state.guests;

    axios
      .post("http://localhost:5000/api/playlists", { title, description, songs })
      .then(() => {
        // this.props.getData();
        this.setState({ title: "", description: "", songs:[{}] });
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
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChange(e)}
          />
          <label>Song:</label>
          <textarea
            name="songs"
            value={this.state.songs}
            onChange={(e) => this.handleChange(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddPlaylist;
