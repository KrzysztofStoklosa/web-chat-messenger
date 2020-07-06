import React, { Component } from "react";
import "./Chat.css";
import LoginStrings from "../Login/LoginStrings";
import Welcome from "../Welcome/Welcome";
import Chatbox from "../Chatbox/Chatbox";
import firebase from "../../Services/firebase";
import { firestore } from "firebase";
class Chat extends Component {
  state = {
    displayedContactswithNotification: [],
    currentPeerUser: null,
    displayedContacts: [],
  };
  currentUserPhoto = localStorage.getItem(LoginStrings.PhotoURL);
  currentUserName = localStorage.getItem(LoginStrings.Name);
  currentUserDocumentId = localStorage.getItem(LoginStrings.FirebaseDocumentId);
  currentUserId = localStorage.getItem(LoginStrings.ID);

  currentUserMessages = [];
  searchUsers = [];
  notificationMessagesErase = [];
  handleLogoutButton = () => {
    firebase.auth().signOut();
    this.props.history.push("/");
    localStorage.clear();
  };
  onProfileClick = () => {
    this.props.history.push("/profile");
  };
  getListUser = async () => {
    const result = await firestore().collection("users").get();
    if (result.docs.length > 0) {
      let listUsers = [];
      listUsers = [...result.docs];
      listUsers.forEach((item, index) => {
        this.searchUsers.push({
          key: index,
          documentkey: item.id,
          id: item.data().id,
          name: item.data().name,
          messages: item.data().messages,
          URL: item.data().URL,
          description: item.data().description,
        });
      });
    }
    this.renderListUser();
  };
  renderListUser = () => {
    if (this.searchUsers.length > 0) {
      let viewListUser = [];
      let classname = "";
      this.searchUsers.map((item) => {
        if (item.id !== this.currentUserId) {
          classname = this.getClassnameforUserandNotification(item.id);
          viewListUser.push(
            <button
              key={item.id}
              id={item.key}
              className={classname}
              onClick={() => {
                this.notificationErase(item.id);
                this.setState({
                  currentPeerUser: item,
                  displayedContactswithNotification: this
                    .notificationMessagesErase,
                });
                document.getElementById(item.key).style.backgroundColor =
                  "#fff";
                if (document.getElementById(item.key)) {
                  document.getElementById(item.key).style.color = "#fff";
                }
              }}
            >
              <img className="viewAvatarItem" src={item.URL} alt="" />

              <div className="viewWrapContentItem">
                <span className="textItem">{`Name: ${item.name}`}</span>
              </div>
              {classname === "viewWrapItemNotification" ? (
                <div className="notificationpragraph">
                  <p id={item.key} className="newmessages">
                    New messages
                  </p>
                </div>
              ) : null}
            </button>
          );
        }
        return viewListUser;
      });
      this.setState({
        displayedContacts: viewListUser,
      });
    } else {
      console.log("No user is present");
    }
  };
  getClassnameforUserandNotification = (itemId) => {
    let number = 0;
    let className = "";
    let check = false;
    if (
      this.state.currentPeerUser &&
      this.state.currentPeerUser.id === itemId
    ) {
      className = "viewWrapItemFocused";
    } else {
      this.state.displayedContactswithNotification.forEach((item) => {
        if (item.notificationId.length > 0) {
          if (item.notificationId === itemId) {
            check = true;
            number = item.number;
          }
        }
      });
      if (check === true) {
        className = "viewWrapItemNotification";
      } else {
        className = "viewWrapItem";
      }
    }
    return className;
  };
  notificationErase = (itemId) => {
    this.state.displayedContactswithNotification.forEach((el) => {
      if (el.notificationId.length > 0) {
        if (el.notificationId !== itemId) {
          this.notificationMessagesErase.push({
            notificationId: el.notificationId,
            number: el.number,
          });
        }
      }
    });
    this.updaterenderlist();
  };
  updaterenderlist = () => {
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentUserDocumentId)
      .update({ messages: this.notificationMessagesErase });
    this.setState({
      displayedContactswithNotification: this.notificationMessagesErase,
    });
  };

  componentDidMount() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.currentUserDocumentId)
      .get()
      .then((doc) => {
        doc.data().messages.map((item) => {
          this.currentUserMessages.push({
            notificationId: item.notificationId,
            number: item.number,
          });
          return this.currentUserMessages;
        });
        this.setState({
          displayedContactswithNotification: this.currentUserMessages,
        });
      });
    this.getListUser();
  }
  render() {
    return (
      <div className="root">
        <div className="body">
          <div className="listUserViev">
            <div className="leftSideProfilViev">
              <img
                className="ProfilePicture"
                alt=""
                src={this.currentUserPhoto}
                onClick={this.onProfileClick}
              />
              <button
                className="logoutButton"
                onClick={this.handleLogoutButton}
              >
                Logout
              </button>
            </div>
            {this.state.displayedContacts}
          </div>
          <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <Chatbox
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
              <Welcome
                currentUserName={this.currentUserName}
                currentUserPhoto={this.currentUserPhoto}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Chat;
