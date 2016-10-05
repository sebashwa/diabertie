import React, { PropTypes, Component } from 'react';
import styles from './Link.css';

class Link extends Component {
  static propTypes = {
    href:  PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <a className={styles.root} href={this.props.href}>{this.props.title}</a>
    );
  }
};

export default Link;
