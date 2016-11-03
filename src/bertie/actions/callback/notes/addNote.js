import moment from 'moment-timezone';

export default async (forDate, user) => {
  try {
    const data = { type: 'addNote', forDate };
    await user.update({ latestDetectedData: { data, detectedAt: moment().unix() } });
    const date = moment.unix(forDate).format('ddd, DD.MM.YYYY');

    return { message: ['notes.requestNote', { date }] };
  } catch (e) {
    return { message: ['generalErrors.superWrong'] };
  };
};

