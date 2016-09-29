import React, { Component } from 'react';
import styles from './Footer.style';

class Footer extends Component {
  render() {
    return <div style={styles.root}>created by&nbsp;<a style={styles.link} href="https://www.github.com/sebashwa">sebashwa</a></div>;
  }
}

export default Footer;
