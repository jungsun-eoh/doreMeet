import React from 'react';
import './App.css';
import './MatchingPage.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "./components/Footer/Footer";

const MatchingPage = (stateObj) => {
  return(
    <>
      <Router>
        <div className="App">
          <Navbar/>
          <header className="App-header">
            <div class="MatchProfile">
              <img class="ProfilePicture" src='assets/placeholder-img.jpg' alt='ProfilePicture'/>
              <div class="UserInformation">
                <p>Name: </p>
                <p>Art: </p>
                <p>Tags: </p>
              </div>
              <div class="break"></div>
              <div class="Media">
                <p>Photos: </p>
                <p>Videos: </p>
                <p>Audio: </p>
              </div>
              <div class="UserChoices">
                <button class="ConnectButton">Connect</button>
                <br/>
                <br/>
                <br/>
                <button class="PassButton">Pass</button>
              </div>
            </div>
          </header>
        </div>
        <Footer/>
      </Router>
    </>
  );
}

export default MatchingPage;