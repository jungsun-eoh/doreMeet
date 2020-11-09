import React from 'react';
import './Footer.css';
import { Button } from '../Navbar/Buttons';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <h4 className='footer-subscription-heading'>
          Subscribe to Our Newsletter
        </h4>
        <p className='footer-subscription-text'>
          Get the company details, comapny news and special offers delivered right to your inbox.
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
            <Link to='/sign-up'> <p> FAQs </p></Link>
            <Link to='/sign-up'> <p> Guidelines </p></Link>
            <Link to='/sign-up'> <p> Contact Us </p></Link>
            <Link to='/sign-up'> <p> Terms &amp; Conditions </p></Link>
            <Link to='/sign-up'> <p> Privacy Policy </p></Link>
            <Link to='/sign-up'> <p> Careers </p></Link>
          </div>
        </div>
      </div>
      <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='social-icons'>
            <Link
              class='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i class='fab fa-twitter' />
            </Link>
          </div>
        </div>
      </section>
      <small class='website-rights'>DoReMeet © 2020</small>
    </div>
  );
}

export default Footer;