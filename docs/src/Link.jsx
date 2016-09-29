import React, { PropTypes, Component } from 'react';
import styles from './Link.style';

class Link extends Component {
  static propTypes = {
    href:  PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <a style={styles.root} href={this.props.href}>{this.props.title}</a>
    );
  }
};

export default Link;
