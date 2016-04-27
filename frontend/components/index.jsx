import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './index.css';

class Main extends React.Component {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    return (
      <div className={ styles.root }>
        { this.props.children }
      </div>
    );
  }
}

export default withStyles(styles)(Main);
