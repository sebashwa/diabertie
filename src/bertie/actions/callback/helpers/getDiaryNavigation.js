import { btnFactory, timeline } from '../../helpers';

export default (type, date, user) => {
  const tl = timeline(user, date);

  const buttons = [btnFactory[type].back(tl.str.prevDay)];

  if (tl.str.today != date.format('YYYY-MM-DD')) {
    buttons.push(
      btnFactory[type].forward(tl.str.nextDay),
      btnFactory[type].today(tl.str.today)
    );
  }

  return { buttons };
};
