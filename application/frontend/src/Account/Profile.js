/*
**CSC 648 Team 02 DoReMeet
**File: Profile.js
**Desc: Displays the profile of the user that is currently logged in. Accessed through the logged in navbar. 
Users can edit parts of their Profile like media, bio, tags, and linked social media accounts.
*/

import React, { Component } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import HighlightItem from '../components/Highlights/HighlightItem';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
var test = '';
const Profile = (stateObj) => {

    const getAge = (event) => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        var userYear = test.substring(0, 4);
        var userMonth = test.substring(5, 7);
        var userDay = test.substring(8, 10);

        var today = year + "-" + month + "-" + day;
        var userAge = (year - userYear - 1);
        console.log(today);
        console.log(test);
        if (month - userMonth > 0) {
            userAge += 1;
            console.log("+1 monnth?")
        } else if (month - userMonth == 0) {
            if (day - userDay >= 0) {
                userAge += 1;
                console.log("+1 day?")
            }
        }
        console.log(userAge);
        stateObj.setAge(userAge);
    }

    const getProfile = async (event) => {
        event.preventDefault();

        await axios.get('/getUsers').then(response => {
            console.log(response.data[0]);
            //2020-12-01
            response.data[0].date_of_birth = response.data[0].date_of_birth.substring(0, 10);
            test = response.data[0].date_of_birth.substring(0, 10);
            stateObj.setDOB(response.data[0].date_of_birth);
            axios.get('/').then(response => {
                getAge();
            });
            stateObj.setFirstName(response.data[0].first_name);
            stateObj.setLastName(response.data[0].last_name);
            stateObj.setGender(response.data[0].gender);
            stateObj.setDOB(response.data[0].date_of_birth);
            stateObj.setEmail(response.data[0].email);
            stateObj.setPhoneNumber(response.data[0].phone_number);
            stateObj.setArtCategory(response.data[0].art_category);
            stateObj.setSkillLevel(response.data[0].skill_lvl);
            stateObj.setUserName(response.data[0].username);

        }).catch(function (error) {
            console.log(error);
            console.log("Not Found");
        })
        await axios.get('/getProfile', ).then(response => {
            console.log(response.data[0]);
            stateObj.setProfilePic(response.data[0].profile_pic);
            stateObj.setProfilePicPath(response.data[0].picture_path);
            stateObj.setBio(response.data[0].bio);
        }).catch(function (error) {
            console.log(error);
            console.log("Not Found");
        })
    }
    const upload = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', stateObj.file);
        formData.append('type', 'profile');
        await axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data[0]);
            stateObj.setFile(`${response.data[0].picture_path} + ${response.data[0].post_file}`);
        });
    }
    const onChange = (e) => {
        e.preventDefault();
        if (e.target.files[0].size > 10485760) {
            alert("File is too big, max file size is 10 MB.");
            e.target.value = '';
        }
        else {
            stateObj.setFile(e.target.files[0]);
            stateObj.setFileName(e.target.files[0].name);
        }
        console.log(e.target.files[0]);
        console.log(e.target.files[0].name);
    };

    const openPost = () => {
        document.getElementById("postform").style.display = "block";
    }

    const closePost = () => {
        document.getElementById("postform").style.display = "none";
    }

    //Stuff for media file 1
    const uploadMedia1 = async e => {
        e.preventDefault();
    }

    const changeMedia1 = (e) => {
    }

    const openMedia1 = () => {
        document.getElementById("media1").style.display = "block";
    }

    const closeMedia1 = () => {
        document.getElementById("media1").style.display = "none";
    }

    //stuff for media file 2
    const uploadMedia2 = async e => {
        e.preventDefault();
    }

    const changeMedia2 = (e) => {
    }

    const openMedia2 = () => {
        document.getElementById("media2").style.display = "block";
    }

    const closeMedia2 = () => {
        document.getElementById("media2").style.display = "none";
    }

    //Stuff for media file 3
    const uploadMedia3 = async e => {
        e.preventDefault();
    }

    const changeMedia3 = (e) => {
    }

    const openMedia3 = () => {
        document.getElementById("media3").style.display = "block";
    }

    const closeMedia3 = () => {
        document.getElementById("media3").style.display = "none";
    }

    //Stuff for media file 4
    const uploadMedia4 = async e => {
        e.preventDefault();
    }

    const changeMedia4 = (e) => {
    }

    const openMedia4 = () => {
        document.getElementById("media4").style.display = "block";
    }

    const closeMedia4 = () => {
        document.getElementById("media4").style.display = "none";
    }

    //Add Spotify Link
    const setSpotifyLink = async e => {
        e.preventDefault();
    }

    const openSpotifyLinkForm = () => {
        document.getElementById("spotifyLinkForm").style.display = "block";
    }

    const closeSpotifyLinkForm = () => {
        document.getElementById("spotifyLinkForm").style.display = "none";
    }

    //Add Twitter Link
    const setTwitterLink = async e => {
        e.preventDefault();
    }

    const openTwitterLinkForm = () => {
        document.getElementById("twitterLinkForm").style.display = "block";
    }

    const closeTwitterLinkForm = () => {
        document.getElementById("twitterLinkForm").style.display = "none";
    }

    //Add Youtube Link
    const setYoutubeLink = async e => {
        e.preventDefault();
    }

    const openYoutubeLinkForm = () => {
        document.getElementById("youtubeLinkForm").style.display = "block";
    }

    const closeYoutubeLinkForm = () => {
        document.getElementById("youtubeLinkForm").style.display = "none";
    }

    //Add Instagram Link
    const setInstagramLink = async e => {
        e.preventDefault();
    }

    const openInstagramLinkForm = () => {
        document.getElementById("instagramLinkForm").style.display = "block";
    }

    const closeInstagramLinkForm = () => {
        document.getElementById("instagramLinkForm").style.display = "none";
    }

    return (
        <Router>
            <Navbar />
            <header className="App-header">
                <div className="description">
                    <h1>Your Profile!</h1>
                </div>
                <div style={{right: "65%"}} class="post-popup" id="postform">
                    <form class="post-container" onSubmit={upload}>
                                <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={onChange} />
                                <label className='custom-file-label' htmlFor='customFile'></label>
                                <input type='submit' value='Upload' /><br/>
                                <button onClick={closePost}>Close</button>
                    </form>
                </div>
                
                <div style={{right: "65%"}} class="post-popup" id="media1">
                        <form class="post-container" onSubmit={uploadMedia1}>
                            <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={changeMedia1} />
                            <label className='custom-file-label' htmlFor='customFile'></label>
                            <input type='submit' value='Upload' /><br/>
                            <button onClick={closeMedia1}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "47%"}} class="post-popup" id="media2">
                        <form class="post-container" onSubmit={uploadMedia2}>
                            <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={changeMedia2} />
                            <label className='custom-file-label' htmlFor='customFile'></label>
                            <input type='submit' value='Upload' /><br/>
                            <button onClick={closeMedia2}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "30%"}} class="post-popup" id="media3">
                        <form class="post-container" onSubmit={uploadMedia3}>
                            <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={changeMedia3} />
                            <label className='custom-file-label' htmlFor='customFile'></label>
                            <input type='submit' value='Upload' /><br/>
                            <button onClick={closeMedia3}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "15%"}} class="post-popup" id="media4">
                        <form class="post-container" onSubmit={uploadMedia4}>
                            <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={changeMedia4} />
                            <label className='custom-file-label' htmlFor='customFile'></label>
                            <input type='submit' value='Upload' /><br/>
                            <button onClick={closeMedia4}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "35%"}} className="post-popup" id="spotifyLinkForm">
                        <form className="post-container" onSubmit={setSpotifyLink}>
                            <label htmlFor='spotifyLink'>Spotify Link:</label>
                            <input type='text' id='spotifyLink' placeholder='Input your Spotify link here'/>
                            <input type='submit' value='Submit'/><br/>
                            <button onClick={closeSpotifyLinkForm}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "27%"}} class="post-popup" id="twitterLinkForm">
                        <form class="post-container" onSubmit={setTwitterLink}>
                            <label for='twitterLink'>Twitter Link:</label>
                            <input type='text' id='twitterLink' placeholder='Input your Twitter link here'/>
                            <input type='submit' value='Submit'/><br/>
                            <button onClick={closeTwitterLinkForm}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "15%"}} className="post-popup" id="youtubeLinkForm">
                        <form className="post-container" onSubmit={setYoutubeLink}>
                            <label htmlFor='youtubeLink'>Youtube Link:</label>
                            <input type='text' id='youtubeLink' placeholder='Input your Youtube link here'/>
                            <input type='submit' value='Submit'/><br/>
                            <button onClick={closeYoutubeLinkForm}>Close</button>
                        </form>
                    </div>

                    <div style={{right: "5%"}} className="post-popup" id="instagramLinkForm">
                        <form className="post-container" onSubmit={setInstagramLink}>
                            <label htmlFor='instagramLink'>Instagram Link:</label>
                            <input type='text' id='instagramLink' placeholder='Input your Instagram link here'/>
                            <input type='submit' value='Submit'/><br/>
                            <button onClick={closeInstagramLinkForm}>Close</button>
                        </form>
                    </div>
                
                <input style={{ position: "center", width: '10%', marginLeft: 'auto', marginRight: 20, marginTop: 10 }} type='button' value="show Profile" onClick={getProfile} /><br />
                
                
                <div className="profileContainer">
                    <div className="profileChildImg">
                        <img onClick={openPost} style={{cursor: "pointer"}}className="profileImage" src={`${stateObj.profilePicPath+stateObj.profilePic}`} />
                        <div onClick={openPost} className="editPic"><i class="fas fa-camera"></i>Edit</div>
                    </div>
                    <div className="profileChildInfo">
                        <h2 style={{ display: "inline-block", marginBottom: "5px" }}> Name {stateObj.firstName + " " + stateObj.lastName}</h2>
                        <p>Age: {stateObj.age}</p>
                        <p>Gender: {stateObj.gender}</p>
                        <p style={{ color: "#656c75" }}>Location: Placeholder Location (Hidden)</p>
                        <p>Art Category: {stateObj.artCategory}</p><br />
                        <img onClick={openSpotifyLinkForm} style={{ height: "100px", position: 'relative' }} src="/assets/spotifylogo.png"></img>
                        <img onClick={openTwitterLinkForm} style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/twitterlogo.png"></img>
                        <img onClick={openYoutubeLinkForm} style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/youtubelogo.png"></img>
                        <img onClick={openInstagramLinkForm} style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/instagramlogo.png"></img>
                    </div>
                    <br /><br />

                    <div style={{ display: "inline-block", float: 'left', paddingLeft: 50 }}>
                        <h3><u>Tags:</u></h3>
                        <br />
                        <input style={{width:"200px", marginRight: "20px"}} className="tagInput" type="text" placeholder={stateObj.firstName}></input>
                        <input style={{width:"200px", marginRight: "20px"}} className="tagInput" type="text" placeholder={stateObj.firstName}></input>
                        <input style={{width:"200px", marginRight: "20px"}} className="tagInput" type="text" placeholder={stateObj.firstName}></input>
                        <input style={{width:"200px", marginRight: "20px"}} className="tagInput" type="text" placeholder={stateObj.firstName}></input>
                        <br /><br />


                        <h3><u>Bio (Max characters 240):</u></h3>
                        <textarea maxLength={240} style={{outline: "none"}} className="textAreaProfile" placeholder={stateObj.bio}></textarea>
                        <br /><br />
                    </div>

                    <div style={{ display: "inline-block" }}>
                        <h3 style={{ paddingLeft: 50 }}><u>Media:</u></h3>
                        <div style={{ paddingLeft: 50 }}>
                            <img onClick={openMedia1} style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                            <img onClick={openMedia2} style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                            <img onClick={openMedia3} style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                            <img onClick={openMedia4} style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                        </div>
                        <small style={{ paddingLeft: 50 }}><a href="#">Load More</a></ small>
                        <br /><br />
                    </div>

                    <div>
                        <h3 style={{ display: "inline-block", paddingLeft: 50 }}> <u>Your Community Posts:</u></h3>
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