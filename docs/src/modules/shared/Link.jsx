import React, { PropTypes, Component } from 'react';
import styles from './Link.css';

class Link extends Component {
  static propTypes = {
    href:  PropTypes.string.isRequired,
    title: PropTypes.string,
  };

  render() {
    return (
      <a className={styles.root}
         href={this.props.href}
         onClick={this.props.onClick}>
        {this.props.title || this.props.children}
      </a>
    );
  }
};

export default Link;
