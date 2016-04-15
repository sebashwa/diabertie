import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import { logEventStyle, logbookDataStyle } from './LogbookData.style';

function LogBookData({ logEvents: logEventBundles, user, p }) {
  return (
    <div className="logbookData" style={ logbookDataStyle() }>
      {
        logEventBundles.size > 0 ?
          logEventBundles.map((logEventBundle, i) => {
            const { _id: time , logEvents } = logEventBundle.toObject();
            const { hour, minute } = time.toObject();
            const { timezone } = user.toObject();

            return (
              <div key={i} className="logEventBundle" style={ logEventStyle() }>
                <span>{ moment.utc(`${hour}:${minute}`, 'HH:mm').tz(timezone).format('HH:mm') } </span>


                {
                  ['sugar', 'food', 'therapy'].map((type) =>
                    logEvents.filter(e => e.get('category') === type).map(logEvent => {
                      const { originalValue, originalUnit } = logEvent.toObject();

                      return(
                        <div className="logEvent">
                          <span>{ p.t(`Logbook.logEvents.${originalUnit}`, originalValue)}</span>
                        </div>
                      );
                    })
                  )
                }
              </div>
            );
          })
        :
        p.t('Logbook.noDataAvailable')
      }
    </div>
  );
};

LogBookData.propTypes = {
  logEvents: PropTypes.object.isRequired,
  user:      PropTypes.string.isRequired,
  p:         PropTypes.object.isRequired
};

export default LogBookData;
