const units = [
  {
    category: 'food',
    type:     'carbs',
    subType:  'be',
    factor:   12,
    tokens:   ['be', 'broteinheit', 'broteinheiten']
  },
  {
    category: 'food',
    type:     'carbs',
    subType:  'carbUnit',
    factor:   10,
    tokens:   ['khe', 'ke', 'cu', 'carbunit', 'carbunits']
    },
  {
    category: 'food',
    type:     'carbs',
    subType:  null,
    factor:   null,
    tokens:   ['carb', 'carbs', 'carbonhydrate', 'carbonhydrates']
  },
  {
    category: 'therapy',
    type:     'basisInsulin',
    subType:  null,
    factor:   null,
    tokens:   ['base', 'basal', 'basis', 'long']
  },
  {
    category: 'therapy',
    type:     'basisInsulin',
    subType:  'lantus',
    factor:   null,
    tokens:   ['lan', 'lant', 'lantus']
  },
  {
    category: 'therapy',
    type:     'basisInsulin',
    subType:  'pumpRate',
    factor:   null,
    tokens:   ['pump', 'rate']
  },
  {
    category: 'therapy',
    type:     'bolusInsulin',
    subType:  null,
    factor:   null,
    tokens:   ['bolus', 'short']
  },
  {
    category: 'therapy',
    type:     'bolusInsulin',
    subType:  'humalog',
    factor:   null,
    tokens:   ['hum', 'humalog']
  },
  {
    category: 'therapy',
    type:     'tablets',
    subType:  null,
    factor:   null,
    tokens:   ['tab', 'tablet', 'tablets']
  },
  {
    category: 'therapy',
    type:     'tablets',
    subType:  'pills',
    factor:   null,
    tokens:   ['pill', 'pills']
  },
  {
    category: 'sugar',
    type:     'sugarMmol',
    subType:  'sugarMg',
    factor:   0.0555,
    tokens:   ['mg', 'mg/dl']
  },
  {
    category: 'sugar',
    type:     'sugarMmol',
    subType:  null,
    factor:   null,
    tokens:   ['mmol', 'mmol/l']
  }
];

export default function unitsBy(category) {
  return units.filter((u) => u.category == category);
};
