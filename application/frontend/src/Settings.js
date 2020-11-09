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
                        <label for="fname">First Name</label><br/>
                        <input className="settingsFields" type="text" id="fname"/><br/>
                        <label for="lname">Last Name</label><br/>
                        <input className="settingsFields" type="text" id="lname"/><br/>

                        <input type="radio" id="male" name="gender" value="male"/>
                        <label for="male">Male</label><br/>
                        <input type="radio" id="female" name="gender" value="female"/>
                        <label for="female">Female</label><br/>
                        <input type="radio" id="none" name="gender" value="none"/>
                        <label for="none">None</label><br/>

                        <label for="birthday">Date of Birth</label><br/>
                        <input className="settingsFields" type = "date" id="birthday"/><br/>

                        <label for="email">Email</label><br/>
                        <input className="settingsFields" type = "email" id = "email"/><br/>

                        <label for="phone">Phone Number</label><br/>
                        <input className="settingsFields" type = "tel" id = "phone" placeholder="123-456-789" pattern = "[0-9]{3}-[0-9]{3}-[0-9]{3}"/><br/>

                        <label for="art">Art Category</label><br/>
                        <select id = "art">
                            <option value={"Music"}>Music</option>
                            <option value={"Dance"}>Dance</option>
                            <option value={"Art"}>Art</option>
                        </select> <br/>

                        <label for="skill">Skill Level</label><br/>
                        <select id = "skill">
                            <option value={"B"}>Begginer</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"A"}>Advanced</option>
                        </select> <br/>

                        <label for = "username">Username</label><br/>
                        <input className="settingsFields" type = "text" id="username" /><br/>
                        <label for = "pwd">Password</label><br/>
                        <input className="settingsFields" type = "password" id="pwd"/><br/>

                        <label for = "minAge">Minimum Age (18+)</label><br/>
                        <input className="settingsFields" type="number" id="minAge" min="18"/><br/>
                        <label for = "maxAge">Maximum Age</label><br/>
                        <input className="settingsFields" type="number" id="maxAge" min="18"/><br/>

                        <input type="radio" id="preferedMale" name="preferedGender" value="male"/>
                        <label for="preferedMale">Male</label><br/>
                        <input type="radio" id="preferedFemale" name="preferedGender" value="female"/>
                        <label for="preferedFemale">Female</label><br/>
                        <input type="radio" id="preferedNone" name="preferedGender" value="none"/>
                        <label for="preferedNone">None</label><br/>

                        <label for="preferedSkill">Prefered Skill Level</label><br/>
                        <select id = "preferedSkill">
                            <option value={"B"}>Begginer</option>
                            <option value={"I"}>Intermediate</option>
                            <option value={"A"}>Advanced</option>
                        </select> <br/>

                        <label for="preferedMeet">Prefered Meeting Type</label><br/>
                        <select id = "preferedMeet">
                            <option value={"Online"}>Online</option>
                            <option value={"Offline"}>Offline</option>
                        </select><br/>

                        <input type='submit'/>
                    </form>
                </header>
            </div>
        <Footer />
        </Router>
        </>
    );

}

export default Settings;