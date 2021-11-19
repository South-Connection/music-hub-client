import React, { Component } from "react";
import axios from "axios";

class AddSong extends Component {
  state = {
    songName: "",
    songLink: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const songName = this.state.songName;
    const songLink = this.state.songLink;

    const playlistNewData = JSON.parse(JSON.stringify(this.props.thePlaylist)); //deep copy
    playlistNewData.songs = [
      ...this.props.thePlaylist.songs,
      { title: songName, link: songLink },
    ]; //add new song at the end of previous list of songs

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/playlists/${this.props.thePlaylist._id}`,
        playlistNewData,
        { withCredentials: true }
      )
      .then(() => {
        this.setState({
          songName: "",
          songLink: "",
        });
        this.props.getPlaylist();
        this.props.history.push(`/playlists/${this.props.thePlaylist._id}`);
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSelect = (event) => {
    this.setState({
      guests: Array.from(event.target.selectedOptions, (item) => item.value),
    });
  };

  render() {
    return (
      <form onSubmit={(e) => this.handleFormSubmit(e)}>
        <div className="box">
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default AddSong;
