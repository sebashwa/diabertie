import React, { PropTypes } from 'react';

export default class Main extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return (
      <div id="main">
        <h1>Diabertie</h1>

        {this.props.children}
      </div>
    );
  }
}
