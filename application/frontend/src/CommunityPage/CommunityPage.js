/*
**CSC 648 Team 02 DoReMeet
**File: CommunityPage.js
**Desc: Contains all the code needed for the community page. Calls on the backend through axios and
recieves json responses that it then displays accordingly on the page.
*/

import React, {useEffect, useState} from 'react';
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
    stateObj.setFile(e.target.files[0]);
    stateObj.setFileName(e.target.files[0].name);

  };
  //Handles the posting of projects to the community page
  const postHandler = async e => {
    e.preventDefault();
    const formData = new FormData();
    stateObj.setPostFile(stateObj.file);
    formData.append('file', stateObj.file);
    formData.append('post_title', stateObj.postName);
    formData.append('post_category', stateObj.postCategory);
    closePost();
    await axios.post('/makePost', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  };
  //Sends the search terms to the backend and gets the response 
  const submitHandler = (event) => {
    event.preventDefault();
    alert("You are searching for " + stateObj.searchTitle + " " + stateObj.searchCategory);

    axios.get('/searchPost', { params: { post_title: stateObj.searchTitle, post_category: stateObj.searchCategory } }).then(response => {
      if(response.data.length > 0){
        console.log(response.data.length);
        let _html = "";
        _html += `<h1>Search Results</h1>`
        _html += `<div class="RecentPostsFormat">
                  <img class="PostImage" src="assets/postImages/${response.data[0].post_file}" alt="Post Image"/>
                  <h2 class="PostTitle">${response.data[0].post_title}</h2>
                  <h3 class="PostCategory">${response.data[0].post_category}</h3>
                  <p class="PostDescription">Post Description</p>
                  </div>`;
        document.getElementById("recent-posts").innerHTML = _html;
      }else{
        let _html = "";
        _html += `<h1>Search Results</h1>`
        _html += `<div class="NoResult">
                  <p>Sorry, we couldn't find anything</p>
                  </div>`;
        document.getElementById("recent-posts").innerHTML = _html;
      }

    }).catch(function (error) {
      stateObj.setResultTitle("Not Found");
      stateObj.setResultCategory("Not Found");
      stateObj.setResultFile("");
    });
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
       axios.get('/recent5').then(response => {
         console.log(response.data[0]);
         let _html = "";
         _html += `<h1>Recent Posts</h1>`;
         response.data.forEach(post => {_html += `<div class="RecentPostsFormat">
                   <img class="PostImage" src="assets/postImages/${post.post_file}" alt="Post Image">
                   <h2 class="PostTitle">${post.post_title}</h2>
                   <h3 class="PostCategory">${post.post_category}</h3>
                   <p class="PostDescription">Post DescriptionPost DescriptionPost DescriptionPost DescriptionPost DescriptionPost DescriptionPost DescriptionPost 
                   DescriptionPost Description</p>                   
                   </div>`;})
         document.getElementById("recent-posts").innerHTML = _html;
       }).catch(function (error) {
         console.log('fail')
       });
     });

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
                <form class="search" onSubmit={submitHandler}>
                  <input class="searchBar" onChange={e => stateObj.setSearchTitle(e.target.value)} type="text" placeholder="Search" />
                  <select class="searchButtons" onChange={e => { stateObj.setSearchCategory(e.target.value); }}>
                    <option value={"Music"}>Music</option>
                    <option value={"Dance"}>Dance</option>
                    <option value={"Art"}>Art</option>
                    <option value={"Cinema"}>Cinema</option>
                    <option value={"Photography "}>Photography</option>
                    {/* <option value={"M"}>Music</option>
                    <option value={"D"}>Dance</option>
                    <option value={"A"}>Art</option>
                    <option value={"C"}>Cinema</option>
                    <option value={"P"}>Photography</option> */}
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
                  <input type='file' className='custom-file-input' id='customFile' onChange={onChange} />
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