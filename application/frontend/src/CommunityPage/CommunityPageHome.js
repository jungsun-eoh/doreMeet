import React, {useEffect} from 'react';
import '../App.css';
import './CommunityPage.css';
import axios from 'axios';
import Navbar from '../components/Navbar/NavbarHome';
import Highlights from '../components/Highlights/Highlights';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

const CommunityPageHome = (stateObj) => {

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
                  <p class="PostDescription">Post Description</p>
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
    formData.append('user', document.cookie);
    axios.post('/voteplus', formData);
    console.log("vote+ button test");
  };
  const voteminus = () => {
    const formData = new FormData();
    formData.append('comm_pg_id', document.getElementById("MinusButton").value);
    formData.append('user', document.cookie);
    axios.post('/voteminus', formData);
    console.log("vote- button test");
  };
    //Upon entering the page the most recent 5 posts are displayed
    //  useEffect(() => {
    //    axios.get('/recent5').then(response => {
    //     //  console.log(response.data[0]);
    //      let _html = "";
    //      _html += `<h1>Recent Posts</h1>`;
    //      response.data.forEach(post => {_html += `<div class="RecentPostsFormat">
    //                <img class="PostImage" src="assets/postImages/${post.post_file}" alt="Post Image">
    //                <h2 class="PostTitle">${post.post_title}</h2>
    //                <h3 class="PostCategory">${post.post_category}</h3>
    //                <p class="PostDescription">Post DescriptionPost DescriptionPost DescriptionPost DescriptionPost DescriptionPost DescriptionPost DescriptionPost 
    //                DescriptionPost Description</p>   
    //                </div>`;})
    //               //  <button id="PlusButton" type="button">+</button>
    //               //  <button id="MinusButton" type="button">-</button>      
    //      document.getElementById("recent-posts").innerHTML = _html;
    //      document.getElementById("search-post").innerHTML = '';
    //      document.getElementById("PlusButton").addEventListener("click", voteplus);
    //      document.getElementById("MinusButton").addEventListener("click", voteminus);
    //    }).catch(function (error) {
    //     //  console.log('fail')
    //    });
    //  });

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
              Check out our <a href="#highlight-section"> Highlights section </a> to see the most liked posts of the month.
              <br/>
              <br/>
              Log in or sign up to post a project to the community page!</p>.
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

export default CommunityPageHome;