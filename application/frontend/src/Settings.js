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
                        <label for="fname">First Name Currently: {stateObj.firstName}</label><br/>
                        <input className="settingsFields" type="text" id="fname"/><br/>
                        <label for="lname">Last Name Currently: {stateObj.LastName}</label><br/>
                        <input className="settingsFields" type="text" id="lname"/><br/>
                        <p>Your name will not be available for other users to view to protect your privacy</p><br/>

                        <h4>Gender Currently: {stateObj.gender}</h4>
                        <input type="radio" id="male" name="gender" value="male"/>
                        <label for="male">Male</label><br/>
                        <input type="radio" id="female" name="gender" value="female"/>
                        <label for="female">Female</label><br/>
                        <input type="radio" id="none" name="gender" value="none"/>
                        <label for="none">None</label><br/><br/>

                        <label for="birthday">Date of Birth Curently: {stateObj.DOB}</label><br/>
                        <input className="settingsFields" type = "date" id="birthday" max="2002-01-01"/>
                        <p>You must be 18 or older to use this site</p><br/>

                        <label for="email">Email Currently: {stateObj.email}</label>
                        <input className="settingsFields" type = "email" id = "email"/>
                        <p>Your email is not viewable for other users for your privacy</p><br/>

                        <label for="phone">Phone Number Currently: {stateObj.phone}</label><br/>
                        <input className="settingsFields" type = "tel" id = "phone" placeholder="123-456-789" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{3}"/>
                        <p>Required only for 2-factor identification</p><br/>

                        <label for="art">Art Category Currently: {stateObj.artCategory}</label><br/>
                        <select id = "art">
                            <option value={"Music"}>Music</option>
                            <option value={"Dance"}>Dance</option>
                            <option value={"Art"}>Art</option>
                        </select> <br/>
                        <p>When switching categories make sure to update your skill level and content</p><br/>

                        <label for="skill">Skill Level Currently: {stateObj.skillLevel}</label><br/>
                        <select id = "skill">
                            <option value={"B"}>Begginer</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"A"}>Advanced</option>
                        </select> 
                        <p>Generally begginers have less than 5 years of experience and advanced has more than 7</p><br/>

                        <label for = "username">Username Currently: {stateObj.username}</label><br/>
                        <input className="settingsFields" type = "text" id="username" /><br/>
                        <label for = "pwd">Password</label><br/>
                        <input className="settingsFields" type = "password" id="pwd"/><br/>
                        <p></p><br/>

                        <label for = "minAge">Minimum Age (18+) Currently: {stateObj.minimumAge}</label><br/>
                        <input className="settingsFields" type="number" id="minAge" min="18"/><br/>
                        <p>The minimum age of people you will match with</p>
                        <label for = "maxAge">Maximum Age Currently: {stateObj.maximumAge}</label><br/>
                        <input className="settingsFields" type="number" id="maxAge" min="18"/><br/>
                        <p>The maximum age of people you will match with</p><br/>

                        <h4>Prefered Match Gender</h4>
                        <input type="radio" id="preferedMale" name="preferedGender" value="male"/>
                        <label for="preferedMale">Male</label><br/>
                        <input type="radio" id="preferedFemale" name="preferedGender" value="female"/>
                        <label for="preferedFemale">Female</label><br/>
                        <input type="radio" id="preferedNone" name="preferedGender" value="none"/>
                        <label for="preferedNone">None</label>
                        <p>Your prefered gender for the people you will match with</p><br/>

                        <label for="preferedSkill">Prefered Skill Level</label><br/>
                        <select id = "preferedSkill">
                            <option value={"B"}>Begginer</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"A"}>Advanced</option>
                        </select> 
                        <p>Your prefered skill level for the people you will match with</p><br/>

                        <label for="preferedMeet">Prefered Meeting Type</label><br/>
                        <select id = "preferedMeet">
                            <option value={"Online"}>Online</option>
                            <option value={"Offline"}>Offline</option>
                        </select>
                        <p>Your prefrence for meeting online or offline</p><br/>

                        <input type='submit' value="Update Settings"/>
                        <br/>
                    </form>
                </header>
            </div>
        <Footer />
        </Router>
        </>
    );

}

export default Settings;