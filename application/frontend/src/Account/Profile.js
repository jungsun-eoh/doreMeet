/*
**CSC 648 Team 02 DoReMeet
**File: Profile.js
**Desc: Displays the profile of the user that is currently logged in. Accessed through the logged in navbar. 
Users can edit parts of their Profile like media, bio, tags, and linked social media accounts.
*/

import React, {useEffect} from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import axios from 'axios';
import './Profile.css'
import { BrowserRouter as Router } from 'react-router-dom';

var test = '';
const Profile = (stateObj) => {

    useEffect(() => {
        console.log("useEffect Profile.js");
        axios.get('/getUsers').then(response => {
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
            console.log("{User} Not Found");
        })
        axios.get('/getProfile', ).then(response => {
            stateObj.setProfilePic(response.data[0].profile_pic);
            stateObj.setProfilePicPath(response.data[0].picture_path);
            stateObj.setBio(response.data[0].bio);

            //can remove if statement if null links dont lead anywhere
            if(response.data[0].social_profile_1){stateObj.setSpotifyLink(response.data[0].social_profile_1)};
            if(response.data[0].social_profile_2){stateObj.setTwitterLink(response.data[0].social_profile_2)};
            if(response.data[0].social_profile_3){stateObj.setYoutubeLink(response.data[0].social_profile_3)};
            if(response.data[0].social_profile_4){stateObj.setInstagramLink(response.data[0].social_profile_4)};

        }).catch(function (error) {
            console.log(error);
            console.log("{Profile} Found");
        })
        axios.get('/getMedia', ).then(response => {
            if(response.data.length > 0) {
                let _html = "";
                response.data.forEach(media => {
                    _html += `<div class="MediaFile"> 
                                  <img class="ImageFormat" src="${media.file_name}" alt="Media file"/>
                              </div>`;
                })
                document.getElementById("media-files").innerHTML = _html;
            }
        }).catch(function (error) {
            console.log(error);
            console.log("{Media}  Not Found");
        })
        //src="assets/postImages/${response.data[0].post_file}"
        axios.get('getCommunityPosts').then(response => {
            console.log(response.data);
            if (response.data.length > 0) {
                let _html = "";
                response.data.forEach(post => {
                    _html += `<div class="PostFormat">
                                  <img class="ImageFormat" src="assets/postImages/${post.post_file}" alt="Post file"/>
                                  <div class="PostInfo">
                                    <p>${post.post_category}</p>
                                    <p>${post.post_title}</p>
                                  </div>
                              </div>`;
                })
                document.getElementById("user-posts").innerHTML = _html;
            }
        }).catch(function (error) {
            console.log(error);
            console.log("{CommPost} Not Found");
        });}, [stateObj.screenState]);

    const leaveSiteConfirmation = (e) => {
        if(window.confirm('You are leaving DoReMeet, are you sure?')){
        }
        else{
            e.preventDefault();
        }
    }

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
        if (month - userMonth > 0) {
            userAge += 1;
        } else if (month - userMonth == 0) {
            if (day - userDay >= 0) {
                userAge += 1;
            }
        }
        console.log(userAge);
        stateObj.setAge(userAge);
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
    const uploadMedia = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', stateObj.file);
        formData.append('type', 'media1');
        closeMedia();
        await axios.post('/uploadMedia', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data[0]);
            stateObj.setuploadmedia1(`${response.data[0].picture_path} + ${response.data[0].post_file}`);
        }).then(window.location.reload());
    }

    const openMedia = () => {
        document.getElementById("media").style.display = "block";
    }

    const closeMedia = () => {
        document.getElementById("media").style.display = "none";
    }

    //Add Spotify Link
    const setSpotifyLink = async e => {
        e.preventDefault();
        if(document.getElementById("spotifyLink").value.startsWith("https://")
          && document.getElementById("spotifyLink").value.includes("spotify.com")) {
            const formData = new FormData();
            formData.append('value', document.getElementById("spotifyLink").value);
            formData.append('type', 'social_profile_1');
            await axios.post('/uploadText', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                console.log(response.data);
            }).then(stateObj.spotifyLink = document.getElementById("spotifyLink").value);
            closeSpotifyLinkForm();
            window.location.reload();
        }
        else {
            alert("Link must start with 'https://' and have 'spotify.com'")
        }
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
        if(document.getElementById("twitterLink").value.startsWith("https://")
          && document.getElementById("twitterLink").value.includes("twitter.com")) {
            const formData = new FormData();
            formData.append('value', document.getElementById("twitterLink").value);
            formData.append('type', 'social_profile_2');
            await axios.post('/uploadText', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                console.log(response.data);
            }).then(stateObj.twitterLink = document.getElementById("twitterLink").value);
            closeTwitterLinkForm();
            window.location.reload();
        }
        else {
            alert("Link must start with 'https://' and have 'twitter.com'")
        }
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
        if(document.getElementById("youtubeLink").value.startsWith("https://")
          && document.getElementById("youtubeLink").value.includes("youtube.com")) {
            const formData = new FormData();
            formData.append('value', document.getElementById("youtubeLink").value);
            formData.append('type', 'social_profile_3');
            await axios.post('/uploadText', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                console.log(response.data);
            }).then(stateObj.youtubeLink = document.getElementById("youtubeLink").value);
            closeYoutubeLinkForm();
            window.location.reload();
        }
        else {
            alert("Link must start with 'https://' and have 'youtube.com'")
        }
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
        if(document.getElementById("instagramLink").value.startsWith("https://")
          && document.getElementById("instagramLink").value.includes("instagram.com")) {
            const formData = new FormData();
            formData.append('value', document.getElementById("instagramLink").value);
            formData.append('type', 'social_profile_4');
            await axios.post('/uploadText', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => {
                console.log(response.data);
            }).then(stateObj.instagramLink = document.getElementById("instagramLink").value);

            closeInstagramLinkForm();
            window.location.reload();
        }
        else {
            alert("Link must start with 'https://' and have 'instagram.com'")
        }
    }

    const openInstagramLinkForm = () => {
        document.getElementById("instagramLinkForm").style.display = "block";
    }

    const closeInstagramLinkForm = () => {
        document.getElementById("instagramLinkForm").style.display = "none";
    }

    const setBio = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('value', document.getElementById("Bio").value);
        formData.append('type', 'bio');
        closeBioForm();
        await axios.post('/uploadText', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
            console.log(response.data[0]);
        }).then(stateObj.bio = document.getElementById("Bio").value);
        window.location.reload();
    }

    const openBioForm = () => {
        if (stateObj.bio !== 'Create a bio!') {
            document.getElementById("Bio").value = stateObj.bio;
        }
        document.getElementById("bioForm").style.display = "block";
    }

    const closeBioForm = () => {
        document.getElementById("bioForm").style.display = "none";
    }

    const setTag = async e => {
        e.preventDefault();
        closeTagForm();
        //axios call here
    }

    const openTagForm = () => {
        document.getElementById("tagForm").style.display = "block";
    }

    const closeTagForm = () => {
        document.getElementById("tagForm").style.display = "none";
    }

    return (
      <Router>
          <Navbar />
          <header className="App-header">
              <div className="description">
                  <h1>Your Profile!</h1>
              </div>
              <div style={{top:"35%", left:"35%"}} class="post-popup" id="postform">
                  <form class="post-container" onSubmit={upload}>
                      <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={onChange} required/>
                      <label className='custom-file-label' htmlFor='customFile'></label>
                      <br/>
                      <input type='submit' value='Upload' /><br/>
                      <button onClick={closePost}>Close</button>
                  </form>
              </div>

              <div style={{top:"35%", left:"35%"}} class="post-popup" id="media">
                  <form class="post-container" onSubmit={uploadMedia}>
                      <input type='file' className='custom-file-input' id='customFile' accept="image/*" onChange={onChange} required/>
                      <label className='custom-file-label' htmlFor='customFile'></label>
                      <br/>
                      <input type='submit' value='Upload' /><br/>
                      <button onClick={closeMedia}>Close</button>
                  </form>
              </div>


              <div style={{top:"35%", left:"35%"}} className="post-popup" id="spotifyLinkForm">
                  <form className="post-container" onSubmit={setSpotifyLink}>
                      <label htmlFor='spotifyLink'>Spotify Link:</label>
                      <input type='text' id='spotifyLink' placeholder='Input your Spotify link here (Example: https://spotify.com)'
                             required/>
                      <input type='submit' value='Submit'/><br/>
                      <button onClick={closeSpotifyLinkForm}>Close</button>
                  </form>
              </div>

              <div style={{top:"35%", left:"35%"}} class="post-popup" id="twitterLinkForm">
                  <form class="post-container" onSubmit={setTwitterLink}>
                      <label for='twitterLink'>Twitter Link:</label>
                      <input type='text' id='twitterLink' placeholder='Input your Twitter link here (Example: https://twitter.com)'
                             required/>
                      <input type='submit' value='Submit'/><br/>
                      <button onClick={closeTwitterLinkForm}>Close</button>
                  </form>
              </div>

              <div style={{top:"35%", left:"35%"}} className="post-popup" id="youtubeLinkForm">
                  <form className="post-container" onSubmit={setYoutubeLink}>
                      <label htmlFor='youtubeLink'>Youtube Link:</label>
                      <input type='text' id='youtubeLink' placeholder='Input your Youtube link here (Example: https://youtube.com)'
                             required/>
                      <input type='submit' value='Submit'/><br/>
                      <button onClick={closeYoutubeLinkForm}>Close</button>
                  </form>
              </div>

              <div style={{top:"35%", left:"35%"}} className="post-popup" id="instagramLinkForm">
                  <form className="post-container" onSubmit={setInstagramLink}>
                      <label htmlFor='instagramLink'>Instagram Link:</label>
                      <input type='text' id='instagramLink' placeholder='Input your Instagram link here (Example: https://instagram.com)'
                             required/>
                      <input type='submit' value='Submit'/><br/>
                      <button onClick={closeInstagramLinkForm}>Close</button>
                  </form>
              </div>

              <div style={{top:"35%", left:"35%"}} className="post-popup" id="bioForm">
                  <form className="post-container" onSubmit={setBio}>
                      <label htmlFor='Bio'>Your Bio:</label>
                      <br/>
                      <textarea id="Bio" maxLength={240} placeholder="Type your bio here!" style={{height: "200px", width:"500px", fontSize:"20px", resize: "none"}} required/>
                      <br/>
                      <input type='submit' value='Submit'/><br/>
                      <button onClick={closeBioForm}>Close</button>
                  </form>
              </div>

              <div style={{top:"35%", left:"35%"}} className="post-popup" id="tagForm">
                  <form className="post-container" onSubmit={setTag}>
                      <label htmlFor='tag'>Tag:</label>
                      <input type='text' id='tag' placeholder='Type a tag here!' required/>
                      <input type='submit' value='Submit'/><br/>
                      <button onClick={closeTagForm}>Close</button>
                  </form>
              </div>

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
                      <a href={stateObj.spotifyLink} onClick={leaveSiteConfirmation}>
                          <img style={{height: "100px", position: 'relative', cursor: "pointer"}}
                               src="/assets/spotifylogo.png" alt="Spotify Logo"/>
                      </a>
                      <i className="fas fa-edit" style={{cursor: "pointer"}} onClick={openSpotifyLinkForm}/>
                      <a href={stateObj.twitterLink} onClick={leaveSiteConfirmation}>
                          <img style={{height: "100px", marginLeft: "70px", position: 'relative', cursor: "pointer"}}
                               src="/assets/twitterlogo.png" alt="Twitter Logo"/>
                      </a>
                      <i className="fas fa-edit" style={{cursor: "pointer"}} onClick={openTwitterLinkForm}/>
                      <a href={stateObj.youtubeLink} onClick={leaveSiteConfirmation}>
                          <img style={{height: "100px", marginLeft: "70px", position: 'relative', cursor: "pointer"}}
                               src="/assets/youtubelogo.png" alt="Youtube Logo"/>
                      </a>
                      <i className="fas fa-edit" style={{cursor: "pointer"}} onClick={openYoutubeLinkForm}/>
                      <a href={stateObj.instagramLink} onClick={leaveSiteConfirmation}>
                          <img style={{height: "100px", marginLeft: "70px", position: 'relative', cursor: "pointer"}}
                               src="/assets/instagramlogo.png" alt="Instagram Logo"/>
                      </a>
                      <i className="fas fa-edit" style={{cursor: "pointer"}} onClick={openInstagramLinkForm}/>
                  </div>
                  <br /><br />

                  <h3><u>Tags:</u><i className="far fa-plus-square" style={{cursor: "pointer", marginLeft:"10px"}} onClick={openTagForm}/></h3>
                  <br />
                  <br /><br />

                  <h3><u>Bio:</u><i className="fas fa-edit" style={{cursor: "pointer", marginLeft:"10px"}} onClick={openBioForm}/></h3>
                  <p>{stateObj.bio}</p>
                  <br /><br />

                  <h3><u>Media:</u><i className="fas fa-folder-plus" style={{cursor: "pointer", marginLeft:"10px"}} onClick={openMedia}/></h3>
                  <div id="media-files"></div>
                  <br /><br />

                  <h3> <u>Your Community Posts:</u></h3>
                  <div id="user-posts"></div>

              </div>
          </header>
          <br />
          <Footer />
      </Router>
    );
}


export default Profile;