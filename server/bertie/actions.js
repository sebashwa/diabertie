import User from '../models/User';
import knwl from './knwl';
import unitsBy from './knwl/units';

export const connectBot = (telegramToken, sender) => {
  const telegramId = sender.id;

  return User.find({ $or: [{ telegramToken }, { telegramId }] }).then((users) => {
    if (users.length == 0) {
      return 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there';
    } else if (users.length > 1) {
      const connectedUser = users.filter(u => !!u.telegramId)[0];
      return `Sorry, you are already connected with the account \`${connectedUser.email}\``;
    } else if (!users[0].telegramId) {
      return users[0].update({ telegramId }).then(() => {
        return `Hey ${sender.first_name}, I connected you with your diabertie account \`${users[0].email}\` Glad to have you on board!`;
      });
    } else {
      return `Your account \`${users[0].email}\` is already connected. Just go ahead and log some values!`;
    }
  }).catch(err => { console.error(err); });
};

const previewTexts = (events) => events.map(e => `\`${e.value} ${e.subType || e.type}\``).join(', ');

function validateDetections({ sugar, therapy, food }) {
  const all = [... sugar, ... therapy, ... food];
  const errors = [];
  const warnings = [];

  if (all.length == 0) { errors.push('Sorry, I didn\'t get that! To track values, please write something like:\n\n`190 mg 2 bolus 27 basal 12:30`'); };
  if (sugar.length > 1) { warnings.push(`Oops, that's strange.. I found more than one \`sugar\` value:\n\n${previewTexts(sugar)}`); }

  return { errors, warnings };
}

export const detectValues = (text) => {
  return new Promise((resolve) => {
    const parser = knwl(text);
    const types = ['sugar', 'food', 'therapy'];

    const detections = types.reduce((prev, type) => {
      prev[type] = parser.get('bertieValues', unitsBy(type));
      return prev;
    }, {});

    const { errors, warnings } = validateDetections(detections);
    if (errors.length) return resolve({ errors });

    const detectionsMsg = types.filter(type => !!detections[type].length)
      .map((type) => `${previewTexts(detections[type])}`)
      .join('\n');

    const messages = [detectionsMsg, `Do you want me to save that? (y/n)`];
    return resolve({ data: detections, messages, warnings });
  });
};
