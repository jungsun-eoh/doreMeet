/*
**CSC 648 Team 02 DoReMeet
**File: MatchingPage.js
**Desc: This is the match page, users are matched with other users automatically based on their art category
and preferences.
*/

import React from 'react';
import '../App.css';
import './MatchingPage.css';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import axios from 'axios';

var matches;
var index = 0;
const MatchingPage = (stateObj) => {


  const match = (e) => {
    index = 0;
    console.log("000----------------------------")
    axios.get('/searchMatches').then(response => {
      matches = response.data;
      response.data.forEach(element => {
        console.log(element);
      })
      console.log(matches);
    })
      .catch(error => {
        console.log(error)
      });
  }

  const loadCurrentMatch = (e) => {
    if(index == matches.length){
      return alert("no more potential matches");
    }
    console.log("111-------------------------");
    console.log(matches[index]);
    console.log("222-------------------------");
    const formData = new FormData();
    console.log(matches[index].user_id);
 
    formData.append("currentMatch", matches[index].user_id);

    console.log("333-------------------------");

    axios.post('/getProfile2', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response2 => {
      console.log(response2.data[0]);
      stateObj.setProfilePic(response2.data[0].profile_pic);
      stateObj.setBio(response2.data[0].bio);
    }).catch(function (error) {
      console.log(error);
      console.log("Not Found");
    });
    console.log("======================================================")
    stateObj.setFirstName(matches[index].first_name);
    stateObj.setLastName(matches[index].last_name);
    stateObj.setGender(matches[index].gender);
    stateObj.setDOB(matches[index].date_of_birth);
    stateObj.setArtCategory(matches[index].art_category);
    stateObj.setSkillLevel(matches[index].skill_lvl);
        //console.log(stateObj);
        console.log(index);

        index += 1;
        console.log(index);
  }

  return(
    <>
      <Router>
        <div className="App">
          <Navbar/>
          <header className="App-header">
            <div className="description">
              <h2 align='center' top='30%'> Find the Right Match for yourself from these Potential Match!</h2>
              <br />
              <p style={{fontSize: 22, marginLeft: 40, marginRight: 40 }} align='center'>If you find someone you want to collaborate with, "Connect" with them, or else "Pass" to keep looking for the right match</p>
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
                  <p class="Bio">Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
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
                  <button class="PassButton" onClick={match}>Pass</button>
                  <button class="ConnectButton" onClick={loadCurrentMatch}>Connect</button>
                </div>
              </div>
              <div class='break'></div>
              <div class="MediaFiles" >
                <img class="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img'/>
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img'/>
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img'/>
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img'/>
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img'/>
              </div>
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