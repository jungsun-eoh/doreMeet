/*
**CSC 648 Team 02 DoReMeet
**File: Profile.js
**Desc: Displays the profile of the user that is currently logged in. Accessed through the logged in navbar.
*/

import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HighlightItem from './components/Highlights/HighlightItem';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

const Profile = (stateObj) => {
    const upload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', stateObj.file);
        await axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            stateObj.setResultFile(`/assets/users/1/${response.data[0].post_file}`);
        });
    }
    const onChange = (e) => {
        e.preventDefault();
        stateObj.setFile(e.target.files[0]);
        stateObj.setFileName(e.target.files[0].name);
    };


    return (
        <Router>
            <Navbar />
            <header className="App-header">
                <div className="description">
                    <h1>Your Profile!</h1>
                </div>
                <input style={{position: "center", width: '10%', marginLeft:'auto', marginRight: 20, marginTop:10}} type='button' value="Edit Profile" /><br/>
                <div className="profileContainer">
                    <div className="profileChildImg">
                        <img className="profileImage" src={`${stateObj.file}`} />
                        {/* <form class="post-container" onSubmit={() => upload}>
                            <input type='file' className='custom-file-input' id='customFile' onChange={() => onChange} />
                            <label className='custom-file-label' htmlFor='customFile'></label>
                            <input type='submit' value='Upload' />
                        </form> */}
                    </div>
                    <div className="profileChildInfo">
                        <h2 style={{ display: "inline-block", marginBottom: "5px" }}> Name </h2>
                        <p>Age: Placeholder age</p>
                        <p>D/O/B: Placeholder DOB</p>
                        <p style={{ color: "#656c75" }}>Location: Placeholder Location (Hidden)</p>
                        <p>Art Category: Placeholder Category</p><br />
                        <img style={{ height: "100px", position: 'relative' }} src="/assets/spotifylogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px" ,position: 'relative'}} src="/assets/twitterlogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/youtubelogo.png"></img>
                    </div>
                    <br /><br />

                    <div style={{display: "inline-block", display: 'column', float: 'left', paddingLeft:50 }}>
                        <h3><u>Tags:</u></h3>
                        <br />
                        <button style={{ backgroundColor: "rgb(219, 250, 246)" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "rgb(219, 250, 246)" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "rgb(219, 250, 246)" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "rgb(219, 250, 246)" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "rgb(219, 250, 246)" }}>Placeholder Tag</button>
                        <br /><br />


                        <h3><u>Bio:</u></h3>
                        <p style={{marginRight:80}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit posuere tempor. Sed non ligula sed mauris 
                            elementum mattis nec facilisis ante. Nulla ornare laoreet laoreet. Maecenas diam leo, sodales tristique varius vel, 
                            tincidunt ultricies nulla. Phasellus rhoncus, turpis sed molestie euismod, lacus nunc mattis lorem, non mollis nulla 
                            mauris ut erat. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                            <br /><br />
                    </div>
                    

                    <div style={{display: "inline-block"}}>
                        <h3 style={{paddingLeft:50 }}><u>Media:</u></h3>
                        <div style={{paddingLeft:50}}>
                        <img style={{ height: "160px", margin: "15px 5px 0 5px"}} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "160px", margin: "15px 5px 0 5px"}} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "160px", margin: "15px 5px 0 5px"}} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "160px", margin: "15px 5px 0 5px"}} src='assets/placeholder-img.jpg' />
                        </div>
                        <small style={{paddingLeft:50}}><a href="#">Load More</a></ small>
                        <br /><br />
                    </div>

                    <div>
                        <h3 style={{display: "inline-block", paddingLeft:50 }}> <u>Your Community Posts:</u></h3>
                        {/* <div style={{paddingLeft:50}}>
                        <img style={{ height: "320px", marginLeft: "20px" }} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "320px", marginLeft: "80px" }} src='assets/placeholder-img.jpg' />
                        <h2 style={{ marginLeft: "170px", marginRight: "150px", display: "inline-block" }}> Post Title</h2>
                        <h2 style={{ marginLeft: "220px", display: "inline-block" }}> Post Title</h2></div> */}
                        <div className='yourpost_container'>
                            <div className='cards_wrapper'>
                                <ul className='cards_items'>
                                 <HighlightItem
                                src='assets/placeholder-img.jpg'
                                text='Acoustic Cover'
                                label='Music'
                                path='/'
                                />
                                <HighlightItem
                                src='assets/placeholder-img.jpg'
                                text='Piano Cover'
                                label='Music'
                                path='/'
                                />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <br />
            <Footer />
        </Router>
    );
}


export default Profile;