import React from 'react';
import { Button } from '../Navbar/Buttons';
import './Banner.css';
//import logo from './assets/drm_banner.gif';
//<img src={logo} alt='Banner' width='100%' height='600px'></img>

function Banner() {
  return (
    <div className='container'>
      <h1 className="animated bounce">CONNECT &amp; CREATE</h1>
      <p> Meet artists near you, and built what your heart desires </p>
      <div className='banner-buttons'>
        <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'onClick={console.log('Log In Button Clicked')}> Log In </Button>
        <Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large' onClick={console.log('Sign Up Button Clicked')}> Sign Up </Button>
      </div>
    </div>
  );
}

export default Banner;
/*
<div class='container'>
        <img src={logo} alt='Banner' width='100%' height='600px'></img>
        <div class='centered animated bounce'><h1> CONNECT &amp; CREATE </h1></div>
        <div class='centered after'><h3><b> Secondary Tagline </b></h3></div>
        <button class='logIn-button'>Log In</button> 
        <button class='signUp-button'> Sign Up</button>
      </div>
    </div>*/