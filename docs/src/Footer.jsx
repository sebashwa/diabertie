import React, { Component } from 'react';
import styles from './Footer.css';

class Footer extends Component {
  render() {
    return <div className={styles.root}>created by&nbsp;<a className={styles.link} href="https://www.github.com/sebashwa">sebashwa</a></div>;
  }
}

export default Footer;
