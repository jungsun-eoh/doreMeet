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
    axios.get('/searchMatches').then(response => {
      matches = response.data;
      // response.data.forEach(element => {
      //   console.log(element);
      // })
    }).catch(error => {
      console.log(error)
    })
    index = 0;
  }

  const loadCurrentMatch = async (event) => {

    event.preventDefault();
    console.log("==========================0");
    if (index === matches.length) {
      return alert("no more potential matches");
    }

    const formData = new FormData();
    formData.append("currentMatch", matches[index].user_id);

    var matchStatus;
    await axios.post('/checkMatch', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      console.log(response.data[0]);
      if (typeof response.data[0] === 'undefined') {
        matchStatus = 0;
        console.log("match: " + matchStatus + " not decided");
      } else {
        matchStatus = 1;
        console.log("match: " + matchStatus + " decided already");

      }
      // if (!matchStatus) { //if user has not decided
      if (1) {
        console.log("matchstatus is undecided, retrieveing match's info");
        axios.post('/getProfile2', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
          console.log(stateObj.profilePic);
          stateObj.setProfilePic(response.data[0].profile_pic);
          stateObj.setBio(response.data[0].bio);
        }).catch(function (error) {
          console.log(error);
        });
        console.log(stateObj.firstName + " " + stateObj.lastName);
        stateObj.setFirstName(matches[index].first_name);
        stateObj.setLastName(matches[index].last_name);
        stateObj.setGender(matches[index].gender);
        stateObj.setDOB(matches[index].date_of_birth);
        stateObj.setArtCategory(matches[index].art_category);
        //stateObj.setArtTag(); none yet?
        stateObj.setSkillLevel(matches[index].skill_lvl);
        console.log("==========================2");
      } else {
        console.log("user already decided");
        console.log("==========================3");
        //user already passed 
        index += 1;
        return;
      }
    }).catch(function (error) {
      console.log(error);
      console.log("checkMatch fail");
    });
    console.log("==========================1");
  }

  const pass = (e) => {
    if (index === matches.length) {
      return alert("no more potential matches");
    }
    const formData = new FormData();
    console.log(matches[index].user_id);
    formData.append("currentMatch", matches[index].user_id);
    axios.post('/pass', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
    index += 1; //queues up next match
  }

  const connect = (e) => {
    const formData = new FormData();
    if (index === matches.length) {
      return alert("no more potential matches");
    }
    formData.append("currentMatch", matches[index].user_id);
    axios.post('/connect', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    });
    index += 1; //queues up next match
  }

  const leaveSiteConfirmation = (e) => {
    if(window.confirm('You are leaving DoReMeet, are you sure?')){
    }
    else{
      e.preventDefault();
    }
  }

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <div className="description">
              <h2 align='center' top='30%'> Find the Right Match for yourself from these Potential Match!</h2>
              <br />
              <p style={{ fontSize: 22, marginLeft: 40, marginRight: 40 }} align='center'>If you find someone you want to collaborate with, "Connect" with them, or else "Pass" to keep looking for the right match</p>
            </div>
            <input style={{ position: "center", width: '10%', marginLeft: 1050, marginTop: 10 }} type='button' value="Start Match" onClick={match} /><br />
            <input style={{ position: "center", width: '10%', marginLeft: 1050, marginTop: 10 }} type='button' value="load first Match" onClick={loadCurrentMatch} /><br />
            <div class="MatchProfile">
              <div class="Picture">
                <img class="ProfilePicture" src={stateObj.profilepic} alt='Profile Picture' />
              </div>
              <div class="UserInformation">
                <div class="Spacing">
                  <h3>{stateObj.firstName} {stateObj.lastName}</h3>
                </div>
                <div class="Spacing">
                  <p class="Bio">{stateObj.bio}</p>
                </div>
                <div class="Spacing">
                  <p class="InfoLabel">Art:</p>
                  <p class="SurroundText">{stateObj.art_category}</p>
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
                  <button class="PassButton" onClick={pass}>Pass</button>
                  <button class="ConnectButton" onClick={connect}>Connect</button>
                </div>
              </div>
              <div class='break'></div>
              <div class="MediaFiles" >
                <img class="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img' />
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img' />
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img' />
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img' />
                <img className="Thumbnail" src='assets/placeholder-img.jpg' alt='Placeholder img' />
              </div>
              <div class='Links'>
                <a href="https://www.spotify.com" onClick={leaveSiteConfirmation}>
                  <img class="Logo" src='assets/spotifylogo.png' alt="Spotify Logo" />
                </a>
                <a href="https://www.youtube.com" onClick={leaveSiteConfirmation}>
                  <img class="Logo" src='assets/youtubelogo.png' alt='Youtube Logo' />
                </a>
                <a href="https://www.instagram.com" onClick={leaveSiteConfirmation}>
                  <img class="Logo" src='assets/instagramlogo.png' alt='Instagram Logo' />
                </a>
                <a href="https://www.twitter.com" onClick={leaveSiteConfirmation}>
                  <img class="Logo" src='assets/twitterlogo.png' alt='Twitter Logo' />
                </a>
              </div>
            </div>
          </header>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default MatchingPage;