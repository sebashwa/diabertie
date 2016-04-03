import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <Link to="signup">Signup</Link>
        <Link to="login">Login</Link>
      </div>
    );
  }
}
