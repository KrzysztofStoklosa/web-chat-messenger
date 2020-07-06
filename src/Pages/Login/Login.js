import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Services/firebase";

import LoginString from "../Login/LoginStrings";
import "./Login.css";
import { Card } from "react-bootstrap";

import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

class Login extends Component {
  state = {
    password: "",
    email: "",
    err: "",
  };
  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    await firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async (result) => {
        let user = result.user;
        if (user) {
          await firebase
            .firestore()
            .collection("users")
            .where("id", "==", user.uid)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                const currentdata = doc.data();
                localStorage.setItem(LoginString.FirebaseDocumentId, doc.id);
                localStorage.setItem(LoginString.ID, currentdata.id);
                localStorage.setItem(LoginString.Name, currentdata.name);
                localStorage.setItem(LoginString.Email, currentdata.email);
                localStorage.setItem(
                  LoginString.Password,
                  currentdata.password
                );
                localStorage.setItem(LoginString.PhotoURL, currentdata.URL);
                localStorage.setItem(
                  LoginString.Description,
                  currentdata.description
                );
              });
            });
        }
        this.props.history.push("/chat");
      })
      .catch(function (error) {
        document.getElementById("1").innerHTML =
          "incorrect email/password or poor internet";
      });
  };
  render() {
    return (
      <Grid component="main" className="login-grid-root">
        <CssBaseline />
        <Grid item xs={1} sm={4} md={7} className="image">
          <div className="image1"></div>
        </Grid>
        <Grid item xs={12} sm={8} md={5} className="login-right-grid">
          <Card className="login-card">
            <div>
              <Avatar className="login-avatar">
                <LockOutlinedIcon width="50px" height="50px" />
              </Avatar>
            </div>
            <div>
              <Typography component="h1" variant="h5">
                Sign in to
              </Typography>
            </div>
            <div>
              <Link to="/">
                <button className="btn">
                  <i className="fa fa-home"></i>
                  WebChat
                </button>
              </Link>
            </div>
          </Card>
          <div className="login-form-container">
            <form className="form" noValidate onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
                value={this.state.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
                value={this.state.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Typography component="h6" variant="h5">
                <p id="1" style={{ color: "red" }}></p>
              </Typography>

              <div className="centerAliningItems">
                <button className="button1" type="submit">
                  <span>Login In</span>
                </button>
              </div>

              <div className="centerAliningItems">
                <p>Don't have and account?</p>
                <Link to="/signup" variant="body2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default Login;
