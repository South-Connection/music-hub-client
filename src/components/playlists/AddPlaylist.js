import React, { Component } from "react";
import axios from "axios";
import Playlist from "./Playlist";
import Navbar from "../navbar/Navbar";

class AddPlaylist extends Component {
  state = {
    title: "",
    description: "",
    guests: ["maria", "bob"]
    
    // songs: []

  };

  


  handleFormSubmit = (event) => {
    event.preventDefault();

    const title = this.state.title;
    const description = this.state.description;
    const guests = this.state.guests;
    // const songTitle = this.state.songs[0].title;
    // const songLink = this.state.songs[0].link


    // console.log(songsTitle)
    // const songsLink = this.state.songs.link;
    // const guests = this.state.guests;

    axios
      .post("http://localhost:5000/api/playlists", { title, description, guests }, { withCredentials: true })
      .then(() => {
        this.props.getData();
        this.setState({ title: "", description: "", guests: [] });
        this.props.history.push("/playlists/");

      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };


  // componentDidMount() {
  //   fetch('http://localhost:5000/api/music-hub-server.users')
  //     .then(response => response.json())
  //     .then(response => {
  //       this.setState({ guests: response })
  //     })
  //     .catch(err => console.log(err))
  // }





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
          <label>add your guests</label>
          <select>
            {this.state.guests.map(guest => {
              console.log("option",  guest)
              return (
                <option type="text"
                  name="guest"
                  // id="guest._id"
                  multiple
                  // value={this.state.guest._id}
                  onChange={(e) => this.handleChange(e)}>{guest}
                </option>
              )
              
            })} 
          </select>


          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddPlaylist;
