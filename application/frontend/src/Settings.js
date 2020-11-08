import React from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './LandingPage/components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';


const Settings = (stateObj) => {

    return(
        <>
        <Router>
            <div className ="App">
                <Navbar/>
                <header className="App-header">
                    <div className="description">
                        <h1>Settings</h1>
                    </div>
                    <form>
                        
                    </form>
                </header>
            </div>
        </Router>
        </>
    );

}

export default Settings;