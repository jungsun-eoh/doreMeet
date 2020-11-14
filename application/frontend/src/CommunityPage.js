import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Highlights from './components/Highlights/Highlights';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';


const CommunityPage = (stateObj) => {


  const onChange = e => {
    e.preventDefault();
    stateObj.setFile(e.target.files[0]);
    stateObj.setFileName(e.target.files[0].name);

  };

  const postHandler = async e => {
    const formData = new FormData();
    stateObj.setPostFile(stateObj.file);
    formData.append('file', stateObj.file);
    formData.append('post_title', stateObj.postName);
    formData.append('post_category', stateObj.postCategory);

    const res = await axios.post('/makePost', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    const { fileName, filePath } = res.data;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    alert("You are searching for " + stateObj.searchTitle + " " + stateObj.searchCategory);

    axios.get('/searchPost', { params: { post_title: stateObj.searchTitle, post_category: stateObj.searchCategory } }).then(response => {
      stateObj.setResultTitle(response.data[0].post_title);
      stateObj.setResultCategory(response.data[0].post_category);
      stateObj.setResultFile(`/assets/postImages/${response.data[0].post_file}`);
    }).catch(function (error) {
      stateObj.setResultTitle("Not Found");
      stateObj.setResultCategory("Not Found");
      stateObj.setResultFile("");
    });
  };

  const openPost = () => {
    document.getElementById("postform").style.display = "block";
  }

  const closePost = () => {
    document.getElementById("postform").style.display = "none";
  }

  return (
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
              <input class="searchBar" onChange={e => stateObj.setSearchTitle(e.target.value)} type="text" placeholder="Search" />
              <select class="searchButtons" onChange={e => { stateObj.setSearchCategory(e.target.value); }}>
                <option value={"Music"}>Music</option>
                <option value={"Dance"}>Dance</option>
                <option value={"Art"}>Art</option>
              </select>
              <input class="searchButtons" type='submit' />
            </form>
            <div id="postbutton">
              <button class="post" onClick={openPost}>Post</button>
            </div>
            <div class="post-popup" id="postform">
              <form class="post-container" onSubmit={postHandler}>
                <h2>Post Something</h2>
                <input type="text" onChange={e => stateObj.setPostName(e.target.value)} placeholder="Name" required />
                <div>
                  <select onChange={e => { stateObj.setPostCategory(e.target.value); }}>
                    <option >Music</option>
                    <option >Dance</option>
                    <option >Art</option>
                  </select>
                </div>
                <label htmlFor="post-file">Select file: </label>
                {/* <input type="file" id="post-file" name="postFile"/> */}
                <input type='file' className='custom-file-input' id='customFile' onChange={onChange} />
                <div>
                  <input type='submit' />
                </div>
                <div>
                  <button onClick={closePost}>Close</button>
                </div>
              </form>
            </div>
            <div class="searches" id="display">
              <h1 >Searches</h1>
              <p>Title: {stateObj.resultTitle}</p>
              <p>Category: {stateObj.resultCategory}</p>
              {<img style={{ width: '100%' }} src={`${stateObj.resultFile}`} alt='' />}
            </div>
          </header>
          <Highlights />
        </div>
        <Footer />
      </Router>
    </>
  );
}
console.log("A")
export default CommunityPage;