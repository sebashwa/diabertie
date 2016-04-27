import React, { PropTypes } from 'react';
import moment from 'moment-timezone';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './LogbookData.css';

import Sugar from 'images/Sugar';
import Food from 'images/Food';
import Therapy from 'images/Therapy';

const icons = {
  sugar:   <Sugar className={styles.icon} />,
  food:    <Food className={styles.icon} />,
  therapy: <Therapy className={styles.icon} />
};

function LogbookData({ logEvents: logEventBundles, user }) {
  return (
    <div className={styles.root} >
      <div className={ styles.row }>
        <div></div>
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
              <div>{ icons[type] }</div>
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
