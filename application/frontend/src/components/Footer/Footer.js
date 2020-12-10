/*
**CSC 648 Team 02 DoReMeet
**File: Footer.js
**Desc: The footer that is displayed on all the pages of the site. Contains all the neccessary legal information
links and things of that nature.
*/
import React from 'react';
import './Footer.css';
import { Button } from '../Navbar/Buttons';

const leaveSiteConfirmation = (e) => {
  if(window.confirm('You are leaving DoReMeet, are you sure?')){
  }
  else{
    e.preventDefault();
  }
}

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <h4 className='footer-subscription-heading'>
          Subscribe to Our Newsletter
        </h4>
        <p className='footer-subscription-text'>
          Get the company details, company news and special offers delivered right to your inbox.
        </p>
        <div className='input-areas'>
          <form>
            <table><tr><td><input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Enter your email here'
            /></td> &nbsp; &nbsp;<td>
            <Button buttonStyle='btn--primary'>Subscribe</Button></td></tr></table>
          </form>
        </div>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <a href ='/FAQ'> <p> FAQs </p></a>
            <a href='/Guidelines'> <p> Guidelines </p></a>
            <a href='/ContactUs'> <p> Contact Us </p></a>
            <a href='/Terms'> <p> Terms &amp; Conditions </p></a>
            <a href='/Privacy'> <p> Privacy Policy </p></a>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='social-icons'>
            <a href="http://www.facebook.com"
              class='social-icon-link facebook'
              target='_blank'
              aria-label='Facebook'
              onClick={leaveSiteConfirmation}
            >
              <i class='fab fa-facebook-f' />
            </a>
            <a href="http://www.instagram.com"
              class='social-icon-link instagram'
              target='_blank'
              aria-label='Instagram'
              onClick={leaveSiteConfirmation}
            >
              <i class='fab fa-instagram' />
            </a>
            <a href="http://www.twitter.com"
              class='social-icon-link twitter'
              target='_blank'
              aria-label='Twitter'
              onClick={leaveSiteConfirmation}
            >
              <i class='fab fa-twitter' />
            </a>
          </div>
        </div>
      </section>
      <small class='website-rights'>DoReMeet © 2020</small>
    </div>
  );
}

export default Footer;