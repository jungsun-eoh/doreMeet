/*
**CSC 648 Team 02 DoReMeet
**File: Guidelines.js
**Desc: The guidelines for the website, contains the rules that should be followed, accessed through the footer
*/

import React, { Component } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';

class Guidelines extends Component {

    render(){
        return(
        <>
         <Router>
          <NavbarHome />
          <div className='FooterBanner'>
              <h1> GUIDELINES </h1>
           </div>
           <div className="FooterContent">
          <h4> DoReMeet Guidelines</h4>
          <br />
            <p>These Guidelines and our Terms and Conditions are designed to ensure every user has a safe and enjoyable experience on DoReMeet. 
            Failure to adhere to these guidelines may result in losing access to our platform.</p>
            <br /><br />
            <h5>Upload only your own photos</h5><br />
            <p>We take copyrights very seriously. If you don't own the rights to a photo or video, please don't post it.</p>
                <br /><br />
            <h5>Respect all users</h5><br />
            <p>We're a very diverse community. This means you should respect other people's beliefs, interests and property while on DoReMeet. 
                DoReMeet takes a strong stance against hate speech, rude or abusive behaviour, bullying, and misogyny. 
                You should behave the same way on DoReMeet as you would in real life. Additionally we encourage all of our users to report anyone who does not follow these behavioural guidelines. 
                As a community rooted in kindness and respect, we expect all of our users to respect each other, themselves, and the DoReMeet staff.</p><br /><br />
            <h5>Send original messages to other users</h5><br />
            <p>We strongly advise against copying and pasting the same message to every connection. We encourage our users to read profiles, 
            learn about other people’s interests, and send an appropriate, relevant message to each match. We promise this will increase your chances of 
            engaging in interesting conversations.</p><br /><br />
            <h5>Don't pretend you're someone you're not</h5><br />
            <p>As previously stated, do not post photos that are not of you. We also recommend using our photo verification tool to let other users know that your profile is legit.</p>
            <br /><br />
            <h5>DoReMeet photo guidelines:</h5><br />
            <p><li>No kids on their own. They must be in the photo with an adult, and fully clothed.</li>
            <li>No photos in bikinis/swimwear indoors.</li>
            <li>No pictures in underwear.</li>
            <li>No Shirtless/underwear Mirror Selfies.</li>
            <li>Face must be clearly visible in all photos.</li>
            <li>No watermarks or text overlaid.</li>
            <li>No pornographic material.</li>
            <li>No graphic hunting photos.</li>
            <li>No guns.</li></p>
          </div>
          <Footer />
          </Router>
          </>
     );
}
}

export default Guidelines;