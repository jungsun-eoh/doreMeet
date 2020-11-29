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
        await axios.get('/getProfile').then(response => {
            console.log(response.data[0]);
            stateObj.setProfilePic(response.data[0].profile_pic);
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
            stateObj.setFile(`/assets/users/1/${response.data[0].post_file}`);
        });
    }
    const onChange = (e) => {
        e.preventDefault();
        stateObj.setFile(e.target.files[0]);
        stateObj.setFileName(e.target.files[0].name);
        console.log(e.target.files[0]);
        console.log(e.target.files[0].name);
    };

    const openPost = () => {
        document.getElementById("postform").style.display = "block";
    }

    const closePost = () => {
        document.getElementById("postform").style.display = "none";
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
                                <input type='file' className='custom-file-input' id='customFile' onChange={onChange} />
                                <label className='custom-file-label' htmlFor='customFile'></label>
                                <input type='submit' value='Upload' /><br/>
                                <button onClick={closePost}>Close</button>
                    </form>
                </div>
                <input style={{ position: "center", width: '10%', marginLeft: 'auto', marginRight: 20, marginTop: 10 }} type='button' value="show Profile" onClick={getProfile} /><br />
                <div className="profileContainer">
                    <div className="profileChildImg">
                        <img onClick={openPost} style={{cursor: "pointer"}}className="profileImage" src={`/assets/users/1/${stateObj.profilePic}`} />
                        <div onClick={openPost} className="editPic"><i class="fas fa-camera"></i>Edit</div>
                    </div>
                    <div className="profileChildInfo">
                        <h2 style={{ display: "inline-block", marginBottom: "5px" }}> Name {stateObj.firstName + " " + stateObj.lastName}</h2>
                        <p>Age: {stateObj.age}</p>
                        <p>Gender: {stateObj.gender}</p>
                        <p style={{ color: "#656c75" }}>Location: Placeholder Location (Hidden)</p>
                        <p>Art Category: {stateObj.artCategory}</p><br />
                        <img style={{ height: "100px", position: 'relative' }} src="/assets/spotifylogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/twitterlogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/youtubelogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px", position: 'relative' }} src="/assets/instagramlogo.png"></img>
                    </div>
                    <br /><br />

                    <div style={{ display: "inline-block", display: 'column', float: 'left', paddingLeft: 50 }}>
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
                            <img style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                            <img style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                            <img style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
                            <img style={{ height: "160px", margin: "15px 5px 0 5px" }} src='assets/placeholder-img.jpg' />
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