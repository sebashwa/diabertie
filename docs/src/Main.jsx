import React, { Component } from 'react';
import styles from './Main.style';
import Docs from './Docs';
import Footer from './Footer';

class Main extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Docs />
        <Footer />
      </div>
    );
  }
}

export default Main;
