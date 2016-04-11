import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeDate } from 'actions/LogbookActions';

class LogbookNavigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    datum:    PropTypes.string.isRequired,
    timezone: PropTypes.string.isRequired
  };

  handleDateChange = (alteration) => {
    const { datum, timezone, dispatch } = this.props;

    dispatch(changeDate(datum, timezone, alteration));
  }

  render() {
    const { datum } = this.props;

    return(
      <div className="logbook-navigation">
      <a onClick={ () => this.handleDateChange(-1) } >previous</a>
      <h1>{ datum }</h1>
      <a onClick={ () => this.handleDateChange(1) }>next</a>
      </div>
    );
  }
}

export default connect()(LogbookNavigation);
