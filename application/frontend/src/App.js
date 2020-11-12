import React from 'react';
import './App.css';
import Home from './Home';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import CommunityPage from './CommunityPage';
import Settings from './Settings';
import MatchingPage from './MatchingPage';
import {Route, BrowserRouter as Router, Switch, Link} from 'react-router-dom';
function App() {


  //Works for Home Page, Auth Pages
  // return (
  //   <>
  //   <BrowserRouter>
  //   <Navbar />
  //     <Switch>
  //       <Route path='/' exact component={Home}/>
  //       <Route path='/login' component={LogIn} />
  //       <Route path='/signup' component={SignUp} />
  //     </Switch>
  //   </BrowserRouter>
  //   </>
  // );

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [DOB, setDOB] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [artCategory, setArtCategory] = React.useState('');
  const [skillLevel, setSkillLevel] = React.useState('');

  const [currentFirstName, setCurrentFirstName] = React.useState('');
  const [currentLastName, setCurrentLastName] = React.useState('');
  const [currentGender, setCurrentGender] = React.useState('');
  const [currentDOB, setCurrentDOB] = React.useState('');
  const [currentEmail, setCurrentEmail] = React.useState('');
  const [currentPhoneNumber, setCurrentPhoneNumber] = React.useState('');
  const [currentArtCategory, setCurrentArtCategory] = React.useState('');
  const [currentSkillLevel, setCurrentSkillLevel] = React.useState('');

  const [userName, setUserName] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');

  const [currentUserName, setCurrentUserName] = React.useState('');
  const [currentUserPassword, setCurrentUserPassword] = React.useState('');

  const [minimumAge, setMinimumAge] = React.useState('');
  const [maximumAge, setMaximumAge] = React.useState('');
  const [preferedGender, setPreferedGender] = React.useState('');
  const [preferedSkill, setPreferedSkill] = React.useState('');
  const [meetingPreference, setMeetingPreference] = React.useState('');

  const [currentMinimumAge, setCurrentMinimumAge] = React.useState('');
  const [currentMaximumAge, setCurrentMaximumAge] = React.useState('');
  const [currentPreferedGender, setCurrentPreferedGender] = React.useState('');
  const [currentPreferedSkill, setCurrentPreferedSkill] = React.useState('');
  const [currentMeetingPrefernce, setCurrentMeetingPrefernce] = React.useState('');

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

  const [file, setFile] = React.useState('');
  const [fileName, setFileName] = React.useState('');

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

    currentFirstName: currentFirstName,
    currentLastName: currentLastName,
    currentGender: currentGender,
    currentDOB: currentDOB,
    currentEmail: currentEmail,
    currentPhoneNumber: currentPhoneNumber,
    currentArtCategory: currentArtCategory,
    currentSkillLevel: currentSkillLevel,

    //account stuff
    userName: userName,
    setUserName: setUserName,
    userPassword: userPassword,
    setUserPassword: setUserPassword,

    currentUserName: currentUserName,
    currentUserPassword: currentUserPassword,

    //preference stuff
    minimumAge: minimumAge,
    setMinimumAge: setMinimumAge,
    maximumAge: maximumAge,
    setMaximumAge: setMaximumAge,
    preferedGender: preferedGender,
    setPreferedGender: setPreferedGender,
    preferedSkill: preferedSkill,
    setPreferedSkill: setPreferedSkill,
    meetingPreference: meetingPreference,
    setMeetingPreference: setMeetingPreference,

    currentMinimumAge: currentMinimumAge,
    currentMaximumAge: currentMaximumAge,
    currentPreferedGender: currentPreferedGender,
    currentPreferedSkill: currentPreferedSkill,
    currentMeetingPrefernce: currentMeetingPrefernce,

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

    //screen stuff
    screenState: screenState,
    setScreenState: setScreenState
  }

  return(
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={LogIn} />
        <Route path='/signup' component={SignUp} />
        <Route path="/Settings" children={Settings(stateObj)}/>
        <Route path="/Community" children={CommunityPage(stateObj)}/>
        <Route path="/Match" children={MatchingPage(stateObj)}/>
      </Switch>
    </Router>
  );

  // switch(screenState){
  //   case 'Community':
  //     return CommunityPage(stateObj);
  //   case 'Settings':
  //     return Settings(stateObj);
  //   case 'Match':
  //     return MatchingPage(stateObj);
  // }
}

export default App;
