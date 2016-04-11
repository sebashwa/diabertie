import React from 'react';
import { logEventStyle, logbookDataStyle } from './LogbookData.style';

export default ({ logEvents }) => {
  return (
    <div className="logbookData" style={ logbookDataStyle() }>
      { logEvents.size > 0 ?
        logEvents.map((logEvent, i) => {
        const { createdAt, originalValue, originalUnit, category } = logEvent.toObject();

        return (
            <span>{ createdAt } </span>
          <div key={i} className="logEvent" style={ logEventStyle() }>
            <span>{ category } </span>
            <span>{ originalValue } </span>
            <span>{ originalUnit } </span>
          </div>
        );
      }) : 'NO DATA TO SEE HERE' }
    </div>
  );
};
