import React, { Component } from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { Link } from "react-router-dom";
import "./Home.css";
class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-container-head">
            <h1>Web Chat</h1>
            <p>Let's talk to anyone you want</p>

            <Link to="/login">
              <button>Get Started</button>
            </Link>
          </div>
        </div>

        <Footer />
      </>
    );
  }
}

export default Home;
