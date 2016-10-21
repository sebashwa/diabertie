import moment from 'moment-timezone';

const deletion = (logEventGroups, p, timezone) => {
  let valueNumber = 0;

  return logEventGroups.map((logEventGroup) => {
        const dayOfYear = logEventGroup._id.day;
        delete logEventGroup._id.day;

        const time = moment.utc(logEventGroup._id).dayOfYear(dayOfYear).tz(timezone).format('HH:mm');
        const values = logEventGroup.logEvents.map((logEvent) => {
          valueNumber = valueNumber + 1;
          return `${valueNumber}) ${p.t(`icons.${logEvent.category}`)} ${logEvent.originalValue}`;
        }).join('\n');

        return `*${time}* \n${values}`;
      }).join('\n\n');
};

const diary = (logEventGroups, p, timezone) => {
  return logEventGroups.map((logEventGroup) => {
        const dayOfYear = logEventGroup._id.day;
        delete logEventGroup._id.day;

        const time = moment.utc(logEventGroup._id).dayOfYear(dayOfYear).tz(timezone).format('HH:mm');
        const values = logEventGroup.logEvents.map((logEvent) => {
          return `${p.t(`icons.${logEvent.category}`)} ${logEvent.originalValue}`;
        }).join(' ');

        return `*${time}* \n ${values}`;
      }).join('\n\n');
};

export default {
  diary,
  deletion,
};
