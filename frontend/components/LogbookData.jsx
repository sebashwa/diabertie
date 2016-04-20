import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LogbookData.css';

function LogbookData({ logEvents: logEventBundles, user, p }) {
  return (
    <div className={ styles.logbookData } >
      {
        logEventBundles.size > 0 ?
          logEventBundles.map((logEventBundle, i) => {
            const { _id: time , logEvents } = logEventBundle.toObject();
            const { hour, minute } = time.toObject();
            const { timezone } = user.toObject();

            return (
              <div key={i} className={ styles.logEventBundle } >
                <span>{ moment.utc(`${hour}:${minute}`, 'HH:mm').tz(timezone).format('HH:mm') } </span>


                {
                  ['sugar', 'food', 'therapy'].map((type) =>
                    logEvents.filter(e => e.get('category') === type).map(logEvent => {
                      const { originalValue, originalUnit } = logEvent.toObject();

                      return(
                        <div className={ styles.logEvent }>
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

LogbookData.propTypes = {
  logEvents: PropTypes.object.isRequired,
  user:      PropTypes.object.isRequired,
  p:         PropTypes.object.isRequired
};

export default withStyles(styles)(LogbookData);
