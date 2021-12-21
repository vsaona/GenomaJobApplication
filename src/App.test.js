import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Visited checkbox', () => {
  render(<App />);
  const formElement = screen.getByText(/Visitado/i);
  expect(formElement).toBeInTheDocument();
});
