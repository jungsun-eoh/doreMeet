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
                <header className="App-header">
                    <div className="PremiumInfo">
                        <h1>Upgrade your account</h1>
                        <h4>Increase your chances of finding the right match!</h4><br/>
                        <p>•Unlimited Likes</p>
                        <p>•No Ads</p>
                        <p>•Highlighted Profile</p>
                        <p>•Increased Search Radius</p>
                        <p>•Rewind on Potential Matches</p>
                        <p>•Bigger Portfolio Size</p>
                    </div>


                    <form className="settingsForm">
                        <label for="small">$4.99 for 1 month</label>
                        <label style={{marginLeft: "20px"}} for="medium">$49.99 for 6 months</label>
                        <label style={{marginLeft: "20px"}} for="large">$119.99 for 12 months</label>
                        <br/>
                        <input style={{marginLeft: "50px"}} onChange={e => stateObj.setGender(e.target.value)} type="radio" id="small" name="payment" value=""/>
                        <input style={{marginLeft: "150px"}}onChange={e => stateObj.setGender(e.target.value)} type="radio" id="medium" name="payment" value=""/>
                        <input style={{marginLeft: "150px"}}onChange={e => stateObj.setGender(e.target.value)} type="radio" id="large" name="payment" value=""/>
                        <br/>
                        <label for="cardHolder">Card Holder's Name</label><br/>
                        <input style={{width: "480px"}} className="settingsFields" type="text" id="cardHolder"/><br/>
                        <label for="cardNumber">Card Number</label><br/>
                        <input style={{width: "480px"}} className="settingsFields" id="cardNumber" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}"  maxlength="19" placeholder="xxxx xxxx xxxx xxxx"/><br/>
                        <label for="expiration">Expiration Date (MM/YY)</label> 
                        <label style={{marginLeft: "70px"}} for="cvv">CVV</label><br/>
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