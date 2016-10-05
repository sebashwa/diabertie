import React, { Component } from 'react';
import styles from './Main.css';
import Docs from './Docs';
import Footer from './Footer';

class Main extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Docs />
        <Footer />
      </div>
    );
  }
}

export default Main;
