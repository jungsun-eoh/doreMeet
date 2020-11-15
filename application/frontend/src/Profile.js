import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

const Profile = (stateObj) => {

        return(
            <Router>
            <Navbar />
            <header className="App-header">
                <div className="description">
                    <h1>Your Profile!</h1>
                </div>
                <div className="profileContainer">
                    <div className="profileChildImg">
                        <img className="profileImage" src='assets/placeholder-img.jpg'/>
                    </div>
                    <div className="profileChildInfo">
                        <h2 style={{display: "inline-block", marginBottom: "5px"}}>Profile Name</h2>
                        <p>Age: Placeholder age</p>
                        <p>D/O/B: Placeholder DOB</p>
                        <p style={{color: "#656c75"}}>Location: Placeholder Location (Hidden)</p>
                        <p>Art Category: Placeholder Category</p><br/>
                        <img style={{height: "100px"}} src="/assets/spotifylogo.png"></img>
                        <img style={{height: "100px", marginLeft: "70px"}} src="/assets/twitterlogo.png"></img>
                        <img style={{height: "100px", marginLeft: "70px"}} src="/assets/youtubelogo.png"></img>
                    </div>
                    <div>
                        <h3>Tags:</h3>
                        <button style={{backgroundColor: "#06EFB7"}}>Placeholder Tag</button>
                        <button style={{backgroundColor: "#06EFB7"}}>Placeholder Tag</button>
                        <button style={{backgroundColor: "#06EFB7"}}>Placeholder Tag</button>
                        <button style={{backgroundColor: "#06EFB7"}}>Placeholder Tag</button>
                        <button style={{backgroundColor: "#06EFB7"}}>Placeholder Tag</button>
                        <br/>

                        <h3>Bio:</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit posuere tempor. Sed non ligula sed mauris elementum mattis nec facilisis ante. Nulla ornare laoreet laoreet. Maecenas diam leo, sodales tristique varius vel, tincidunt ultricies nulla. Phasellus rhoncus, turpis sed molestie euismod, lacus nunc mattis lorem, non mollis nulla mauris ut erat. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        <br/>                   
                    </div>
                    <div>
                        <img style={{height: "200px", marginLeft: "20px"}} src='assets/placeholder-img.jpg'/>
                        <img style={{height: "200px", marginLeft: "10px"}} src='assets/placeholder-img.jpg'/>
                        <img style={{height: "200px", marginLeft: "10px"}} src='assets/placeholder-img.jpg'/>
                        <img style={{height: "200px", marginLeft: "10px"}} src='assets/placeholder-img.jpg'/>
                    </div>
                    <div>
                        <br/>
                        <h3 style={{marginLeft: "20px"}}> Community Posts:</h3>
                        <img style={{height: "400px", marginLeft: "20px"}} src='assets/placeholder-img.jpg'/>
                        <img style={{height: "400px", marginLeft: "20px"}} src='assets/placeholder-img.jpg'/>
                        <h2 style={{marginLeft: "210px", marginRight: "210px", display: "inline-block"}}> Post Title</h2>
                        <h2 style={{marginLeft: "210px", display: "inline-block"}}> Post Title</h2>
                    </div>
                </div>
            </header>
           <Footer />
           </Router>
        );
    }


export default Profile;