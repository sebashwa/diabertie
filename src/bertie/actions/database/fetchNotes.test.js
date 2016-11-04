import expect from 'unexpected';
import moment from 'moment-timezone';
import fetchNotes from './fetchNotes';
import { User, Note } from '../../../models';

describe('bertie actions database #fetchNotes', () => {
  let user1, user2;
  const forDate = moment().unix()

  beforeEach(async () => {
    user1 = await User.create({ telegramId: 12421978 })
    user2 = await User.create({ telegramId: 29418982 })
   })

  it('scopes the note fetching per user', async () => {
    await Note.create({user: user1.id, text: 'some note', forDate });

    const { data: user1Fetch } = await fetchNotes(user1, moment(forDate));
    const { data: user2Fetch } = await fetchNotes(user2, moment(forDate));

    expect(user1Fetch, 'to be ok');
    expect(user2Fetch, 'to be ok');
    expect(user1Fetch, 'not to be empty');
    expect(user2Fetch, 'to be empty');
  })
})
