import React, { Component } from "react";
import "./Profile.css";
import firebase from "../../Services/firebase";
import images from "../../ProjectImages/ProjectImages";
import LoginStrings from "../Login/LoginStrings";
class Profile extends Component {
  state = {
    isLoading: false,
    documentKey: localStorage.getItem(LoginStrings.FirebaseDocumentId),
    id: localStorage.getItem(LoginStrings.ID),
    name: localStorage.getItem(LoginStrings.Name),
    aboutMe: localStorage.getItem(LoginStrings.Description),
    photoUrl: localStorage.getItem(LoginStrings.PhotoURL),
  };
  newPhoto = null;
  newPhotoUrl = "";
  componentDidMount() {
    if (!localStorage.getItem(LoginStrings.ID)) {
      this.props.history.push("/");
    }
  }
  onChangeNickname = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  onChangeAboutMe = (event) => {
    this.setState({
      aboutMe: event.target.value,
    });
  };
  onChangeAvatar = (event) => {
    if (event.target.files && event.target.files[0]) {
      const prefixFiletype = event.target.files[0].type.toString();
      if (prefixFiletype.indexOf(LoginStrings.PREFIX_IMAGE) !== 0) {
        console.log("this is not image");
      }
      this.newPhoto = event.target.files[0];
      this.setState({ photoUrl: URL.createObjectURL(event.target.files[0]) });
    } else {
      console.log("Something wrong with input file");
    }
  };
  uploadAvatar = () => {
    if (this.newPhoto) {
      const uploadTask = firebase
        .storage()
        .ref()
        .child(this.state.id)
        .put(this.newPhoto);
      uploadTask.on(
        LoginStrings.UPLOAD_CHANGED,
        null,
        (err) => {
          console.log("Error");
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.updateUserInfo(true, downloadURL);
          });
        }
      );
    } else {
      this.updateUserInfo(false, null);
    }
  };
  updateUserInfo = (isUpdatedPhotoURL, downloadURL) => {
    let newInfo = "";
    if (isUpdatedPhotoURL) {
      newInfo = {
        name: this.state.name,
        description: this.state.aboutMe,
        URL: downloadURL,
      };
    } else {
      newInfo = {
        name: this.state.name,
        description: this.state.aboutMe,
      };
    }
    firebase
      .firestore()
      .collection("users")
      .doc(this.state.documentKey)
      .update(newInfo)
      .then((data) => {
        localStorage.setItem(LoginStrings.Name, this.state.name);
        localStorage.setItem(LoginStrings.Description, this.state.aboutMe);
        if (isUpdatedPhotoURL) {
          localStorage.setItem(LoginStrings.PhotoURL, downloadURL);
        }
      });
  };
  render() {
    return (
      <div className="profileroot">
        <div className="headerprofile">
          <span>PROFILE</span>
        </div>
        <img className="avatar" alt="" src={this.state.photoUrl} />
        <div className="viewWrapInputFile">
          <img
            className="imgInputFile"
            alt="icon gallery"
            src={images.choosefile}
            onClick={() => {
              this.refInput.click();
            }}
          />
          <input
            ref={(el) => {
              this.refInput = el;
            }}
            accept="image/*"
            className="viewInputFile"
            type="file"
            onChange={this.onChangeAvatar}
          />
        </div>
        <span className="textLabel">Name</span>
        <input
          className="textInput"
          value={this.state.name ? this.state.name : ""}
          placeholder="Your nickname..."
          onChange={this.onChangeNickname}
        />
        <span className="textLabel">About Me</span>
        <input
          className="textInput"
          value={this.state.aboutMe ? this.state.aboutMe : ""}
          placeholder="Tell about yourself..."
          onChange={this.onChangeAboutMe}
        />
        <div>
          <button className="btnUpdate" onClick={this.uploadAvatar}>
            SAVE
          </button>
          <button
            className="btnback"
            onClick={() => {
              this.props.history.push("/chat");
            }}
          >
            BACK
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
