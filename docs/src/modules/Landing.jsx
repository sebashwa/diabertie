import React, { Component } from 'react';
import styles from './Landing.css';
import polyglot from '../polyglot';

class Landing extends Component {
  renderLine(type, i) {
    const p = polyglot();

    const even = i % 2 == 0;
    const cssClass = even ? `${styles.line} ${styles.reverse}` : styles.line;

    return (
      <div key={i} className={cssClass}>
        <img className={styles.image} src={`img/${type}.png`} />
        <div>
          <h2>{p.t(`landing.${type}.heading`)}</h2>
          <p>{p.t(`landing.${type}.text`)}</p>
        </div>
      </div>
    );
  }

  render() {
    const p = polyglot();

    return (
      <div className={styles.root}>
        <div className={styles.line}>
          <img className={styles.bertie} src="img/bertie_bubble.svg" />
          <div>
            <h1>{p.t('landing.teaser.heading')}</h1>
            <h2>{p.t('landing.teaser.sub')}</h2>
          </div>
        </div>


        {
          ['logValues', 'getReminders', 'addNotes'].map((type, i) => {
            return this.renderLine(type, i);
          })
        }
      </div>
    );
  }
}

export default Landing;
