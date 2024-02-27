import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('Unit::App', () => {
  beforeEach(() => {
    render(<App />);
  })
  it('should render App element', () => {
    const headerElement = screen.getByText('Vite + React');
    expect(headerElement).toBeInTheDocument();

    const txtElement = screen.getByText('Click on the Vite and React logos to learn more');
    expect(txtElement).toBeInTheDocument()
  });
});