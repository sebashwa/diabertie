import React, { Component } from 'react';
import unitsBy from '../../../src/bertie/knwl/units';
import styles from './HowTo.css';
import Link from './shared/Link';
import linkStyles from './shared/Link.css';
import polyglot from '../polyglot';

class HowTo extends Component {
  constructor() {
    super();
    this.scrollToAnchor = this.scrollToAnchor.bind(this);
  }

  scrollToAnchor(name) {
    const anchor = this.refs[name];
    if (anchor) { anchor.scrollIntoView(); };
  }

  render() {
    const p = polyglot();
    const tableRowsForType = (type) => {
      return unitsBy(type).map((unit, i) => {
        return (<tr key={i}>
          <td>{p.t(`howTo.units.${unit.subType || unit.type}`)}</td>
          <td>{unit.tokens.join(', ')}</td>
        </tr>);
      });
    };

    return (
      <div className={styles.root} >
        <img className={styles.paper} src="img/howto.svg" />

        <p>
          {p.t('howTo.intro.telegramUsage')} <Link href="https://telegram.org" title="Telegram" />&nbsp;
          <Link href="https://core.telegram.org/bots" title="Bot" /> {p.t('howTo.intro.getTelegram')} <code>{p.t('howTo.intro.botName')}</code> {p.t('howTo.intro.rest')}
        </p>

        <h1>{p.t('howTo.usage.headline')}</h1>
        <p>{p.t('howTo.usage.text')}</p>

        {
          ['logValues', 'reviewValues', 'deleteValue', 'addNote'].map((t, i) => {
            return <span className={linkStyles.root} onClick={() => this.scrollToAnchor(t)}>{p.t(`howTo.quickjump.${t}`)}</span>
          })
        }

        <h2 ref="logValues">{p.t('howTo.logValues.headline')}</h2>
        <p>{p.t('howTo.logValues.intro')}</p>
        <p>{p.t('howTo.logValues.example')}</p>
        <code>{p.t('howTo.logValues.command1')}</code>
        <p>{p.t('howTo.logValues.explanation')}</p>

        <table className={styles.table}>
          <tbody>
            <tr>
              <th>Type</th>
              <th>Abbreviations</th>
            </tr>
            {tableRowsForType('sugar')}
            {tableRowsForType('food')}
            {tableRowsForType('therapy')}
          </tbody>
        </table>
        <p>{p.t('howTo.logValues.contact')}</p>
        <p>{p.t('howTo.logValues.changeTime')}</p>
        <code>{p.t('howTo.logValues.command2')}</code>
        <p>{p.t('howTo.logValues.changeDate')}</p>
        <code>{p.t('howTo.logValues.command3')}</code>
        <p>{p.t('howTo.logValues.thatsAll')}</p>

        <h2 ref="reviewValues">{p.t('howTo.reviewValues.headline')}</h2>
        <p>{p.t('howTo.reviewValues.intro')}</p>
        <code>{p.t('howTo.reviewValues.command')}</code>
        <p>{p.t('howTo.reviewValues.navigate')}</p>

        <h2 ref="deleteValue">{p.t('howTo.deleteValue.headline')}</h2>
        <p>{p.t('howTo.deleteValue.intro')}</p>
        <code>{p.t('howTo.deleteValue.command')}</code>
        <p>{p.t('howTo.deleteValue.selectDate')}</p>
        <p>{p.t('howTo.deleteValue.selectValue')}</p>

        <h2 ref="addNote">{p.t('howTo.notes.headline')}</h2>
        <p>{p.t('howTo.notes.intro')}</p>
        <code>{p.t('howTo.notes.command')}</code>
        <p>{p.t('howTo.notes.selectDate')}</p>

        <p className={styles.feedback}>{p.t('howTo.thatsAll')}</p>
      </div>
    );
  }
}

export default HowTo;
