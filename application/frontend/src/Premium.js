/*
**CSC 648 Team 02 DoReMeet
**File: Premium.js
**Desc: This is the page where users will be able to pay for premium features. Can be accessed through
the settings or the match page when they reach the max matches
*/

import React from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';


const Premium = (stateObj) => {

    return(
        <>
        <Router>
            <div className ="App">
                <Navbar/>
                <label style={{position: "center", fontSize:'15', width: '20%', marginLeft:30, marginRight: 'auto', marginTop:10}} type='text'> <a href="/Settings">Back to Settings</a> </label><br/>
                <header className="App-header">
                    <div className="PremiumInfo">
                        <h1>Upgrade your account</h1>
                        <h4>Increase your chances of finding the right match!</h4><br/>
                        <p>• Unlimited Likes</p>
                        <p>• No Ads</p>
                        <p>• Highlighted Profile</p>
                        <p>• Increased Search Radius</p>
                        <p>• Rewind on Potential Matches</p>
                        <p>• Bigger Portfolio Size</p>
                    </div>
                    
                    <form className="settingsForm">
                        <label style={{marginLeft: "20px"}} className='premiumPrice' for="small">&nbsp; <b>$4.99 for 1 month</b></label>
                        <label style={{marginLeft: "20px"}} className='premiumPrice' for="medium"><b>$49.99 for 6 months</b> </label>
                        <label style={{marginLeft: "20px"}} className='premiumPrice' for="large"><b>$119.99 for 12 months</b> </label>
                        <br/>
                        <input style={{marginLeft: '78px'}} onChange={e => stateObj.setGender(e.target.value)} type="radio" id="small" name="payment" value=""/>
                        <input style={{marginLeft: "138px"}}onChange={e => stateObj.setGender(e.target.value)} type="radio" id="medium" name="payment" value=""/>
                        <input style={{marginLeft: "153px"}}onChange={e => stateObj.setGender(e.target.value)} type="radio" id="large" name="payment" value=""/>
                        <br/>
                        <label for="cardHolder">Card Holder's Name</label><br/>
                        <input style={{width: "480px"}} className="settingsFields" type="text" id="cardHolder"/><br/>
                        <label for="cardNumber">Card Number</label><br/>
                        <input style={{width: "480px"}} className="settingsFields" id="cardNumber" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}"  maxlength="19" placeholder="xxxx xxxx xxxx xxxx"/><br/>
                        <label for="expiration">Expiration Date (MM/YY)</label> 
                        <label style={{marginLeft: "80px"}} for="cvv">CVV</label><br/>
                        <input style={{width: "236px", marginRight: "2px"}} className="settingsFields" id="expiration" type="numeric"/>
                        <input style={{width: "236px", marginLeft: "2px"}} className="settingsFields" id="cvv" type="numeric"/>
                        
                        <input style={{marginTop: "10px", width: "480px"}} type='submit' value="Upgrade to Premium Account"/>
                        <button style={{backgroundColor: "#FD7D7D", width: "480px"}}>End Premium Membership</button><br/>
                    </form>
                </header>
            </div>
        <Footer />
        </Router>
        </>
    );

}

export default Premium;