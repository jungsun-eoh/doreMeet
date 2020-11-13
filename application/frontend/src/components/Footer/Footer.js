import React from 'react';
import './Footer.css';
import { Button } from '../Navbar/Buttons';

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
            <input
              className='footer-input'
              name='email'
              type='email'
              placeholder='Enter your email here'
            />
            <Button buttonStyle='btn--primary'>Subscribe</Button>
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
            <a href='/Careers'> <p> Careers </p></a>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='social-icons'>
            <a href="/"
              class='social-icon-link facebook'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </a>
            <a href="/"
              class='social-icon-link instagram'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </a>
            <a href="/"
              class='social-icon-link twitter'
              target='_blank'
              aria-label='Twitter'
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