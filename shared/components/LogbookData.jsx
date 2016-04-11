import React from 'react';
import moment from 'moment-timezone';
import { logEventStyle, logbookDataStyle } from './LogbookData.style';

export default ({ logEvents, timezone }) => {
  return (
    <div className="logbookData" style={ logbookDataStyle() }>
      { logEvents.size > 0 ?
        logEvents.map((logEvent, i) => {
        const { createdAt, originalValue, originalUnit, category } = logEvent.toObject();

        return (
          <div key={i} className="logEvent" style={ logEventStyle() }>
            <span>{ moment(createdAt).tz(timezone).format('HH:mm') } </span>
            <span>{ category } </span>
            <span>{ originalValue } </span>
            <span>{ originalUnit } </span>
          </div>
        );
      }) : 'NO DATA TO SEE HERE' }
    </div>
  );
};
