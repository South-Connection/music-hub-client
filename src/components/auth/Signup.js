import React, { Component } from "react";
import authService from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = { username: "", password: "", errorMessage: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    authService
      .signup(username, password)
      .then((response) => {
        this.setState({
          username: "",
          password: "",
        });
        this.props.getUser(response, true);
        this.props.history.push("/playlists");
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          name: "",
          password: "",
          errorMessage:
            "Password needs to have at least 6 characters and must contain at least one number, one lowercase and one uppercase letter. Username must be unique.", //error.response.data.errorMessage,
        });
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <>
        <form className="box-container" onSubmit={this.handleFormSubmit}>
          <h1>Signup</h1>
          {this.state.errorMessage && (
            <h3 className="error"> {this.state.errorMessage} </h3>
          )}
          <div className="container-column">
            <label>
              <input
                className="input"
                type="text"
                required
                name="username"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>

            <label>
              <input
                className="input"
                type="password"
                required
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>

            <button className="login" type="submit">
              {" "}
              Signup{" "}
            </button>
          </div>
          <p className="bottom">
            Already have an account?
            <Link to={"/"}> Login</Link>
          </p>
        </form>
      </>
    );
  }
}

export default Signup;
