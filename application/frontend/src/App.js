import React from 'react';
import './App.css';
import axios from 'axios';
import CommunityPage from './CommunityPage'
function App() {
  const [name, setName] = React.useState('');
    category: category,
    setCategory: setCategory,
    searchTitle: searchTitle,
    setSearchTitle: setSearchTitle,
    const [name, setName] = React.useState('');
    const [category, setCategory] = React.useState('Music');
    const [searchTitle, setSearchTitle] = React.useState('');
    const [searchCategory, setSearchCategory] = React.useState('');
    const [screenState, setScreenState] = React.useState('Start');

    const stateObj = {
      screenState: screenState,
      setScreenState: setScreenState,
      name: name,
      setName: setName,
      category: category,
      setCategory: setCategory,
      SearchTitle: searchTitle,
      setSetachTitle: setSearchTitle,
      setSearchCategory: setSearchCategory

  switch(screenState){
    case 'Start':
      return CommunityPage(stateObj);
    case 'Community':
      return CommunityPage(stateObj);
  }
}
export default App;
