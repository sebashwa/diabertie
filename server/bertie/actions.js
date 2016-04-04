import User from '../models/User';

export const connectBot = (telegramToken, sender) => {
  const telegramId = sender.id;

  return User.find({ $or: [{ telegramToken },  { telegramId }] }).then((users) => {
    if (users.length == 0) {
      return 'Oops! I was not able to find a user. Please sign up at diabertie.com first and connect from there';
    } else if (users.length > 1) {
      const connectedUser = users.filter(u => !!u.telegramId)[0];
      return `Oops, you are already connected with the account ${connectedUser.email}`;
    } else if (!users[0].telegramId) {
      return users[0].update({ telegramId }).then(() => {
        return `Hey ${sender.first_name}, I connected you with your diabertie account ${users[0].email}. Glad to have you on board!`;
      });
    } else {
      return `Your account ${users[0].email} seems to be connected already`;
    }
  }).catch(err => { console.error(err); });
};


export const detectValues = (msg) => {
  return new Promise(function(resolve) {
    const words = msg.text.split(/\s/);

    if (words.length == 1) resolve('I do not get you');

    const units = {
      meals:    ['khe', 'be'],
      insulins: ['basal', 'base', 'bolus', 'hum', 'humalog', 'lantus', 'lant'],
      sugar:    ['mmol', 'mg', 'bloodsugar', 'bs']
    };

    let results = {};

    Object.keys(units).forEach((type) => {
      units[type].forEach((unit) => {
        const unitPosition = words.findIndex((w) => w == unit);
        if (unitPosition == -1) return false;

        const value = parseFloat(words[unitPosition - 1].replace(',','.'));
        if (!value) return false;

        results[type] = results[type] || [];
        results[type].push({ value, unit });
      });
    });

    const resultStrings = Object.keys(results).map((type) => {
      const values = results[type];
      const valueStrings = values.map(v => `${v.value} ${v.unit}`);

      return `_${type}:_ ${valueStrings.join(', ')}`;
    });

    resolve(`Hey I detected the following\n\n ${resultStrings.join('\n')}`);
  });
};
