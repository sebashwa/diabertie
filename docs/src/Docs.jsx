import React, { Component } from 'react';
import unitsBy from '../../src/bertie/knwl/units';
import styles from './Docs.style';
import Link from './Link';
import polyglot from './polyglot';

class Docs extends Component {
  render() {
    const p = polyglot();
    const tableRowsForType = (type) => {
      return unitsBy(type).map((unit, i) => {
        return (<tr key={i}>
          <td>{p.t(`units.${unit.subType || unit.type}`)}</td>
          <td>{unit.tokens.join(', ')}</td>
        </tr>);
      });
    };

    return (
      <div style={styles.root}>
        <img style={styles.image} src="bertie.svg" />
        <div style={styles.text}>
          <p>
            {p.t('intro.telegramUsage')} <Link href="https://telegram.org" title="Telegram" />&nbsp;
            <Link href="https://core.telegram.org/bots/api" title="Bot API" />. {p.t('intro.getTelegram')}
          </p>

          <h2 style={styles.highlight}>{p.t('usage.headline')}</h2>
          <p>{p.t('usage.text')}</p>

          <h3 style={styles.highlight}>{p.t('logValues.headline')}</h3>
          <p>{p.t('logValues.intro')}</p>
          <p>{p.t('logValues.example')}</p>
          <code>{p.t('logValues.command1')}</code>
          <p>{p.t('logValues.explanation')}</p>

          <table style={styles.table}>
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
          <p>{p.t('logValues.contact')}</p>
          <p>{p.t('logValues.changeTime')}</p>
          <code>{p.t('logValues.command2')}</code>
          <p>{p.t('logValues.changeDate')}</p>
          <code>{p.t('logValues.command3')}</code>
          <p>{p.t('logValues.thatsAll')}</p>

          <h3 style={styles.highlight}>{p.t('reviewValues.headline')}</h3>
          <p>{p.t('reviewValues.intro')}</p>
          <code>{p.t('reviewValues.command')}</code>
          <p>{p.t('reviewValues.navigate')}</p>
          <p>{p.t('thatsAll')}</p>
        </div>
      </div>
    );
  }
}

export default Docs;
