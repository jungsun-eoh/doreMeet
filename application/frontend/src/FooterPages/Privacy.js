/*
**CSC 648 Team 02 DoReMeet
**File: Privacy.js
**Desc: Contains all the information regarding the privacy policy. Accessed through the footer.
*/

import React, { Component } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import  '../App.css';

class Privacy extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> PRIVACY POLICY </h1>
          </div>
          <div className="FooterContent">
          <h4> COLLECTION OF INFORMATION</h4>
          <br />
          <h5>Registration Information</h5>
          <br />
          <p>When you sign up and create an "account" with DoReMeet, we may collect certain information ("Registration Information") about you, such as:</p>
          <p><li>Name;</li>
          <li>Username;</li>
          <li>Email address;</li>
          <li>Mobile number;</li>
          <li>Gender identity;</li>
          <li>Date of birth;</li>
          <li>Photographs;</li>
          <li>Location; </li>
          <li>Login information and friend lists for social media accounts that you connect to your DoReMeet Account (this could include, for example, your Facebook and Instagram accounts ("Social Media Accounts").</li>
          < br />
          You will also be required to create a password in connection with the registration of your Account. 
          Once you register, you will be able to review and change this information at any time by accessing your “Profile” page! 
          You control your user profile and are able to correct or update (other than your email address) your information at any time by just logging in to DoReMeet.
          <br />
          The information we collect helps to enhance the App and verify our Users (robots are not welcome!!). 
          Registration Information such as your name and username may be visible to the public on your profile page.
          </p>
          </div>
          <Footer />
          </Router>
          </>
     );
}
}

export default Privacy;