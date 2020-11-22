/*
**CSC 648 Team 02 DoReMeet
**File: Company.js
**Desc: Super simple page just talking about the "company" stuff, can be accessed through the landing page
*/
import React, { Component } from 'react';
import NavbarHome from '../components/Navbar/NavbarHome';
import Footer from '../components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import '../App.css';

class Company extends Component {

    render(){
        return(
        <>
         <Router>
            <NavbarHome />
            <div className='FooterBanner'>
              <h1> COMPANY </h1>
            </div>
            <div className="company-container">
                <img src="/assets/creativity_company.jpg" style={{ width: 500, height: 450, marginLeft: 50, marginRight: 50,paddingTop: 50, paddingBottom: 50,float: 'left'}}/>
                <h1 style={{paddingTop: 50, paddingBottom: 20, textAlign:'center'}}><i>We aim to let creativity flow without inhibitions</i></h1>
                <p style={{ fontSize: 20, textAlign:'left', marginLeft: 50, marginRight: 50, paddingBottom: 50}}>
                    Our company's mission is to enable creativity by connecting people with other artists in their vicinty or around the globe.
                <br />
                <br />
                Our product, DoReMeet, aims to help artists build a community by providing them a platform where they can find collaborators, mentors, and/or friends. 
                Artists, be it singers, dancers, painters, photographers or film makers, can use our product to find people that are close to their geographical location 
                and connect with them, to work on projects for work, fun or both. 
                <br />
                <br />
                Our vision is to extend the practice of instinctual decision-making by breaking down complex entities into a simple matter of yes or no via swipes to forums 
                other than dating. We live a fast paced life, where practically everything is available at the touch of a finger. However, there are few reliable platforms 
                that directly offer this provision for finding fellow artists online. With DoReMeet, users will have the ability to find people either within a 100 miles 
                radius of their current location or set up a "Meet Online Only" account. They can "like" individuals (thus marking an individual as interested) if they want 
                to connect with the person or "dislike" (marking the individual as not interested) them if they don't think they'd be a right match. 
                <br />
                <br />
                DoReMeet, unlike our competitors, offers a no pressure setting to connect and learn with/from people. The users range from experts to novices and users have the 
                opportunity to find these matches based on their choice, for either a fun collaboration or for serious, paid work. We do not limit the user base to any category, 
                and users are free to switch their preferences any time.  In addition DoReMeet also offers a Community page to share collaborations, and give a chance to build an 
                art community. Collaborations are rewarded as "Highlight of the Month" based on their popularity in the community. 
                <br />
                <br />
                We are enhancing the model of connecting with other people by providing a platform geared towards artists that can not only be personalized 
                based on their needs, but is also effective, safe, reliable, with a fun and creative touch to it.
                <br />
                <br />
                <b  style={{ fontSize: 25}}> So come becaome a part of the DoReMeet community, and start exploring your skills with support from your fellow artists. </b>
                </p>
            </div>
           
          <Footer />
          </Router>
          </>
     );
}
}

export default Company;