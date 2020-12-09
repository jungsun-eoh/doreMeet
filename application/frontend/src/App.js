/*
**CSC 648 Team 02 DoReMeet
**File: App.js
**Desc: The main hub for all the frontend code, contains our stateObj and Router switch to
facilitate actions between pages.
*/
import React from 'react';
import './App.css';
import Home from './LandingPage/Home';
import Company from './LandingPage/Company';
import Pricing from './LandingPage/Pricing';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import CommunityPage from './CommunityPage/CommunityPage';
import MatchingPage from './Matches/MatchingPage';
import Chat from './Chat/Chat';
import Settings from './Account/Settings';
import Profile from './Account/Profile';
import Premium from './Account/Premium';
import FAQ from './FooterPages/faq';
import Terms from './FooterPages/Terms';
import Privacy from './FooterPages/Privacy';
import ContactUs from './FooterPages/ContactUs';
import Guidelines from './FooterPages/Guidelines';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';

function App() {

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [DOB, setDOB] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [artCategory, setArtCategory] = React.useState('');
  const [skillLevel, setSkillLevel] = React.useState('');

  // const [currentFirstName, setCurrentFirstName] = React.useState('');
  // const [currentLastName, setCurrentLastName] = React.useState('');
  // const [currentGender, setCurrentGender] = React.useState('');
  // const [currentDOB, setCurrentDOB] = React.useState('');
  // const [currentEmail, setCurrentEmail] = React.useState('');
  // const [currentPhoneNumber, setCurrentPhoneNumber] = React.useState('');
  // const [currentArtCategory, setCurrentArtCategory] = React.useState('');
  // const [currentSkillLevel, setCurrentSkillLevel] = React.useState('');

  const [userName, setUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');

  // const [currentUserName, setCurrentUserName] = React.useState('');
  // const [currentUserPassword, setCurrentUserPassword] = React.useState('');

  const [minimumAge, setMinimumAge] = React.useState('');
  const [maximumAge, setMaximumAge] = React.useState('');
  const [preferedGender, setPreferedGender] = React.useState('');
  const [preferedSkillLevel, setPreferedSkillLevel] = React.useState('');
  const [meetingPreference, setMeetingPreference] = React.useState('');

  // const [currentMinimumAge, setCurrentMinimumAge] = React.useState('');
  // const [currentMaximumAge, setCurrentMaximumAge] = React.useState('');
  // const [currentPreferedGender, setCurrentPreferedGender] = React.useState('');
  // const [currentPreferedSkill, setCurrentPreferedSkill] = React.useState('');
  // const [currentMeetingPrefernce, setCurrentMeetingPrefernce] = React.useState('');

  const [category, setCategory] = React.useState('Music');
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchCategory, setSearchCategory] = React.useState('Music');
  const [postName, setPostName] = React.useState('');
  const [postCategory, setPostCategory] = React.useState('Music');
  const [postFile, setPostFile] = React.useState('');
  const [screenState, setScreenState] = React.useState('Community');
  const [resultTitle, setResultTitle] = React.useState('');
  const [resultCategory, setResultCategory] = React.useState('');
  const [resultFile, setResultFile] = React.useState('');

  const [postID, setPostID] = React.useState('');

  const [file, setFile] = React.useState('');
  const [fileName, setFileName] = React.useState('');

  const [profilePic, setProfilePic] = React.useState('');
  const [profilePicPath, setProfilePicPath] = React.useState('');
  const [bio, setBio] = React.useState('Placeholder bio!');
  const [age, setAge] = React.useState('');

  //stateObj is our big hub object that will hold all the info for the users session
  const stateObj = {
    //user stuff
    firstName: firstName,
    setFirstName: setFirstName,
    lastName: lastName,
    setLastName: setLastName,
    gender: gender,
    setGender: setGender,
    DOB: DOB,
    setDOB: setDOB,
    email: email,
    setEmail: setEmail,
    phoneNumber: phoneNumber,
    setPhoneNumber: setPhoneNumber,
    artCategory: artCategory,
    setArtCategory: setArtCategory,
    skillLevel: skillLevel,
    setSkillLevel: setSkillLevel,

    bio: bio,
    setBio: setBio,
    profilePic: profilePic,
    setProfilePic: setProfilePic,
    profilePicPath: profilePicPath,
    setProfilePicPath: setProfilePicPath,

    age: age,
    setAge: setAge,

    //Settings page stuff for displaying current settings
    // currentFirstName: currentFirstName,
    // currentLastName: currentLastName,
    // currentGender: currentGender,
    // currentDOB: currentDOB,
    // currentEmail: currentEmail,
    // currentPhoneNumber: currentPhoneNumber,
    // currentArtCategory: currentArtCategory,
    // currentSkillLevel: currentSkillLevel,

    //account stuff
    userName: userName,
    setUserName: setUserName,
    userPassword: userPassword,
    setUserPassword: setUserPassword,
    newPassword: newPassword,
    setNewPassword: setNewPassword,

    //Settings page stuff for displaying current settings
    // currentUserName: currentUserName,
    // currentUserPassword: currentUserPassword,

    //preference stuff
    minimumAge: minimumAge,
    setMinimumAge: setMinimumAge,
    maximumAge: maximumAge,
    setMaximumAge: setMaximumAge,
    preferedGender: preferedGender,
    setPreferedGender: setPreferedGender,
    preferedSkillLevel: preferedSkillLevel,
    setPreferedSkillLevel: setPreferedSkillLevel,
    meetingPreference: meetingPreference,
    setMeetingPreference: setMeetingPreference,

    //Settings page stuff for displaying current settings
    // currentMinimumAge: currentMinimumAge,
    // currentMaximumAge: currentMaximumAge,
    // currentPreferedGender: currentPreferedGender,
    // currentPreferedSkill: currentPreferedSkill,
    // currentMeetingPrefernce: currentMeetingPrefernce,

    //community page stuff
    category: category,
    setCategory: setCategory,
    searchTitle: searchTitle,
    setSearchTitle: setSearchTitle,
    searchCategory: searchCategory,
    setSearchCategory: setSearchCategory,
    postName: postName,
    setPostName: setPostName,
    postCategory: postCategory,
    setPostCategory: setPostCategory,
    resultTitle: resultTitle,
    setResultTitle: setResultTitle,
    resultCategory: resultCategory,
    setResultCategory: setResultCategory,
    file: file,
    setFile: setFile,
    fileName: fileName,
    setFileName: setFileName,
    resultFile: resultFile,
    setResultFile: setResultFile,
    postFile: postFile,
    setPostFile: setPostFile,
    postID: postID,
    setPostID: setPostID,

    //screen stuff
    screenState: screenState,
    setScreenState: setScreenState
  }

  return(
    //Router will switch to the specified path based on the link or a tag that the user clicks on
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path='/FAQ' component={FAQ} />
        <Route path='/Guidelines' component={Guidelines} />
        <Route path='/Terms' component={Terms} />
        <Route path='/Privacy' component={Privacy} />
        <Route path='/Pricing' component={Pricing} />
        <Route path='/Company' component={Company} />
        <Route path='/ContactUs' component={ContactUs} />
        <Route path="/Settings" children={Settings(stateObj)}/>
        <Route path="/Community" children={CommunityPage(stateObj)}/>
        <Route path="/Match" children={MatchingPage(stateObj)}/>
        <Route path="/Chat" children={Chat(stateObj)}/>
        <Route path="/Profile" children={Profile(stateObj)}/>
        <Route path="/Premium" children={Premium(stateObj)}/>
      </Switch>
    </Router>
  );
}

export default App;
