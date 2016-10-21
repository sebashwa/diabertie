import moment from 'moment-timezone';
import { btnFactory } from '../..';

export default (type, date, user) => {
  const today = moment.utc().tz(user.timezone).format('YYYY-MM-DD');
  const prevDay = date.clone().subtract(1, 'days').format('YYYY-MM-DD');

  const buttons = [btnFactory[type].back(prevDay)];

  if (today != date.format('YYYY-MM-DD')) {
    const nextDay = date.clone().add(1, 'days').format('YYYY-MM-DD');
    buttons.push(
      btnFactory[type].forward(nextDay),
      btnFactory[type].today(today)
    );
  }

  return { buttons };
};
