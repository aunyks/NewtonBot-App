import React from 'react';
import NewtonBot from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<NewtonBot/>).toJSON();
  expect(rendered).toBeTruthy();
});
