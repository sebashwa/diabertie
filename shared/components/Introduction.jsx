import React from 'react';

export default ({ user, botName }) => {
  return (
    <a href={ `http://telegram.me/${botName}?start=${user.get('telegramToken')}` } target="_blank">Connect</a>
  );
};
