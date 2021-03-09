import '../App.css';
import React from 'react';

import Masonry from 'react-masonry-css';


const masonryGridBreakpoints = {
  default: 3,
  600: 1,
  800: 2,
  1000: 3
}
const Display = (props) => {

  return (
    <Masonry breakpointCols={masonryGridBreakpoints} className="masonry-grid" columnClassName="masonry-grid-columns">
      {props.items}
    </Masonry>
  )
}

export default Display;
