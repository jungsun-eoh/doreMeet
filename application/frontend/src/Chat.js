import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

const Chat = (stateObj) => {

        return(
            <Router>
            <Navbar />
           <h1>Chat Page Here</h1>
           </Router>
        );
    }


export default Chat;