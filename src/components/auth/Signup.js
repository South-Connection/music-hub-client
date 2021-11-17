import React, { Component } from 'react';
import authService from "./auth-service";
import { Link } from 'react-router-dom';

class Signup extends Component {
 
  state = { username: '', password: '', errorMessage: '' }
 
  handleFormSubmit = (event) => {
    event.preventDefault();
    const {username, password} = this.state;
   
    authService
    .signup(username, password)
    .then(response => {
        this.setState({
            username: "",
            password: "",
        });
        this.props.history.push("/playlists");
        this.props.getUser(response, true);
    })
    .catch(error => {
        console.log(error);
        this.setState({
        name: "",
        password: "",
        errorMessage: "Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter. Username must be unique."//error.response.data.errorMessage,
      });
    });
  }
   
  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  }
   
   
  render(){
    return(
      <>
        <form onSubmit={this.handleFormSubmit}>
        <h2>Signup</h2>
        {this.state.errorMessage && <h3 className="error"> {this.state.errorMessage} </h3>}

          <label>
          Username:
            <input
              type="text"
              required
              name="username"
              placeholder="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
   
          <label>
          Password:
            <input
              type="password"
              required
              name="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
   
          <button type="submit"> Signup </button>
        </form>
   
        <p>
          Already have an account?
          <Link to={"/"}> Login</Link>
        </p>
   
      </>
    )
  }
}
 
export default Signup;