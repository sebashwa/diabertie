export default {
  Landing: {
    bertieWelcome: 'Hey, my name is Bertie! I\'m your personal diabetes chatbot.',
    signup:        'Signup',
    login:         'Login'
  },
  App: {
    logout: 'Logout'
  },
  Introduction: {
    connect: 'Connect'
  },
  Logbook: {
    logEvents: {
      be:           '%{smart_count} BE |||| %{smart_count} BE',
      carbUnit:     '%{smart_count} KHE |||| %{smart_count} KHE',
      carbs:        '%{smart_count}g carbs |||| %{smart_count}g carbs',
      basisInsulin: '%{smart_count} Basal |||| %{smart_count} Basal',
      lantus:       '%{smart_count} Lantus |||| %{smart_count} Lantus',
      pumpRate:     '%{smart_count} Pump base rate |||| %{smart_count} Pump base rate',
      bolusInsulin: '%{smart_count} Bolus |||| %{smart_count} Bolus',
      humalog:      '%{smart_count} Humalog |||| %{smart_count} Humalog',
      tablets:      '%{smart_count} Tablet |||| %{smart_count} Tablets',
      pills:        '%{smart_count} Pill |||| %{smart_count} Pills',
      sugarMg:      '%{smart_count} mg/dL |||| %{smart_count} mg/dL',
      sugarMmol:    '%{smart_count} mmol/L |||| %{smart_count} mmol/L'
    },
    dateTime: {
      today:      'Today',
      tomorrow:   'Tomorrow',
      yesterday:  'Yesterday',
      dateFormat: 'DD/MM/YYYY'
    },
    noDataAvailable: 'Oh, there is no data for this day yet'
  }
};
