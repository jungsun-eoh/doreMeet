import React from 'react';
import './App.css';
import Navbar from './Navbar/Navbar';
import axios from 'axios';
function App() {


  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('Music');
  const [searchTitle, setSearchTitle] = React.useState('');
  const [searchCategory, setSearchCategory] = React.useState('');

  const stateObj = {
    name: name,
    setName: setName,
    category: category,
    setCategory: setCategory,
    searchTitle: searchTitle,
    setSearchTitle: setSearchTitle,
    searchCategory: searchCategory,
    setSearchCategory: setSearchCategory

  }

  const postHandler = () => {
    axios.post('/makePost', {params: { username: 'A', password:'B'}}).then(response => {console.log('fail')});
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
      <div className="App">
        <Navbar />
        <header className="App-header">
          {/* <div className="navbar">
            <l class="active">Home</l>
            <l>About</l>
            <l>Contact</l>
            <l>Settings</l>
            <r>Logout</r>
          </div> */}
          <h2 align='center' top='30%'> Some Text goes here </h2>
          <form class="search" onSubmit={submitHandler}>
            <input value={stateObj.name} onChange={e => stateObj.setName(e.target.value)} type="text" placeholder="Search"/>
            <select onChange={e => {stateObj.setCategory(e.target.value);}}>
              <option value={"Music"}>Music</option>
              <option value={"Dance"}>Dance</option>
              <option value={"Art"}>Art</option>
            </select>
            <input type='submit'/>
          </form>
          <div id="postbutton">
            <button class="post" onClick={openPost}>Post</button>
          </div>
          <div class="post-popup" id="postform">
            <form class="post-container" onSubmit={postHandler}>
              <h2>Post Something</h2>
              <input type="text" placeholder="Name" required/>
              <div>
              <select>
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
      </div>
    );
  }

  return HomePage(stateObj);
}

export default App;
