import moment from 'moment-timezone';
import { fetchLogEvents } from '../../database';
import { btnFactory } from '../../helpers';
import { formatters } from '../helpers';

export default async (date, user) => {
  date = moment.utc(date).tz(user.timezone);
  if (!date.isValid()) { return { message: ['generalErrors.superWrong'] }; };

  const { error, data } = await fetchLogEvents(user, date);
  if (error) { return { message: error }; }

  const logEventsFlat = data.reduce((prev, curr) => prev.concat(curr.logEvents), []);
  const detectedAt = moment().unix();

  const buttons = logEventsFlat.map((_, i) => btnFactory.deletion.process(i + 1, detectedAt));
  const rows = Math.floor(buttons.length / 8) + 1;

  const logEventsMap = logEventsFlat.reduce((prev, curr, i) => {
    prev[i + 1] = curr._id;
    return prev;
  }, {});

  await user.update({ latestDetectedData: { detectedAt, data: logEventsMap } });

  date = date.format('ddd, DD.MM.YYYY');
  const values = formatters.deletion(data, user);
  const message = ['deletion.selectValue', { date, values }];

  const newBtns = [...Array(rows).keys()].map((i) => buttons.slice(i * 8, (i + 1) * 8));

  return { message, buttons: newBtns };
};
