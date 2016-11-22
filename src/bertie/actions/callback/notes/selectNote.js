import moment from 'moment-timezone';
import { fetchNotes } from '../../database';
import { btnFactory } from '../../helpers';

export default async (d, user) => {
  try {
    const date = moment.unix(d);
    if (!date.isValid()) { return { message: ['generalErrors.superWrong'] }; };

    const { data } = await fetchNotes(user, date);

    const latestData = data.reduce((p, c, i) => { p[i+1] = c._id; return p; }, {});
    const detectedAt = moment().unix();
    await user.update({ latestDetectedData: { data: latestData, detectedAt } });

    const stringDate = date.tz(user.timezone).format('ddd, DD.MM.YYYY');
    const notes = data.map((n, i) => `${i+1}) ${n.text}`).join('\n');
    const message = ['notes.selectNote', { date: stringDate, notes }];

    const btns = data.map((_, i) => btnFactory.notes.delete(i + 1, detectedAt));
    const rows = Math.floor(btns.length / 8) + 1;
    const buttons = [...Array(rows).keys()].map((i) => btns.slice(i * 8, (i + 1) * 8));

    return { message, buttons };
  } catch (e) {
    console.log(e);
    return { message: ['generalErrors.superWrong'] };
  }
};
