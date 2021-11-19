import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddSong from "./AddSong";

class PlaylistDetails extends Component {
  state = {
    songs: [],
    showComponent: false
  };

  componentDidMount() {
    this.getSinglePlaylist();
    this.pushNewSong();
  }

  getSinglePlaylist = () => {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_API_URL}/playlists/${params.id}`, { withCredentials: true })
      .then((responseFromApi) => {
        const thePlaylist = responseFromApi.data;
        this.setState(thePlaylist);
      })
      .catch(
        (err) => {
          console.log(err);
        },
      );
  };

  renderForm = () => {
    console.log("addsong")
    this.setState({
      showComponent: true,
    });
  }

  hideForm = () => {
    this.setState({
      showComponent: false,
    });
  }

  pushNewSong = () => {
    this.setState(previousState => ({
      songs: [...previousState.songs, 'new value']
  }));
  }

  // DELETE PROJECT:
  deletePlaylist = () => {
    const { params } = this.props.match;
    console.log("hello clg", params);
    axios
      .delete(`${process.env.REACT_APP_API_URL}/playlists/${params.id}`)
      .then(() => {
        this.props.history.push("/playlists");
      })
      .catch(
        (err) => {
          console.log(err);
        },
        { withCredentials: true }
      );
  };

  render() {
    
    return (
      <div className="box-container">
        {this.state.songs === undefined ? (
          <p>Loading...</p>
        ) : (
          <div >
            <h1>{this.state.title}</h1>
            <p className="p-desc">{this.state.description}</p>

            <br />

            <div >
              {this.state.songs.map((elm) => {
                return (
                  <div className="test" key={elm._id}>
                    <Link to={{ pathname: `${elm.link}` }} target="_blank" >{elm.title}</Link>
                  </div>
                );
              })}
            </div>
          </div>
          
        )}
        
        {this.state.showComponent ? <AddSong getPlaylist={this.getSinglePlaylist} thePlaylist={this.state} {...this.props}/> : null}

        <div>
        <button className="second-btn" onClick={() => this.renderForm()}type="button">Add Song</button>
        

        
        <button className="second-btn" onClick={() => this.deletePlaylist()}>Delete</button>
        </div>


        <Link to={"/playlists"}>Back to playlists</Link>
        <br />
      </div>
    );
  }
}

export default PlaylistDetails;
