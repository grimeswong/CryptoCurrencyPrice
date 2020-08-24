import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.js';


// to test the title isn't match "Cryptocurrency Portfolio"
test('get title of application', () => { // method("description of the test")
  const { getByText } = render(<App />);
  const h1Title = getByText(/Cryptocurrency Portfolio/i);
  expect(h1Title).toBeInTheDocument();
});
