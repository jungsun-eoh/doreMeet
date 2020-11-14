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
            <div className="description">
              <h2 align='center' top='30%'> Connect with or Pass your Potential Match! </h2>
            </div>
            <div class="MatchProfile">
              <div class="Picture">
                <img class="ProfilePicture" src='assets/placeholder-img.jpg' alt='Profile Picture'/>
              </div>
              <div class="UserInformation">
                <div class="Spacing">
                  <h3>Robert, 26</h3>
                </div>
                <div class="Spacing">
                  <p>Bio: ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                </div>
                <div class="Spacing">
                  <p class="InfoLabel">Art:</p>
                  <p class="SurroundText">Dance</p>
                </div>
                <div class="Spacing">
                  <p class="InfoLabel">Tags:</p>
                  <p class="SurroundText">Salsa</p>
                  <p class="SurroundText">Hip Hop</p>
                  <p class="SurroundText">Hip Hop</p>
                  <p class="SurroundText">Hip Hop</p>
                  <p class="SurroundText">Hip Hop</p>
                  <p class="SurroundText">Hip Hop</p>
                </div>
                <div class="Spacing">
                  <button class="PassButton">Pass</button>
                  <button class="ConnectButton">Connect</button>
                </div>
              </div>
              <div class='break'></div>
              <div class='Links'>
                <a href="https://www.spotify.com">
                  <img class="Logo" src='assets/spotifylogo.png' alt="Spotify Logo"/>
                </a>
                <a href="https://www.youtube.com">
                  <img class="Logo" src='assets/youtubelogo.png' alt='Youtube Logo'/>
                </a>
                <a href="https://www.instagram.com">
                  <img class="Logo" src='assets/instagramlogo.png' alt='Instagram Logo'/>
                </a>
                <a href="https://www.twitter.com">
                  <img class="Logo" src='assets/twitterlogo.png' alt='Twitter Logo'/>
                </a>
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