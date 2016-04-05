const units = [
  {
    category: 'food',
    type:     'be',
    tokens:   ['be', 'broteinheit', 'broteinheiten']
  },
  {
    category: 'food',
    type:     'carbUnit',
    tokens:   ['khe', 'cu', 'carbunit', 'carbunits']
    },
  {
    category: 'food',
    type:     'carbs',
    tokens:   ['carbs', 'carbonhydrate', 'carbonhydrates']
  },
  {
    category: 'therapy',
    type:     'basisInsulin',
    tokens:   ['basal', 'basis', 'base', 'long']
  },
  {
    category: 'therapy',
    type:     'lantus',
    tokens:   ['lantus', 'lant']
  },
  {
    category: 'therapy',
    type:     'pumpRate',
    tokens:   ['pump', 'rate']
  },
  {
    category: 'therapy',
    type:     'bolusInsulin',
    tokens:   ['bolus', 'short']
  },
  {
    category: 'therapy',
    type:     'humalog',
    tokens:   ['humalog', 'hum']
  },
  {
    category: 'therapy',
    type:     'tablets',
    tokens:   ['tablet', 'tablets', 'tab', 'pill', 'pills']
  },
  {
    category: 'sugar',
    type:     'sugarMg',
    tokens:   ['mg/dl', 'mg']
  },
  {
    category: 'sugar',
    type:     'sugarMmol',
    tokens:   ['mmol/l', 'mmol']
  }
];

export default function unitsBy(category) {
  return units.filter((u) => u.category == category);
};
