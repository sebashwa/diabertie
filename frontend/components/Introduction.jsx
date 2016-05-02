import React, { PropTypes } from 'react';
import polyglot from 'lib/polyglot';

const p = polyglot();

function Introduction ({ user, botName }) {
  return (
    <a href={ `http://telegram.me/${botName}?start=${user.get('telegramToken')}` } target="_blank">
      { p.t('Introduction.connect') }
    </a>
  );
};

Introduction.propTypes = {
  user:    PropTypes.object.isRequired,
  botName: PropTypes.string.isRequired
};

export default Introduction;
