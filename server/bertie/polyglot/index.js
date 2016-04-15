import * as locales from './locales';
import Polyglot from 'node-polyglot';

export default (givenLocale) => {
  const locale = givenLocale || 'en';
  const phrases = locales[locale];

  return new Polyglot({ phrases, locale });
};
