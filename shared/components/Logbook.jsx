import React from 'react';

export default ({ logEvents }) => {
  return (
    <div className="logbook">
      {
        logEvents.map((logEvent) => {
          return (
            <div className="event">
              <span>{ logEvent.get('createdAt') }</span>
              <span>{ logEvent.get('category') }</span>
              <span>{ logEvent.get('value') }</span>
            </div>
          );
        })
      }
    </div>
  );
};
