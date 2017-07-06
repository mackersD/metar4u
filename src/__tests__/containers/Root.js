import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../containers/Root';

it('Root renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
});
