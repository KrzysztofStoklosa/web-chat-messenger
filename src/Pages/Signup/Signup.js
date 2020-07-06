import React, { Component } from "react";
import firebase from "../../Services/firebase";
import LoginString from "../Login/LoginStrings";
import { Link } from "react-router-dom";
import "./Signup.css";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Card } from "react-bootstrap";
class Signup extends Component {
  state = {
    email: "",
    password: "",
    name: "",
    error: "",
  };
  handleChange = (e) => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value,
    });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, email } = this.state;
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          firebase
            .firestore()
            .collection("users")
            .add({
              name,
              id: result.user.uid,
              email,
              password,
              URL: "",
              description: "",
              messages: [{ notificationId: "", number: 0 }],
            })
            .then((docRef) => {
              localStorage.setItem(LoginString.ID, result.user.uid);
              localStorage.setItem(LoginString.Name, name);
              localStorage.setItem(LoginString.Email, email);
              localStorage.setItem(LoginString.Password, password);
              localStorage.setItem(LoginString.PhotoURL, "");
              localStorage.setItem(LoginString.UPLOAD_CHANGED, "state_changed");
              localStorage.setItem(LoginString.Description, "");
              localStorage.setItem(LoginString.FirebaseDocumentId, docRef.id);
              localStorage.setItem(LoginString.Description, "");
              this.setState({
                name: "",
                password: "",
                url: "",
              });
              this.props.history.push("/chat");
            })
            .catch((error) => {
              console.error("Error adding document", error);
            });
        });
    } catch (error) {
      document.getElementById("1").innerHTML =
        "Error in signing up please try again";
    }
  };
  render() {
    return (
      <>
        <CssBaseline />
        <Card className="signupCard">
          <div>
            <Typography component="h1" variant="h5">
              Sign up to
            </Typography>
          </div>
          <div>
            <Link to="/">
              <button class="btn">
                <i class="fa fa-home"></i> WebChat
              </button>
            </Link>
          </div>
        </Card>
        <Card className="signupFormCard">
          <form className="signupForm" onSubmit={this.handleSubmit}>
            <TextField
              variant="outlined"
              fullWidth
              margin="normal"
              required
              id="email"
              name="email"
              label="Email Address-example:abc@gmail.com"
              autoComplete="email"
              autoFocus
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              onChange={this.handleChange}
              value={this.state.password}
            />
            <p className="signupP">
              Password: length greater than 6 (alphabet,number,special
              character)
            </p>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Your Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={this.handleChange}
              value={this.state.name}
            />
            <p className="signupP">
              Please fill all fields. Password length should be greater than 6
              (alphabet,number,special character)
            </p>
            <button className="signupButton1">Sign Up</button>
            <p className="signupp">Already have and account?</p>
            <Link to="/login">Login In</Link>
            <div className="error">
              <p id="1"></p>
            </div>
          </form>
        </Card>
      </>
    );
  }
}

export default Signup;
