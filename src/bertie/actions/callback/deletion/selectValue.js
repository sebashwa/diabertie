import moment from 'moment-timezone';
import { fetchLogEvents } from '../../database';
import { btnFactory } from '../../helpers';

export default async (date, user, p) => {
  date = moment.utc(date).tz(user.timezone);
  if (!date.isValid()) { return { message: p.t('generalErrors.superWrong')}; };

  const { message, error, data } = await fetchLogEvents(user, date, 'deletion');
  if (error) { return { message: p.t(...error) }; }


  const logEventsFlat = data.reduce((prev, curr) => prev.concat(curr.logEvents), []);
  const detectedAt = moment().unix();

  const buttons = logEventsFlat.map((_, i) => btnFactory.deletion.process(i + 1, detectedAt));
  const rows = Math.floor(buttons.length / 8) + 1;


  const logEventsMap = logEventsFlat.reduce((prev, curr, i) => {
    prev[i + 1] = curr._id;
    return prev;
  }, {});

  await user.update({ latestDetectedData: { detectedAt, data: logEventsMap } });

  const newMsg = `${p.t('deletion.selectValue')}${message}`;
  const newBtns = [...Array(rows).keys()].map((i) => buttons.slice(i * 8, (i + 1) * 8));

  return { message: newMsg, buttons: newBtns };
};
