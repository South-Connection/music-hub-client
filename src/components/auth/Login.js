import React, { Component } from "react";
import authService from "./auth-service";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "", errorMessage: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    authService
      .login(username, password)
      .then((response) => {
        //clear the form
        this.setState({
          username: "",
          password: "",
        });
        //calling the method through  prop that we are sending from mother comp
        this.props.getUser(response, true);
        this.props.history.push("/playlists"); // render to playlists
      })
      .catch((error) => {
        this.setState({
          errorMessage: "Your username or password is incorrect",
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
          <h1>Login</h1>
          {this.state.errorMessage && (
            <h3 className="error"> {this.state.errorMessage} </h3>
          )}
          <div className="container-column">
            <label>
              <input
                className="input"
                type="text"
                required
                placeholder="username"
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>

            <label>
              <input
                className="input"
                type="password"
                required
                placeholder="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>

            <button className="login" type="submit">
              Login
            </button>
          </div>
          <p className="bottom">
            Don't have account?
            <Link to={"/signup"}> Signup</Link>
          </p>
        </form>
      </>
    );
  }
}

export default Login;
