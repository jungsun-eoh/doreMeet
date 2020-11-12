import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

const Profile = (stateObj) => {

        return(
            <Router>
            <Navbar />
           <h1>Profile Page Here</h1>
           </Router>
        );
    }


export default Profile;