import polyglot from '.';
import * as locales from './locales';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export default (locale, polyglotString, polyglotOpts) => {
  const p = polyglot(locale);
  const pathToTexts = polyglotString.split('.');
  const texts = pathToTexts.reduce((p, c) => (p[c]), locales[locale]);
  const max = Object.keys(texts).length + 1;

  return p.t(`${polyglotString}.${getRandomInt(1, max)}`, polyglotOpts);
};

