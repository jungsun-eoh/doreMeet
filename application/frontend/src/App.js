import React from 'react';
import './App.css';
import CommunityPage from './CommunityPage'
function App() {

  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('Music');
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchCategory, setSearchCategory] = React.useState('');
  const [postName, setPostName] = React.useState('');
  const [postCategory, setPostCategory] = React.useState('Music');
  const [screenState, setScreenState] = React.useState('Community');


  const stateObj = {
    name: name,
    setName: setName,
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
    screenState: screenState,
    setScreenState: setScreenState
  }

  switch(screenState){
    case 'Community':
      return CommunityPage(stateObj);
  }
}

export default App;
