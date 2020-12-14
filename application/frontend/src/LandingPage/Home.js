/*
**CSC 648 Team 02 DoReMeet
**File: Home.js
**Desc: This is the landing page of the site. From here users can access preliminary info before they login
or signup. They can also do those two aforementioned things here as well.
*/

import React from 'react';
import Banner from '../components/Banner/Banner';
import Highlights from '../components/Highlights/Highlights';
import Footer from '../components/Footer/Footer';
import NavbarHome from '../components/Navbar/NavbarHome';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import '../App.css';

function App() {

  return (
    <div>
      <NavbarHome />
      <Banner />
          <div className="about-container">
        <img src="/assets/about.jpg" className="about-container-image" />
        <h1 className="about-container-heading" > Why Do Re Meet? </h1>
        <h3 className="about-container-text">
          DoReMeet offers a no pressure setting to connect and learn with/from people. The users range from experts to novices and users have the 
          opportunity to find these matches based on their choice, for either a fun collaboration or for serious, paid work. We do not limit the user base to any category, 
          and users are free to switch their preferences any time.  In addition DoReMeet also offers a Community page to share collaborations, and give a chance to build an art community.
        </h3></div>
          <h1 style={{textAlign:'center', marginTop: 100, marginBottom: 10}}>Our 5 Popular Art Categories</h1>
          <AwesomeSlider style={{ height: "400px", paddingLeft:"30px", paddingRight:"30px", marginTop: 20, marginBottom: 100}}>
          <div data-src="/assets/Music.jpg"><a href="/Community"><h1 className="slider-text-block"> MUSIC </h1></a></div>
          <div data-src="/assets/dance.jpg"><a href="/Community"><h1 className="slider-text-block"> DANCE </h1></a></div>
          <div data-src="/assets/paint.jpg"><a href="/Community"><h1 className="slider-text-block"> ART </h1></a></div>
          <div data-src="/assets/film.jpg"><a href="/Community"><h1 className="slider-text-block"> CINEMA </h1></a></div>
          <div data-src="/assets/photography.jpg"><a href="/Community"><h1 className="slider-text-block"> PHOTOGRAPHY </h1></a></div>
          </AwesomeSlider>
      <Highlights />
      <Footer />
    </div>
  );
}

export default App;
