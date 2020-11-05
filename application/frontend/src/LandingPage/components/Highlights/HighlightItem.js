import React from 'react';
import { Link } from 'react-router-dom';

function HighlightItem(props) {
    return (
    <>
      <li className='cards_item'>
        <Link className='cards_item_link'>
          <figure className='cards_item_pic-wrap' data-category={props.label}>
            <img className='cards_item_img' alt='Img1' src={props.src} />
          </figure>
          <div className='cards_item_info'>
            <h5 className='cards_item_text'>{props.text}</h5>
          </div>
        </Link>
      </li>
    </>
  );
}

//to={props.path}

export default HighlightItem;