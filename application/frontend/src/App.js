import React from 'react';
import './App.css';
import Navbar from './LandingPage/components/Navbar/Navbar';
import Highlights from './LandingPage/components/Highlights/Highlights';
import Footer from './LandingPage/components/Footer/Footer';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
function App() {

  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('Music');
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchCategory, setSearchCategory] = React.useState('');
  const [postName, setPostName] = React.useState('');
  const [postCategory, setPostCategory] = React.useState('Music');


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
    setPostCategory: setPostCategory

  }

  const postHandler = () => {
    console.log(stateObj.postName);

    axios.post('/makePost', { post_title: stateObj.postName, post_category: stateObj.postCategory}).then(response => {console.log('fail')});

  }

  const submitHandler = (event) => {
    event.preventDefault();
    alert("You are searching for " +stateObj.name +" "+ stateObj.category );
    axios.get('/searchPost', {params: { post_title: stateObj.name, post_category: stateObj.category}}).then(response => {    

      stateObj.setSearchTitle(response.data[0].post_title);
      stateObj.setSearchCategory(response.data[0].post_category);




    }).catch(function (error) {
      stateObj.setSearchTitle("Not Found");
      stateObj.setSearchCategory("Not Found");
    });  
    
  }

  const openPost = () => {
    document.getElementById("postform").style.display = "block";
  }

  const closePost = () => {
    document.getElementById("postform").style.display = "none";
  }

  /*
  <option value={stateObj.category} onChange={e => stateObj.setCategory(e.target.value)}>Music</option>
  <option value={stateObj.category} onChange={e => stateObj.setCategory(e.target.value)}>Dance</option>
  <option value={stateObj.category} onChange={e => stateObj.setCategory(e.target.value)}>Art</option>
   */
  const HomePage = (stateObj) => {
    return(
      <>
      <Router>
      <div className="App">
        <Navbar />
        <header className="App-header">
          <div class="description">
          <h2 align='center' top='30%'> Community Page </h2>
          <h4 align='center'>Check out the works of others or post your own work for the world to see!</h4>
          </div>
          <form class="search" onSubmit={submitHandler}>
            <input class="searchBar" value={stateObj.name} onChange={e => stateObj.setName(e.target.value)} type="text" placeholder="Search"/>
            <select class="searchButtons" onChange={e => {stateObj.setCategory(e.target.value);}}>
              <option value={"Music"}>Music</option>
              <option value={"Dance"}>Dance</option>
              <option value={"Art"}>Art</option>
            </select>
            <input class="searchButtons" type='submit'/>
          </form>
          <div id="postbutton">
            <button class="post" onClick={openPost}>Post</button>
          </div>
          <div class="post-popup" id="postform">
          <form class="post-container" onSubmit={postHandler}>
              <h2>Post Something</h2>
              <input type="text" onChange={e => stateObj.setPostName(e.target.value)} placeholder="Name" required/>
              <div>
              <select onChange={e => {stateObj.setPostCategory(e.target.value);}}>
                <option >Music</option>
                <option >Dance</option>
                <option >Art</option>
            </select>
            </div>
            <div>
            <input type='submit'/>
            </div>
            <div>
            <button onClick={closePost}>Close</button>
            </div>
            </form>
          </div>
          <div class="searches" id="display">
              <h1 >Searches</h1>
              <p>Title: {stateObj.searchTitle}</p>
              <p>Category: {stateObj.searchCategory}</p>
            </div>
        </header>
        <Highlights />
      </div>
      <Footer />
      </Router>
      </>
    );
  }

  return HomePage(stateObj);
}

export default App;
