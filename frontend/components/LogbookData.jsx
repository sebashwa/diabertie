import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LogbookData.css';

function LogbookData({ logEvents: logEventBundles, user }) {
  return (
    <div className={styles.root} >
      <div className={ styles.row }>
        <div>{"time"}</div>
        {
          logEventBundles.map((logEventBundle, i) => {
            const { _id: time } = logEventBundle.toObject();
            const { hour, minute } = time.toObject();

            return (
              <div key={i}>
                { moment.utc(`${hour}:${minute}`, 'HH:mm').tz(user.get('timezone')).format('HH:mm') }
              </div>
            );
          })
        }
      </div>
      {
        ['sugar', 'food', 'therapy'].map(type => {
          return (
            <div className={ styles.row }>
              <div>{type}</div>
              {
                logEventBundles.map((logEventBundle, i) => {
                  const { logEvents } = logEventBundle.toObject();
                  return (
                    <div key={i} className={ styles.logEventBundle } >
                      {
                        logEvents.filter(e => e.get('category') === type).map(logEvent =>
                          <div>{ logEvent.get('originalValue') }</div>
                        )
                      }
                    </div>
                  );
                })
              }
            </div>
          );
        })
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
