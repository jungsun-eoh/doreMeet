/*
**CSC 648 Team 02 DoReMeet
**File: MatchingPage.js
**Desc: This is the match page, users are matched with other users automatically based on their art category
and preferences.
*/

import React, {useState} from 'react';
import '../App.css';
import './MatchingPage.css';
import Navbar from '../components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import axios from 'axios';
import { Button } from '../components/Navbar/Buttons';

var matches;
var index = 0;


const MatchingPage = (stateObj) => {

  const [screen, setScreen] = useState(false);

  //starts the match process, ideally have on page load (when user navigates to match)
  const match = (e) => {
    axios.get('/searchMatches', {params: { user: document.cookie}}).then(response => {
      matches = response.data;
      console.log("They're: " + matches.length);
      loadCurrentMatch();
    }).catch(error => {
      console.log(error)
    })
    index = 0;
  }

  //loads the current match. =====# used as breakpoints
  const loadCurrentMatch = async (event) => {
    console.log("==========================0");
    if (index >= matches.length) {
      return alert("no more potential matches");
    }

    const formData = new FormData();
    formData.append("currentMatch", matches[index].user_id);
    formData.append('user', document.cookie);
    var matchStatus;
    await axios.post('/checkMatch', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      console.log(response.data[0]);
      if (typeof response.data[0] === 'undefined') {
        matchStatus = 0;
        console.log("match: " + matchStatus + " not decided");
        // if (!matchStatus) { //if user has not decided
        if (1) { //swap with above if statement to look at decided matches
            console.log("matchstatus is undecided, retrieveing match's info");
            axios.post('/getProfile2', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
              console.log(stateObj.profilePic);
              stateObj.setProfilePic(response.data[0].profile_pic);
              stateObj.setProfilePicPath(response.data[0].picture_path);
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
            axios.get('/getMedia', {params: { user: document.cookie}}).then(response => {
              console.log(response.data);
                      if(response.data.length > 0) {
                        //assign media here as response.data.[x]
                      }
                  }).catch(function (error) {
                      console.log(error);
                      console.log("{Media}  Not Found");
                  })
          } else {
            console.log("user already decided");
            console.log("loading nex match");
            console.log("==========================3");
            //user already passed 
            return;
          }
      } else {
        matchStatus = 1;
        console.log("loading next match..." + matchStatus + " decided already: " +  response.data[0].user1 + " .. " + response.data[0].user2 );
        index += 1;
        if(index < matches.length){
          loadCurrentMatch();
        }
      }
    }).catch(function (error) {
      console.log(error);
      console.log("checkMatch fail");
    });
    if (index >= matches.length) {
      return alert("no more potential matches");
    }
    console.log("==========================4");
  }

  const pass =  (e) => {
    if (index >= matches.length) {//safety case, should be safe to delete
      return alert("no more potential matches");
    }
    const formData = new FormData();
    console.log(matches[index].user_id);
    formData.append("currentMatch", matches[index].user_id);
    formData.append('user', document.cookie);
     axios.post('/pass', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      index += 1; //queues up next match
      console.log(response);
      loadCurrentMatch();
    }).catch(function (error) {
      console.log(error);
    });
  }

  const connect =  async (e) => {
    const formData = new FormData();
    if (index >= matches.length) {//safety case, should be safe to delete
      return alert("no more potential matches");
    }
    console.log(matches[index].user_id);
    formData.append("currentMatch", matches[index].user_id);
    formData.append('user', document.cookie);
     axios.post('/connect', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
      index += 1; //queues up next match
      console.log(response);
      loadCurrentMatch();
    }).catch(function (error) {
      console.log(error);
    });
  }

  const leaveSiteConfirmation = (e) => {
    if(window.confirm('You are leaving DoReMeet, are you sure?')){
    }
    else{
      e.preventDefault();
    }
  }

  const switchScreen = () =>{
    console.log("test");
    match();
    setScreen(true);
  }

  if(!screen){
    return(
      <div className="App">
          <Navbar />
          <header className="App-header">
            <div style={{height: "100%"}} className="description">
              <h2 align='center' top='30%'> Welcome to the matching page!</h2>
              <br />
                <ul style={{listStylePosition: "inside", textAlign: "center", fontSize: "30px"}}>
                  <li>Make sure that your profile is all set up</li>
                  <li>Check that your preferences are up to date</li>
                  <li>Click on the button below to begin matching!</li>
                </ul>
                <p  style={{ fontSize: 22, marginTop: "50px", cursor: "pointer", marginLeft: "auto", marginRight: "auto", backgroundColor: "#7EDAD8", width: "300px", borderRadius: "15px" }} align='center' onClick={ () =>switchScreen()}>Click Here!</p>
              </div>
        </header>
        </div>
    );
  }
  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <div className="description">
              <h2 align='center' top='30%'> Find the Right Match for yourself from these Potential Matches!</h2>
              <br />
              <p style={{ fontSize: 22, marginLeft: 40, marginRight: 40 }} align='center'>If you find someone you want to collaborate with, "Connect" with them, or else "Pass" to keep looking for the right match</p>
            </div>
            <div class="MatchProfile">
              <div class="Picture">
                <img class="ProfilePicture" src={stateObj.profilePicPath+stateObj.profilePic} alt='Profile Picture' />
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
                  <p class="SurroundText">{stateObj.artCategory}</p>
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