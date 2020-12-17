/*
**CSC 648 Team 02 DoReMeet
**File: Highlights.js
**Desc: Displays the highlighted projects for the site. Displayed in the landing page and also
 the community page
*/
import React from 'react';
import './Highlights.css';
import HighlightItem from './HighlightItem';
import axios from 'axios';

function Highlights() {
  var f1 = '';
  var t1 = '';
  var c1 = '';

  var f2 = '';
  var t2 = '';
  var c2 = '';

  var f3 = '';
  var t3 = '';
  var c3 = '';

  //just prints each highlight
  // axios.get('/highlights').then(response => {
  //   if (response.data.length > 0) {
  //     response.data.forEach(highlight => {
  //       console.log(highlight);
  //     });
  //   }
  // });
  axios.get('/highlights').then(response => {
    console.log("test high");
    if (response.data.length > 0) {
      console.log(response.data[0].post_title);
      f1 = response.data[0].post_file;
      t1 = response.data[0].post_title;
      c1 = response.data[0].post_category;

      f2 = response.data[1].post_file;
      t2 = response.data[1].post_title;
      c2 = response.data[1].post_category;

      f3 = response.data[2].post_file;
      t3 = response.data[2].post_title;
      c3 = response.data[2].post_category;
    }
  }).catch(function (error) {
    //  console.log('fail')
  });
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
      //     <div className='cards'>
      //     <h1>Check out our Highlights for this Month</h1>
      //     <div className='cards_container'>
      //       <div className='cards_wrapper'>
      //         <ul className='cards_items'>
      //           <HighlightItem
      //             src={`${f1}`}
      //             text={`${t1}`}
      //             label={`${c1}`}
      //             path='/'
      //           />
      //           <HighlightItem
      //             src={`${f2}`}
      //             text={`${t2}`}
      //             label={`${c2}`}
      //             path='/'
      //           />
      //           <HighlightItem
      //             src={`${f3}`}
      //             text={`${c3}`}
      //             label={`${c3}`}
      //             path='/'
      //           />
      //         </ul>
      //       </div>
      //     </div>
      // </div>
  );
}

export default Highlights;