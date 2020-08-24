import React from 'react';
import { render } from '@testing-library/react';
import App from '../App.js';



describe('get title', () => {

  const { getByText } = render(<App />);
  // to test the title whether match the text of "Cryptocurrency Portfolio"
  test('match text', () => { // method("description of the test")
    const text = getByText(/Cryptocurrency Portfolio/i);
    expect(text).toBeInTheDocument();
  });

  // to test the h1 text
  test('get the h1 text', () => {
    const { getByText } = render(<App />);
    const h1Text = document.querySelector(".container>h1").innerHTML;
    expect(h1Text).toBe("Cryptocurrency Portfolio");
  })
})
