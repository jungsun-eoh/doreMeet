/*
**CSC 648 Team 02 DoReMeet
**File: Banner.js
**Desc: This is the banner that is displayed on the landing page.
*/

import React from 'react';
import { Button } from '../Navbar/Buttons';
import { Link } from 'react-router-dom';

import './Banner.css';

function Banner() {
  return (
    <div className='container-ban'>
      <h1 className="animated bounce">CONNECT &amp; CREATE</h1>
      <p> Meet artists near you, and build what your heart desires </p>
      <div className='banner-buttons'>
        <Link to='/login' > <Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>Log In </Button></Link>
        <Link to='/signup' ><Button className='btn' buttonStyle='btn--primary' buttonSize='btn--large'> Sign Up </Button></Link>
      </div>
    </div>
  );
}

export default Banner;
