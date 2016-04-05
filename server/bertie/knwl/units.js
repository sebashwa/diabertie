const units = [
  {
    category:   'food',
    type:       'be',
    parentType: 'carbs',
    factor:     12,
    tokens:     ['be', 'broteinheit', 'broteinheiten']
  },
  {
    category:   'food',
    type:       'carbUnit',
    parentType: 'carbs',
    factor:     10,
    tokens:     ['khe', 'cu', 'carbunit', 'carbunits']
    },
  {
    category:   'food',
    type:       'carbs',
    parentType: null,
    factor:     null,
    tokens:     ['carbs', 'carbonhydrate', 'carbonhydrates']
  },
  {
    category:   'therapy',
    type:       'basisInsulin',
    parentType: null,
    factor:     null,
    tokens:     ['basal', 'basis', 'base', 'long']
  },
  {
    category:   'therapy',
    type:       'lantus',
    parentType: 'basisInsulin',
    factor:     null,
    tokens:     ['lantus', 'lant']
  },
  {
    category:   'therapy',
    type:       'pumpRate',
    parentType: 'basisInsulin',
    factor:     null,
    tokens:     ['pump', 'rate']
  },
  {
    category:   'therapy',
    type:       'bolusInsulin',
    parentType: null,
    factor:     null,
    tokens:     ['bolus', 'short']
  },
  {
    category:   'therapy',
    type:       'humalog',
    parentType: 'bolusInsulin',
    factor:     null,
    tokens:     ['humalog', 'hum']
  },
  {
    category:   'therapy',
    type:       'tablets',
    parentType: null,
    factor:     null,
    tokens:     ['tablet', 'tablets', 'tab', 'pill', 'pills']
  },
  {
    category:   'sugar',
    type:       'sugarMg',
    parentType: 'sugarMmol',
    factor:     0.0555,
    tokens:     ['mg/dl', 'mg']
  },
  {
    category:   'sugar',
    type:       'sugarMmol',
    parentType: null,
    factor:     null,
    tokens:     ['mmol/l', 'mmol']
  }
];

export default function unitsBy(category) {
  return units.filter((u) => u.category == category);
};
