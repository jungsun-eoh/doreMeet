/*
**CSC 648 Team 02 DoReMeet
**File: Settings.js
**Desc: The settings page, displays all the current settings and also allwos users to change settings.
Accessed through the logged in Navbar not the home nav bar.
*/

import React from 'react';
import '../App.css';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';


const Settings = (stateObj) => {

    const getUser = (event) => {
    axios.get('/getUsers').then(response => {
        console.log(response.data[0]);
        document.getElementById("first_name").innerHTML = response.data[0].first_name;
        document.getElementById("last_name").innerHTML = response.data[0].last_name;
        document.getElementById("gender").innerHTML = response.data[0].gender;
        response.data[0].date_of_birth = response.data[0].date_of_birth.substring(0, 10);
        document.getElementById("date_of_birth").innerHTML = response.data[0].date_of_birth;
        document.getElementById("email").innerHTML = response.data[0].email;
        document.getElementById("phone_number").innerHTML = response.data[0].phone_number;
        document.getElementById("art_category").innerHTML = response.data[0].art_category;
        document.getElementById("skill_lvl").innerHTML = response.data[0].skill_lvl;
        document.getElementById("username").innerHTML = response.data[0].username;

        stateObj.setFirstName(response.data[0].first_name);
        stateObj.setLastName(response.data[0].last_name);
        stateObj.setGender(response.data[0].gender);
        stateObj.setDOB(response.data[0].date_of_birth);
        stateObj.setEmail(response.data[0].email);
        stateObj.setPhoneNumber(response.data[0].phone_number);
        stateObj.setArtCategory(response.data[0].art_category);
        stateObj.setSkillLevel(response.data[0].skill_lvl);
        stateObj.setUserName(response.data[0].username);
      }).catch(function (error) {
          console.log(error)
        console.log("Not Found");
      });
    }
    const updateUser = (event) => {

        const formData = new FormData();
 
        if(stateObj.firstName !== '')formData.append("first_name", stateObj.firstName);
        if(stateObj.lastName !== '')formData.append("last_name", stateObj.lastName);
        if(stateObj.gender !== '')formData.append("gender", stateObj.gender);
        if(stateObj.DOB !== '')formData.append("date_of_birth", stateObj.DOB);
        if(stateObj.email !== '')formData.append("email", stateObj.email);
        if(stateObj.phoneNumber !== '')formData.append("phone_number", stateObj.phoneNumber);
        if(stateObj.artCategory !== '')formData.append("art_category", stateObj.artCategory);
        if(stateObj.skillLevel !== '')formData.append("skill_lvl", stateObj.skillLevel);
        if(stateObj.userName !== '')formData.append("username", stateObj.userName);
        if(stateObj.userPassword !== '')formData.append("password", stateObj.userPassword);
        if(stateObj.newPassword !== '')formData.append("new_password", stateObj.newPassword);
        if(stateObj.searchRadius !== '')formData.append("searchRadius", stateObj.searchRadius);
        

        axios.post('/updateUser', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data[0]);
        }).catch(function (error) {
            console.log("Not Found");
          });;
        // axios.post('/updateUser');

    };
    const updatePreferences = (event) => {

        const formData = new FormData();
        if(stateObj.artCategory !== '')formData.append("art_category", stateObj.artCategory);
        if(stateObj.skillLevel !== '')formData.append("skill_lvl", stateObj.skillLevel);
        if(stateObj.minimumAge !== '')formData.append("min_age", stateObj.minimumAge);
        if(stateObj.maximumAge !== '')formData.append("max_age", stateObj.maximumAge);
        if(stateObj.preferedGender !== '')formData.append("gender", stateObj.preferedGender);
        if(stateObj.preferedSkillLevel !== '')formData.append("skill_lvl_pref", stateObj.preferedSkillLevel);
        if(stateObj.meetingPreference !== '')formData.append("meeting_pref", stateObj.meetingPreference);


        

        axios.post('/updatePreferences', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data[0]);
        }).catch(function (error) {
            console.log("Not Found");
          });;
        // axios.post('/updateUser');

    };
// onChange={e => stateObj.setFirstName(stateObj.currentFirstName)}
    return(
        <>
        <Router>
            <div className ="App">
                <Navbar/>
                <header className="App-header">
                    <div className="description">
                        <h1>Settings</h1>
                        <p style={{fontSize: 22, marginLeft: 40, marginRight: 40 }} align='center'>The settings you choose reflect your match preferences. your potential matches will be based on these choices.<br/>
                        You can update your settings anytime and get customized results.</p>
                    </div>
                    
                    <input style={{position: "center", width: '10%', marginLeft:1050, marginTop:10}} type='button' value="Edit Settings"  onClick={getUser}/><br/>
                    <form className="settingsForm" onSubmit={updateUser}>
                        <h3>Settings</h3>
                        <label for="fname">First Name Currently: {stateObj.currentFirstName}<b id="first_name"></b></label><br/>
                        <input onChange={e => stateObj.setFirstName(e.target.value)} className="settingsFields" type="text" id="fname"/><br/>
                        <label for="lname">Last Name Currently: {stateObj.currentLastName}<b id="last_name"></b></label><br/>
                        <input onChange={e => stateObj.setLastName(e.target.value)} className="settingsFields" type="text" id="lname"/><br/>
                        <p>Your name will not be available for other users to view to protect your privacy</p><br />
                       
                        <table>
                        <tr>
                            <td><h4>Gender Currently: {stateObj.currentGender}<b id="gender"></b></h4></td>&nbsp;  &nbsp; 
                            <td><input onChange={e => stateObj.setGender(e.target.value)} type="radio" id="male" name="gender" value="m"/>
                            <label for="male">Male</label></td> &nbsp;  &nbsp; 
                            <td><input onChange={e => stateObj.setGender(e.target.value)} type="radio" id="female" name="gender" value="f"/>
                            <label for="female">Female</label></td>&nbsp;  &nbsp;
                            <td><input onChange={e => stateObj.setGender(e.target.value)} type="radio" id="none" name="gender" value="0"/>
                            <label for="none">None</label></td>
                        </tr></table>

                        <label for="birthday">Date of Birth Curently: {stateObj.currentDOB}<b id="date_of_birth"></b></label><br/>
                        <input style={{marginTop: "0px", marginBottom: "0px", width: "240px"}} onChange={e => stateObj.setDOB(e.target.value)} className="settingsFields" type = "date" id="birthday" max="2002-01-01"/>
                        <p>You must be 18 or older to use this site</p><br/>

                        <label for="email">Email Currently: {stateObj.currentEmail}<b id="email"></b></label><br/>
                        <input onChange={e => stateObj.setEmail(e.target.value)} className="settingsFields" type = "email" id = "email"/>
                        <p>Your email is not viewable for other users for your privacy</p><br/>

                        <table><tr><td><label for="phone">Phone Number Currently: {stateObj.currentPhoneNumber}<b id="phone_number"></b></label><br/></td>
                        <td>
                        <input style={{width: "150px"}} onChange={e => stateObj.setPhoneNumber(e.target.value)} className="settingsFields" type = "tel" id = "phone" placeholder="123-456-7890" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                       </td></tr></table> <p>Required only for 2-factor identification</p><br/>

                        <label for = "username">Username Currently: {stateObj.currentUserName}<b id="username"></b></label><br/>
                        <input onChange={e => stateObj.setUserName(e.target.value)} className="settingsFields" type = "text" id="username" /><br/>
                        <label for = "pwd">Current Password:</label><br/>
                        <input onChange={e => stateObj.setUserPassword(e.target.value)} className="settingsFields" type = "password" id="pwd"/><br/>
                        <label for = "pwd">New Password:</label><br/>
                        <input onChange={e => stateObj.setNewPassword(e.target.value)} className="settingsFields" type = "new_password" id="newpwd"/><br/>
                        <p></p><br/>
                        <input style={{position: "relative"}} type='submit' value="Confirm Settings Changes"/>
                    </form>
                    <form className="settingsForm" onSubmit={updatePreferences}>
                        <h3>Preferences</h3>
                       <table><tr><td><label for="art">Art Category Currently: {stateObj.currentArtCategory}<b id="art_category"></b></label></td>
                        &nbsp; &nbsp; &nbsp; &nbsp; 
                        <td>
                        <select onChange={e => stateObj.setArtCategory(e.target.value)} id = "art">
                            <option value={"Music"}>Music</option>
                            <option value={"Dance"}>Dance</option>
                            <option value={"Art"}>Art</option>
                            <option value={"Cinema"}>Cinema</option>
                            <option value={"Photography"}>Photography</option>
                            </select></td></tr></table>
                        <p>When switching categories make sure to update your skill level and content</p><br/>
                        <table><tr><td><label for="skill">Skill Level Currently: {stateObj.currentSkillLevel}<b id="skill_lvl"></b></label></td>
                        &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
                        <td>
                        <select onChange={e => stateObj.setSkillLevel(e.target.value)} id = "skill">
                            <option value={"B"}>Beginner</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"E"}>Expert</option>
                        </select></td></tr></table>
                        <p>Generally begginers have less than 5 years of experience and advanced has more than 7 years of experience</p><br/>

                        <table><tr><td><label for = "minAge">Minimum Age (18+) Currently: {stateObj.currentMinimumAge}<b id="min_age"></b></label></td>
                        &nbsp; &nbsp;
                        <td>
                        <input style={{width: "100px"}} onChange={e => stateObj.setMinimumAge(e.target.value)} className="settingsFields" type="number" id="minAge" min="18"/>
                        </td></tr></table>
                        <p>The minimum age of people you will match with</p>
                        <table><tr><td><label for = "maxAge">Maximum Age Currently: {stateObj.currentMaximumAge}<b id="max_age"></b></label></td>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <td>
                        <input style={{width: "100px"}} onChange={e => stateObj.setMaximumAge(e.target.value)} className="settingsFields" type="number" id="maxAge" min="18"/>
                        </td></tr></table><p>The maximum age of people you will match with</p><br/>

                        <table>
                        <tr>
                            <td><h4>Prefered Match Gender Currently: {stateObj.currentPreferedGender}</h4><b id="gender"></b></td>&nbsp;  &nbsp;
                            <td><input onChange={e => stateObj.setPreferedGender(e.target.value)} type="radio" id="preferedMale" name="preferedGender" value="m"/>
                            <label for="preferedMale">Male</label></td>&nbsp;  &nbsp;
                            <td><input onChange={e => stateObj.setPreferedGender(e.target.value)} type="radio" id="preferedFemale" name="preferedGender" value="f"/>
                            <label for="preferedFemale">Female</label></td>&nbsp;  &nbsp;
                            <td><input onChange={e => stateObj.setPreferedGender(e.target.value)} type="radio" id="preferedNone" name="preferedGender" value="0"/>
                            <label for="preferedNone">None</label></td></tr></table>
                        <p>Your prefered gender for the people you will match with</p><br/>

                        <table><tr><td><label for="preferedSkill">Prefered Skill Level Currently: {stateObj.currentPreferedSkillLevel}<b id="skill_lvl_pref"></b></label></td> 
                        &nbsp;  &nbsp;<td>
                        <select onChange={e => stateObj.setPreferedSkillLevel(e.target.value)} id = "preferedSkill">
                            <option value={"B"}>Begginer</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"E"}>Expert</option>
                        </select></td></tr></table> 
                        <p>Your prefered skill level for the people you will match with</p><br/>

                        <table><tr><td><label for="preferedMeet">Prefered Meeting Type Currently: {stateObj.currentMeetingPreference}<b id="meeting_pref"></b></label><br/></td> 
                        &nbsp;<td>
                        <select onChange={e => stateObj.setMeetingPreference(e.target.value)} id = "preferedMeet">
                            <option value={"Online"}>Online</option>
                            <option value={"Offline"}>Offline</option>
                        </select></td></tr></table> 
                        <p>Your prefrence for meeting online or offline</p><br/>

                        <table><tr><td><label for="searchRadius">Prefered Search Radius Currently (Miles): {stateObj.currentMeetingPreference}<b id="meeting_pref"></b></label><br/></td> 
                        &nbsp;<td>
                        <input style={{width: "100px"}} onChange={e => stateObj.setSearchRadius(e.target.value)} className="settingsFields" type="number"  min="1" max="100"/>
                        </td></tr></table> 
                        <p>Your prefrence for the maximum distance by which you'll match with people</p><br/>

                        <input style={{position: "relative"}} type='submit' value="Confirm Preference Changes"/>
                        <br/>

                        <button style={{backgroundColor: "#ffd700"}}><a style={{textDecoration: "none",color: "black"}} href={'/Premium'}>Upgrade to Premium Account</a></button><br/>
                        <button style={{backgroundColor: "#06EFB7",width: "198px", marginRight: "3px"}}>Pause Account</button>
                        <button style={{backgroundColor: "#FD7D7D",width: "198px"}}>Delete Account</button><br/>
                    </form>
                </header>
            </div>
        <Footer />
        </Router>
        </>
    );

}

export default Settings;