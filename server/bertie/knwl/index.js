import Knwl from 'knwl.js';
import BertieValue from './plugins/BertieValue';

export default function (string, locale) {
  const instance = new Knwl(locale || 'english');
  instance.register('bertieValues', BertieValue);
  instance.init(string);

  return instance;
};
