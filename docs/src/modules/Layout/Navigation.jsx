import React, { Component } from 'react';
import { Link } from 'react-router';
import linkStyles from '../shared/Link.css';
import styles from './Navigation.css';
import MediaQuery from 'react-responsive';

class Navigation extends Component {
  constructor() {
    super();
    this.toggleSubNav = this.toggleSubNav.bind(this);
    this.state = { subNavActive: false };
  }

  toggleSubNav() {
    const { subNavActive } = this.state;

    this.setState({ subNavActive: !subNavActive });
  }

  renderLinks() {
    const allLinkStyles = `${linkStyles.root} ${styles.link}`;

    return (
      <div className={styles.root}>
        <Link className={allLinkStyles} onClick={this.toggleSubNav} to="/">About</Link>
        <Link className={allLinkStyles} onClick={this.toggleSubNav} to="/howto">How to</Link>
      </div>
    );
  }

  render() {
    const { subNavActive } = this.state;
    const toggleImage = subNavActive ? 'toggleMenuUp' : 'toggleMenuDown';

    return (
      <div>
        <MediaQuery maxWidth={1000}>
          <a className={styles.toggle} onClick={this.toggleSubNav}>
            <img className={styles.toggleImage} src={`img/${toggleImage}.svg`} />
          </a>
          {subNavActive && this.renderLinks()}
        </MediaQuery>

        <MediaQuery minWidth={1000}>
          {this.renderLinks()}
        </MediaQuery>
      </div>
    );
  }
}

export default Navigation;
