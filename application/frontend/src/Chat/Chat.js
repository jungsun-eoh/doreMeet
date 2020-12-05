/*
**CSC 648 Team 02 DoReMeet
**File: Chat.js
**Desc: Contains the code for the chat page.
*/

//TODO: Implement full chat functionality including: message displaying, communication with backend, message logging

import React from 'react';
import '../App.css';
import './Chat.css';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import SideBar from "./SideBar";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

const DUMMY_CONTACTS = [
  {
    userName: "John Tester",
    picture: "../../assets/youtubelogo.png"
  },
  {
    userName: "Jane Tester",
    picture: "../../assets/spotifylogo.png"
  }
]

const DUMMY_MESSAGES = [
  {
    userName: "John Tester",
    text: "Hi my name is John"
  },
  {
    userName: "You",
    text: "Hello there"
  },
  {
    userName: "John Tester",
    text: "How are you doing today"
  },
  {
    userName: "You",
    text: "Im doing fine, lkadsjflajdslfjsadlfjsaldkfjlsadjflsadjflsajdlfjasdfkjsadlkfjads"
  },
]

const Chat = (stateObj) => {

  const [screenState, setScreenState] = React.useState('tutorial')

  const state= {
    contacts: DUMMY_CONTACTS,
    messages: DUMMY_MESSAGES,
    screenState: screenState,
    setScreenState: setScreenState
  }

  return(
    <>
      <Router>
        <div className="App">
          <Navbar/>
        </div>
        <SideBar messages={state.messages} contacts={state.contacts} setScreen={state.setScreenState} screen={state.screenState}/>
        <Footer/>
      </Router>
    </>
  );
}

export default Chat;