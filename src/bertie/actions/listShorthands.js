import unitsBy from '../knwl/units';

export default (p) => {
  const shorthandList = ['food', 'sugar', 'therapy'].map((c) => {
    const tokens = unitsBy(c).reduce((p, c) => { p[c.subType || c.type] = c.tokens; return p; }, {});
    const tokensPerSubType = Object.keys(tokens).map((st) => `${p.t(`subTypes.${st}`)}: ${tokens[st].join(', ')}`).join('\n');

    return `${p.t(`icons.${c}`)} *${p.t(`categories.${c}`)}:*\n${tokensPerSubType}`;
  }).join('\n\n');

  return { message: ['shorthandList', { shorthandList }] };
};

