import React from 'react';
import './App.css';

function App() {

  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('Music');

  const stateObj = {
    name: name,
    setName: setName,
    category: category,
    setCategory: setCategory
  }

  const submitHandler = (event) => {
    event.preventDefault();
    alert("You are searching for " +stateObj.name +" "+ stateObj.category );
  }

  const openPost = () => {
    document.getElementById("postform").style.display = "block";
  }

  const closePost = () => {
    document.getElementById("postform").style.display = "none";
  }

  const HomePage = (stateObj) => {
    return(
      <div className="App">
        <header className="App-header">
          <div className="navbar">
            <l class="active">Home</l>
            <l>About</l>
            <l>Contact</l>
            <l>Settings</l>
            <r>Logout</r>
          </div>
          <form class="search" onSubmit={submitHandler}>
            <input value={stateObj.name} onChange={e => stateObj.setName(e.target.value)} type="text" placeholder="Search"/>
            <select>
                <option value={stateObj.category} onChange={e => stateObj.setCategory(e.target.value)}>Music</option>
                <option value={stateObj.category} onChange={e => stateObj.setCategory(e.target.value)}>Dance</option>
                <option value={stateObj.category} onChange={e => stateObj.setCategory(e.target.value)}>Art</option>
            </select>
            <input type='submit'/>
          </form>
          <div id="postbutton">
            <button class="post" onClick={openPost}>Post</button>
          </div>
          <div class="post-popup" id="postform">
            <form class="post-container" action="/submit" method="closePost">
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
        </header>
      </div>
    );
  }

  return HomePage(stateObj);
}

export default App;
