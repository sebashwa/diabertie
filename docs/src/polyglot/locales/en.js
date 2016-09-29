/* eslint-disable key-spacing */

export default {
  intro: {
    telegramUsage: `This is the Diabertie chatbot documentation page.
      Diabertie uses the awesome`,
    getTelegram: `So to use Diabertie you have to get Telegram, which is available for all
      platforms commonly used nowadays.
      After installing Telegram, just search for a contact named @diabertiebot and
      start writing him your diabetes values.`
  },
  usage: {
    headline: 'Usage',
    text: `This guide is here to help you get started using Diabertie for your daily
      diabetes logging.`
  },
  units: {
    be:           'BE',
    carbUnit:     'KHE',
    carbs:        'carbs',
    basisInsulin: 'Basal',
    lantus:       'Lantus',
    pumpRate:     'Pump base rate',
    bolusInsulin: 'Bolus',
    humalog:      'Humalog',
    tablets:      'Tablet',
    pills:        'Pill',
    sugarMg:      'mg/dL',
    sugarMmol:    'mmol/L'
  },
  logValues: {
    headline: 'Log values',
    intro: `To log values, usually all you have to do is write Diabertie a one line
       text message. Let's get started with an example:`,
    example: `You just measured your sugar value, ate something and injected the appropriate
      insulin dose. This is all you have to write to Diabertie to save your actions:`,
    command1: '5.5 mmol 24 carbs 4 hum',
    explanation: `Diabertie detects that you measure your sugar value in mmol/l,
      his food in grams carbonhydrate and uses Humalog as his insulin.
      Besides those units, Diabertie understands much more. Here is a list with
      all the abbreviations that you can use, if you want to log values
      in the various units:`,
    contact: 'If you miss any units in this table, please contact me and I will add them as soon as possible.',
    changeTime: `Of course it is also possible to change the time and date of your logging.
      In the example above, you could have logged those values some hours later and add a timestamp:`,
    command2: '10:00 5.5 mmol 24 carbs 4 hum',
    changeDate: 'Or even days later and add a date:',
    command3: '21.05. 10:00 5.5 mmol 24 carbs 4 hum',
    thatsAll: 'And that is all you need to know, to log values using Diabertie.'
  },
  reviewValues: {
    headline: 'Review values',
    intro: 'To get an overview of the values that you have logged so far, just send',
    command: '/diary',
    navigate: 'to Diabertie. This way you get your values presented together with a neat interface to browse through them.',
  },
  thatsAll: `This is all you can do with Diabertie so far. If you have any suggestions on how to improve or just want to give me
    feedback (bad or good), please feel free to contact me.`
};
