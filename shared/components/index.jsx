import React, { PropTypes } from 'react';

export default class Main extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div id="main">
        {this.props.children}
      </div>
    );
  }
}
