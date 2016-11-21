import React, { Component } from 'react';
import styles from './Layout.css';
import Footer from './Footer';
import Header from './Header';


class Layout extends Component {
  constructor() {
    super();
    this.onScroll = this.onScroll.bind(this);
    this.state = { scrollPos: window.scrollY };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    this.setState({
      scrollPos: window.scrollY
    });
  }

  render() {
    return (
      <div className={styles.root}>
        <Header scrollPos={this.state.scrollPos} />

        <div className={styles.content}>
          {this.props.children}
        </div>

        <Footer />
      </div>
    );
  }
}

export default Layout;
