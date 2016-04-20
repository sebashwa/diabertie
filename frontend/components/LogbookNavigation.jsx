import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeDate } from 'actions/LogbookActions';

class LogbookNavigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    datum:    PropTypes.object.isRequired,
    p:        PropTypes.object.isRequired
  };

  handleDateChange = (alteration) => {
    const { datum, dispatch } = this.props;
    dispatch(changeDate(datum, alteration));
  }

  render() {
    const { datum, p } = this.props;

    const formattedDatum = datum.calendar(null, {
      sameDay:  `[${p.t('Logbook.dateTime.today')}]`,
      nextDay:  `[${p.t('Logbook.dateTime.tomorrow')}]`,
      lastDay:  `[${p.t('Logbook.dateTime.yesterday')}]`,
      lastWeek: `${p.t('Logbook.dateTime.dateFormat')}`,
      nextWeek: `${p.t('Logbook.dateTime.dateFormat')}`,
      sameElse: `${p.t('Logbook.dateTime.dateFormat')}`
    });

    return(
      <div className="logbook-navigation">
      <a onClick={ () => this.handleDateChange(-1) } >{ '<' }</a>
      <h1>{ formattedDatum }</h1>
      <a onClick={ () => this.handleDateChange(1) }>{ '>' }</a>
      </div>
    );
  }
}

export default connect()(LogbookNavigation);
