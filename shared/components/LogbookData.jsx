import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import { logEventStyle, logbookDataStyle } from './LogbookData.style';

function LogBookData({ logEvents: logEventBundles, timezone }) {
  return (
    <div className="logbookData" style={ logbookDataStyle() }>
      {
        logEventBundles.size > 0 ?
          logEventBundles.map((logEventBundle, i) => {
            const { _id: time , logEvents } = logEventBundle.toObject();
            const { hour, minute } = time.toObject();

            return (
              <div key={i} className="logEventBundle" style={ logEventStyle() }>
                <span>{ moment.utc(`${hour}:${minute}`, 'HH:mm').tz(timezone).format('HH:mm') } </span>


                {
                  ['sugar', 'food', 'therapy'].map((type) =>
                    logEvents.filter(e => e.get('category') === type).map(logEvent => {
                      const { originalValue, originalUnit } = logEvent.toObject();

                      return(
                        <div className="logEvent">
                          <span>{ originalValue } </span>
                          <span>{ originalUnit }</span>
                        </div>
                      );
                    })
                  )
                }
              </div>
            );
          })
        :
        'NO DATA TO SEE HERE'
      }
    </div>
  );
};

LogBookData.propTypes = {
  logEvents: PropTypes.object.isRequired,
  timezone:  PropTypes.string.isRequired
};

export default LogBookData;
