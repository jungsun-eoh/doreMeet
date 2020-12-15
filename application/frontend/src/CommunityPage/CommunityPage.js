/*
**CSC 648 Team 02 DoReMeet
**File: CommunityPage.js
**Desc: Contains all the code needed for the community page. Calls on the backend through axios and
recieves json responses that it then displays accordingly on the page.
*/

import React, {useEffect} from 'react';
import '../App.css';
import './CommunityPage.css';
import axios from 'axios';
import Navbar from '../components/Navbar/Navbar';
import Highlights from '../components/Highlights/Highlights';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';


const CommunityPage = (stateObj) => {

  const onChange = e => {
    e.preventDefault();
    if (e.target.files[0].size > 10485760) {
      alert("File is too big, max file size is 10 MB.");
      e.target.value = '';
    }
    else {
      stateObj.setFile(e.target.files[0]);
      stateObj.setFileName(e.target.files[0].name);
    }
  };

  const getHighlights = e =>{
    axios.get('/highlights').then(response => {
      if(response.data.length > 0){
        response.data.forEach(highlight => {
          console.log(highlight);
        });
      }
    });
  }
  //Handles the posting of projects to the community page
  const postHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    stateObj.setPostFile(stateObj.file);
    formData.append('file', stateObj.file);
    formData.append('post_title', stateObj.postName);
    formData.append('post_category', stateObj.postCategory);
    formData.append('post_description', stateObj.postDescription);

    closePost();
    await axios.post('/makePost', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    window.location.reload();
  };
  //Sends the search terms to the backend and gets the response 
  const submitHandler = (event) => {
    event.preventDefault();
    alert("You are searching for " + stateObj.searchTitle + " " + stateObj.searchCategory);

    axios.get('/searchPost', { params: { post_title: stateObj.searchTitle, post_category: stateObj.searchCategory } }).then(response => {
      if(response.data.length > 0){
        //console.log(response.data.length);
        let _html = "";
        _html += `<h1>Search Results</h1>`
        _html += `<div class="RecentPostsFormat">
                  <img class="PostImage" src="assets/postImages/${response.data[0].post_file}" alt="Post Image"/>
                  <h2 class="PostTitle">${response.data[0].post_title}</h2>
                  <h3 class="PostCategory">${response.data[0].post_category}</h3>
                  <h4 class="PostVotes">${response.data[0].post_votes}</h4>
                  <p class="PostDescription">${response.data[0].post_description}</p>
                  <button id="PlusButton" value="${response.data[0].comm_pg_id}"  type="button">+</button>
                  <button id="MinusButton" value="${response.data[0].comm_pg_id}" type="button">-</button>
                  </div>`;
        document.getElementById("search-post").innerHTML = _html;
        document.getElementById("recent-posts").innerHTML = '';
        document.getElementById("PlusButton").addEventListener("click", voteplus);
        document.getElementById("MinusButton").addEventListener("click", voteminus);
      }else{
        let _html = "";
        _html += `<h1>Search Results</h1>`
        _html += `<div class="NoResult">
                  <p>Sorry, we couldn't find anything</p>
                  </div>`;
        document.getElementById("search-post").innerHTML = _html;
        document.getElementById("recent-posts").innerHTML = '';
      }

    }).catch(function (error) {
      stateObj.setResultTitle("Not Found");
      stateObj.setResultCategory("Not Found");
      stateObj.setResultFile("");
    });
  };

  const voteplus = () => {
    const formData = new FormData();
    formData.append('comm_pg_id', document.getElementById("PlusButton").value);
    axios.post('/voteplus', formData);
    console.log("vote+ button test");
  };
  const voteminus = () => {
    const formData = new FormData();
    formData.append('comm_pg_id', document.getElementById("MinusButton").value);
    axios.post('/voteminus', formData);
    console.log("vote- button test");
  };

  //Simply opens up the post box
  const openPost = () => {
    document.getElementById("postform").style.display = "block";
  }
  //Closes the post box
  const closePost = () => {
    document.getElementById("postform").style.display = "none";
  }
    //Upon entering the page the most recent 5 posts are displayed
     useEffect(() => {
       console.log("useEffect CommunityPage")
       axios.get('/recent5').then(response => {
         let _html = "";
         _html += `<h1>Recent Posts</h1>`;
         //button not passing the right id
         response.data.forEach(post => {
           if(post.post_description == null){post.post_description = ""};
           _html += `<div class="RecentPostsFormat">
                   <img class="PostImage" src="assets/postImages/${post.post_file}" alt="Post Image">
                   <h2 class="PostTitle">${post.post_title}</h2>
                   <h4 class="PostVotes">${post.post_votes}</h4>
                   <h3 class="PostCategory">${post.post_category}</h3>
                   <p class="PostDescription">${post.post_description}</p>   
                   </div>`;})
                  //  <button id="PlusButton" type="button">+</button>
                  //  <button id="MinusButton" type="button">-</button>
         document.getElementById("recent-posts").innerHTML = _html;
         document.getElementById("search-post").innerHTML = '';
         document.getElementById("PlusButton").addEventListener("click", voteplus);
         document.getElementById("MinusButton").addEventListener("click", voteminus);
       }).catch(function (error) {
        //  console.log('fail')
       });
     }, [stateObj.screenState]);

  return (
    <>
      <Router>
        <div className="App">
          <Navbar />
          <header className="App-header">
            <div class="description">
              <h2 align='center' top='30%'> Community Page </h2>
              <p style={{fontSize: 22, marginLeft: 40, marginRight: 40 }} align='center'>See how other people are using DoReMeet to bring their artistic dreams to life, or post some of your own amazing collaborations with fellow DoReMeet users 
              <br />
              <br />
              Check out our <a href="#highlight-section"> Highlights section </a> to see the most liked posts of the month.</p>
            </div>
            <div class="PageContainer">
              <div class="SearchContainer">
                {/*<input style={{ position: "center", width: '10%'}} type='button' value="highlight data in console" onClick={getHighlights} /><br />*/}
                <form class="search" onSubmit={submitHandler}>
                  <input class="searchBar" onChange={e => stateObj.setSearchTitle(e.target.value)} type="text" placeholder="Search" />
                  <select class="searchButtons" onChange={e => { stateObj.setSearchCategory(e.target.value); }}>
                    <option value={"Music"}>Music</option>
                    <option value={"Dance"}>Dance</option>
                    <option value={"Art"}>Art</option>
                    <option value={"Cinema"}>Cinema</option>
                    <option value={"Photography "}>Photography</option>
                  </select>
                  <input class="searchButtons" type='submit' />
                </form>
              </div>
              <div className="PostFormFormat">
                <label htmlFor="postbutton">Share your work with us here!</label>
                <button className="post" id="postbutton" onClick={openPost}>Post</button>
              </div>
              <div class="post-popup" id="postform">
                <form class="post-container" onSubmit={postHandler}>
                  <h2> Post your creative collaborations! </h2>
                  <input type="text" onChange={e => stateObj.setPostName(e.target.value)} placeholder="Name" required />
                  <textarea class="postDescription" maxLength={120} onChange={e => stateObj.setPostDescription(e.target.value)} placeholder="Description (optional)" />
                  <div>
                    <select onChange={e => { stateObj.setPostCategory(e.target.value); }}>
                     <option >Music</option>
                     <option >Dance</option>
                     <option >Art</option>
                     <option >Cinema</option>
                    <option >Photography</option>
                    </select>
                 </div>
                  <label htmlFor="post-file"> Select file: </label> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={onChange} required/>
                  <div>
                   <input type='submit' />
                 </div>
                  <div>
                   <button type= "button" onClick={closePost}>Close</button>
                  </div>
                </form>
             </div>
              <div class="RecentPosts" id="recent-posts">
                </div>
                <div class="SearchPost" id="search-post">
              </div>
              <p id="vote"></p>
              <div id='highlight-section' >
                <Highlights />
              </div>
            </div>
          </header>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default CommunityPage;