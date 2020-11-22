/*
**CSC 648 Team 02 DoReMeet
**File: Highlights.js
**Desc: Displays the highlighted projects for the site. Displayed in the landing page and also
 the community page
*/
import React from 'react';
import './Highlights.css';
import HighlightItem from './HighlightItem';

function Highlights() {
  return (
    <div className='cards'>
      <h1>Check out our Highlights for this Month</h1>
      <div className='cards_container'>
        <div className='cards_wrapper'>
          <ul className='cards_items'>
            <HighlightItem
              src='assets/placeholder-img.jpg'
              text='Amateur Salsa Dance at Local Competition'
              label='Dance'
              path='/'
            />
            <HighlightItem
              src='assets/placeholder-img.jpg'
              text='Oil Painting'
              label='Art'
              path='#'
            />
            <HighlightItem
              src='assets/placeholder-img.jpg'
              text='Song inspired by everyday noises'
              label='Music'
              path='#'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Highlights;