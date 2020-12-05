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

  const state= {
    contacts: DUMMY_CONTACTS,
    messages: DUMMY_MESSAGES
  }

  return(
    <>
      <Router>
        <div className="App">
          <Navbar/>
        </div>
        <div style={{display: "flex"}}>
        <SideBar contacts={state.contacts}/>
        <div>
        <MessageList messages={state.messages}/>
        <SendMessageForm/>
        </div>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default Chat;