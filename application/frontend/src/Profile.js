import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

const Profile = (stateObj) => {
    // stateObj.setFileName('assets/placeholder-img.jpg');
    // const upload = async e => {
    //     e.preventDefault();
    //     const formData = new FormData();
    //     formData.append('file', stateObj.file);
    //     await axios.post('/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
    //         stateObj.setResultFile(`/assets/users/1/${response.data[0].post_file}`);
    //     });
    // }
    // const onChange = e => {
    //     e.preventDefault();
    //     stateObj.setFile(e.target.files[0]);
    //     stateObj.setFileName(e.target.files[0].name);
    // };


    return (
        <Router>
            <Navbar />
            <header className="App-header">
                <div className="description">
                    <h1>Your Profile!</h1>
                </div>
                <div className="profileContainer">
                    <div className="profileChildImg">
                        <img className="profileImage" src={`${stateObj.file}`} />
                        <form class="post-container" /*onSubmit={() => upload}*/>
                            <input type='file' className='custom-file-input' id='customFile' /*onChange={() => onChange}*/ />
                            <label className='custom-file-label' htmlFor='customFile'></label>
                            <input type='submit' value='Upload' />
                        </form>
                    </div>
                    <div className="profileChildInfo">
                        <h2 style={{ display: "inline-block", marginBottom: "5px" }}>Profile Name</h2>
                        <p>Age: Placeholder age</p>
                        <p>D/O/B: Placeholder DOB</p>
                        <p style={{ color: "#656c75" }}>Location: Placeholder Location (Hidden)</p>
                        <p>Art Category: Placeholder Category</p><br />
                        <img style={{ height: "100px" }} src="/assets/spotifylogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px" }} src="/assets/twitterlogo.png"></img>
                        <img style={{ height: "100px", marginLeft: "70px" }} src="/assets/youtubelogo.png"></img>
                    </div>
                    <div>
                        <h3>Tags:</h3>
                        <button style={{ backgroundColor: "#06EFB7" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "#06EFB7" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "#06EFB7" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "#06EFB7" }}>Placeholder Tag</button>
                        <button style={{ backgroundColor: "#06EFB7" }}>Placeholder Tag</button>
                        <br />

                        <h3>Bio:</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit posuere tempor. Sed non ligula sed mauris elementum mattis nec facilisis ante. Nulla ornare laoreet laoreet. Maecenas diam leo, sodales tristique varius vel, tincidunt ultricies nulla. Phasellus rhoncus, turpis sed molestie euismod, lacus nunc mattis lorem, non mollis nulla mauris ut erat. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        <br />
                    </div>
                    <div>
                        <img style={{ height: "200px", marginLeft: "20px" }} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "200px", marginLeft: "10px" }} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "200px", marginLeft: "10px" }} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "200px", marginLeft: "10px" }} src='assets/placeholder-img.jpg' />
                    </div>
                    <div>
                        <br />
                        <h3 style={{ marginLeft: "20px" }}> Community Posts:</h3>
                        <img style={{ height: "400px", marginLeft: "20px" }} src='assets/placeholder-img.jpg' />
                        <img style={{ height: "400px", marginLeft: "20px" }} src='assets/placeholder-img.jpg' />
                        <h2 style={{ marginLeft: "210px", marginRight: "210px", display: "inline-block" }}> Post Title</h2>
                        <h2 style={{ marginLeft: "210px", display: "inline-block" }}> Post Title</h2>
                    </div>
                </div>
            </header>
            <Footer />
        </Router>
    );
}


export default Profile;