import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LogbookData.css';

import Time from 'images/Time';
import Sugar from 'images/Sugar';
import Food from 'images/Food';
import Therapy from 'images/Therapy';

function LogbookData({ logEvents: logEventBundles, user, p }) {
  return (
    logEventBundles.length == 0 ?
    <div className={styles.root}>
      <span className={styles.noData}>
        {p.t('Logbook.noDataAvailable')}
      </span>
    </div>
    :
    <div className={styles.root}>
      <div className={styles.icons}>
        <Time className={styles.icon}/>
        <Sugar className={styles.icon} />
        <Food className={styles.icon} />
        <Therapy className={styles.icon} />
      </div>
      <div className={styles.rows} >
        <div className={styles.row}>
          {
            logEventBundles.map((logEventBundle, i) => {
              const { _id: time } = logEventBundle.toObject();
              const { hour, minute } = time.toObject();
              const formattedTime = moment.utc(`${hour}:${minute}`, 'HH:mm').tz(user.get('timezone')).format('HH:mm');

              return (<div><b key={i}>{ formattedTime }</b></div>);
            })
          }
        </div>
        {
          ['sugar', 'food', 'therapy'].map(type => {
            return (
              <div className={ styles.row }>
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
    </div>
  );
};

LogbookData.propTypes = {
  logEvents: PropTypes.object.isRequired,
  user:      PropTypes.object.isRequired,
  p:         PropTypes.object.isRequired
};

export default withStyles(styles)(LogbookData);
