import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Modal.css';

class Modal extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div className={ styles.container }>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(Modal);
