import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as logbookActions from 'actions/LogbookActions';

import styles from './LogbookNavigation.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class LogbookNavigation extends Component {
  static propTypes = {
    changeDate: PropTypes.func.isRequired,
    datum:      PropTypes.object.isRequired,
    p:          PropTypes.object.isRequired
  };

  handleDateChange = (alteration) => {
    return (e) => {
      e.preventDefault();

      const { datum, changeDate } = this.props;
      changeDate(datum, alteration);
    };
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
      <div className={styles.root}>
        <a onClick={ this.handleDateChange(-1) } >{ '<' }</a>
        <h1>{ formattedDatum }</h1>
        <a onClick={ this.handleDateChange(1) }>{ '>' }</a>
      </div>
    );
  }
}

export default connect(null, { ...logbookActions })(withStyles(styles)(LogbookNavigation));
