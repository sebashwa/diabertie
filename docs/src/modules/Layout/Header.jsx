import React, { Component } from 'react';
import { Link } from 'react-router';
import Navigation from './Navigation';
import styles from './Header.css';

class Header extends Component {
  render() {
    const scrolledDown = this.props.scrollPos > 200;
    const startedScrolling = this.props.scrollPos > 0;
    const rootClass = startedScrolling ? `${styles.root} ${styles.navBorder}` : styles.root;


    return (
      <div className={rootClass} onScroll={this.onScroll}>
        <Link to="/">
          { scrolledDown && <img className={styles.image} src="img/bertie_bubble.svg" /> }
        </Link>

        <Navigation />
      </div>
    );
  }
}

export default Header;
