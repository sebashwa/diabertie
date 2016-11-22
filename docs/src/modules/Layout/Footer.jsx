import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className={styles.root}>
        <span>created by&nbsp;<a className={styles.link} href="https://www.github.com/sebashwa">sebashwa</a></span>
        <span>|</span>
        <span><Link to="/privacy" className={styles.link}>Privacy Policy</Link></span>
      </div>
    );
  }
}

export default Footer;
