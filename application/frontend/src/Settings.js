import React from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';


const Settings = (stateObj) => {

    return(
        <>
        <Router>
            <div className ="App">
                <Navbar/>
                <header className="App-header">
                    <div className="description">
                        <h1>Settings</h1>
                    </div>
                    <form className="settingsForm">
                        <label for="fname">First Name Currently: {stateObj.currentFirstName}</label><br/>
                        <input onChange={e => stateObj.setFirstName(e.target.value)} className="settingsFields" type="text" id="fname"/><br/>
                        <label for="lname">Last Name Currently: {stateObj.currentLastName}</label><br/>
                        <input onChange={e => stateObj.setLastName(e.target.value)} className="settingsFields" type="text" id="lname"/><br/>
                        <p>Your name will not be available for other users to view to protect your privacy</p><br/>

                        <h4>Gender Currently: {stateObj.currentGender}</h4>
                        <input onChange={e => stateObj.setGender(e.target.value)} type="radio" id="male" name="gender" value="male"/>
                        <label for="male">Male</label><br/>
                        <input onChange={e => stateObj.setGender(e.target.value)} type="radio" id="female" name="gender" value="female"/>
                        <label for="female">Female</label><br/>
                        <input onChange={e => stateObj.setGender(e.target.value)} type="radio" id="none" name="gender" value="none"/>
                        <label for="none">None</label><br/><br/>

                        <label for="birthday">Date of Birth Curently: {stateObj.currentDOB}</label><br/>
                        <input onChange={e => stateObj.setCurrentDOB(e.target.value)} className="settingsFields" type = "date" id="birthday" max="2002-01-01"/>
                        <p>You must be 18 or older to use this site</p><br/>

                        <label for="email">Email Currently: {stateObj.currentEmail}</label>
                        <input onChange={e => stateObj.setEmail(e.target.value)} className="settingsFields" type = "email" id = "email"/>
                        <p>Your email is not viewable for other users for your privacy</p><br/>

                        <label for="phone">Phone Number Currently: {stateObj.currentPhoneNumber}</label><br/>
                        <input style={{width: "120px"}} onChange={e => stateObj.setPhoneNumber(e.target.value)} className="settingsFields" type = "tel" id = "phone" placeholder="123-456-789" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{3}"/>
                        <p>Required only for 2-factor identification</p><br/>

                        <label for="art">Art Category Currently: {stateObj.currentArtCategory}</label><br/>
                        <select onChange={e => stateObj.setArtCategory(e.target.value)} id = "art">
                            <option value={"Music"}>Music</option>
                            <option value={"Dance"}>Dance</option>
                            <option value={"Art"}>Art</option>
                            <option value={"Cinema"}>Cinema</option>
                            <option value={"Photography"}>Photography</option>
                            </select><br/>
                        <p>When switching categories make sure to update your skill level and content</p><br/>

                        <label for="skill">Skill Level Currently: {stateObj.currentSkillLevel}</label><br/>
                        <select onChange={e => stateObj.setSkillLevel(e.target.value)} id = "skill">
                            <option value={"B"}>Beginner</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"A"}>Advanced</option>
                        </select> 
                        <p>Generally begginers have less than 5 years of experience and advanced has more than 7 years of experience</p><br/>

                        <label for = "username">Username Currently: {stateObj.currentUserName}</label><br/>
                        <input onChange={e => stateObj.setUserName(e.target.value)} className="settingsFields" type = "text" id="username" /><br/>
                        <label for = "pwd">Password</label><br/>
                        <input onChange={e => stateObj.setPassword(e.target.value)} className="settingsFields" type = "password" id="pwd"/><br/>
                        <p></p><br/>

                        <label for = "minAge">Minimum Age (18+) Currently: {stateObj.currentMinimumAge}</label><br/>
                        <input style={{width: "100px"}} onChange={e => stateObj.setMinimumAge(e.target.value)} className="settingsFields" type="number" id="minAge" min="18"/><br/>
                        <p>The minimum age of people you will match with</p>
                        <label for = "maxAge">Maximum Age Currently: {stateObj.currentMaximumAge}</label><br/>
                        <input style={{width: "100px"}} onChange={e => stateObj.setMaximumAge(e.target.value)} className="settingsFields" type="number" id="maxAge" min="18"/><br/>
                        <p>The maximum age of people you will match with</p><br/>

                        <h4>Prefered Match Gender Currently: {stateObj.currentPreferedGender}</h4>
                        <input onChange={e => stateObj.setPreferedGender(e.target.value)} type="radio" id="preferedMale" name="preferedGender" value="male"/>
                        <label for="preferedMale">Male</label><br/>
                        <input onChange={e => stateObj.setPreferedGender(e.target.value)} type="radio" id="preferedFemale" name="preferedGender" value="female"/>
                        <label for="preferedFemale">Female</label><br/>
                        <input onChange={e => stateObj.setPreferedGender(e.target.value)} type="radio" id="preferedNone" name="preferedGender" value="none"/>
                        <label for="preferedNone">None</label>
                        <p>Your prefered gender for the people you will match with</p><br/>

                        <label for="preferedSkill">Prefered Skill Level Currently: {stateObj.currentPreferedSkillLevel}</label><br/>
                        <select onChange={e => stateObj.setPreferedSkillLevel(e.target.value)} id = "preferedSkill">
                            <option value={"B"}>Begginer</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"E"}>Expert</option>
                        </select> 
                        <p>Your prefered skill level for the people you will match with</p><br/>

                        <label for="preferedMeet">Prefered Meeting Type Currently: {stateObj.currentMeetingPreference}</label><br/>
                        <select onChange={e => stateObj.setMeetingPreference(e.target.value)} id = "preferedMeet">
                            <option value={"Online"}>Online</option>
                            <option value={"Offline"}>Offline</option>
                        </select>
                        <p>Your prefrence for meeting online or offline</p><br/>

                        <input style={{position: "relative",left:"100px"}} type='submit' value="Update Settings"/>
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