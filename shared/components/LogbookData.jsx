import React from 'react';

export default ({ logEvents }) => {
  return (
    <div className="logbookData">
      { logEvents.size > 0 ?
        logEvents.map((logEvent, i) => {
        const { createdAt, originalValue, originalUnit, category } = logEvent.toObject();

        return (
          <div key={i} className="event">
            <span>{ createdAt } </span>
            <span>{ category } </span>
            <span>{ originalValue } </span>
            <span>{ originalUnit } </span>
          </div>
        );
      }) : 'NO DATA TO SEE HERE' }
    </div>
  );
};
