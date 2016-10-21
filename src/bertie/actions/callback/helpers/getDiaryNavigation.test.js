import expect from 'unexpected';
import moment from 'moment-timezone';
import { getDiaryNavigation } from '.';
import { User } from '../../../../models';

describe('bertie action #getDiaryNavigation', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      telegramId: 1234567890,
      timezone:   'Europe/Berlin',
    });

    return user;
  });

  it('returns a back button if requested date is current day', () => {
    const today = moment.utc().tz(user.timezone);
    const result = getDiaryNavigation('navigateDiary', today, user);
    const yesterday = today.clone().subtract(1, 'days').format('YYYY-MM-DD');

    return expect(result, 'to equal', {
      buttons: [ { text: '<<', callback_data: `{"type":"navigateDiary","data":"${yesterday}"}` } ]
    });
  });

  it('returns a back, forward and today button if requested date is not current day', () => {
    const today = moment.utc().tz(user.timezone);
    const yesterday = today.clone().subtract(1, 'days');
    const twoDaysAgo = yesterday.clone().subtract(1, 'days').format('YYYY-MM-DD');

    const result = getDiaryNavigation('navigateDiary', yesterday, user);

    return expect(result, 'to equal', {
      buttons: [
        { text: '<<', callback_data: `{"type":"navigateDiary","data":"${twoDaysAgo}"}` },
        { text: '>>', callback_data: `{"type":"navigateDiary","data":"${today.format('YYYY-MM-DD')}"}` },
        { text: 'today', callback_data: `{"type":"navigateDiary","data":"${today.format('YYYY-MM-DD')}"}` },
      ]
    });
  });
});
