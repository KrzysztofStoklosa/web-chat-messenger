import React, { Component } from "react";
import "./Welcome.css";
class Welcome extends Component {
  state = {};
  render() {
    return (
      <div className="viewWelcomeBoard">
        <img
          className="avatarWelcome"
          src={this.props.currentUserPhoto}
          alt=""
        />
        <span className="textTitleWelcome">{`Welcome  ${this.props.currentUserName}`}</span>
      </div>
    );
  }
}

export default Welcome;
