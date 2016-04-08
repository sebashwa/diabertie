import Knwl from 'knwl.js';
import { BertieValue, BertieTime, BertieDate } from './plugins';

export default function (string, locale) {
  const instance = new Knwl(locale || 'english');
  instance.register('bertieValues', BertieValue);
  instance.register('bertieTime', BertieTime);
  instance.register('bertieDate', BertieDate);
  instance.init(string);

  return instance;
};
