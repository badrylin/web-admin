import * as React from 'react';
import Hamburger from './Hamburger';

export default class NavBar extends React.Component {
  render() {
    return(
      <div className='navbar'>
        <Hamburger/>
      </div>
    );
  }
}
