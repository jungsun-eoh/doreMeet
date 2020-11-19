import React from 'react';
import './App.css';
import './Chat.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "./components/Footer/Footer";

const Chat = (stateObj) => {
  return(
    <>
      <Router>
        <div className="App">
          <Navbar/>
          <header className="App-header">
            <div className="description">
              <h2 align='center' top='30%'> Chat with your Matches!</h2>
            </div>
            <div class="ChatContainer">
              <div class="ChatList">
                <div class="ActiveChat">
                  <img class="UserPicture" src="/assets/spotifylogo.png"/>
                  <div class="NameAndMessage">
                    <span>Name</span>
                    <span class="MessagePreview">Hi, this is a random message created for testing</span>
                  </div>
                </div>
                <div class="ActiveChat">
                  <img class="UserPicture" src="/assets/twitterlogo.png"/>
                  <div class="NameAndMessage">
                    <span>Name</span>
                    <span class="MessagePreview">Hi, this is a random message created for testing</span>
                  </div>
                </div>
                <div class="ActiveChat">
                  <img class="UserPicture" src="/assets/instagramlogo.png"/>
                  <div class="NameAndMessage">
                    <span>Name</span>
                    <span class="MessagePreview">Hi, this is a random message created for testing</span>
                  </div>
                </div>
              </div>
              <div class="MessageWindow">
                <div class='NameAndPicture'>
                  <img class="UserPicture" src='/assets/spotifylogo.png'/>
                  <span>Name</span>
                </div>
                <div class='Messages'>
                  <div class='LeftMessage'>
                    <span>This is a test message</span>
                  </div>
                  <div class='RightMessage'>
                    <span>This is a test message</span>
                  </div>
                  <div className='LeftMessage'>
                    <span>This is a test message</span>
                  </div>
                  <div className='LeftMessage'>
                    <span>This is a test message</span>
                  </div>
                  <div className='RightMessage'>
                    <span>This is a test message</span>
                  </div>
                  <div className='RightMessage'>
                    <span>This is a test messageThis is a test message This is a test messageThis is a test message This is a test message</span>
                  </div>
                </div>
                <div class='TextArea'>
                  <div>
                    <textarea class='Text' placeholder="Send a message"></textarea>
                  </div>
                  <div>
                    <button class='SendButton'>Send</button>
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default Chat;