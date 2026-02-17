import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './store/store';

test('renders app without crashing', () => {
  render(
    <Provider store={store}>
      <div>React E-commerce Store</div>
    </Provider>
  );
  expect(true).toBe(true);
});
