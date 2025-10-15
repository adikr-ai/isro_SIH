import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

describe('App', () => {
  it('renders headline', () => {
    render(<App />);
    expect(screen.getByText(/Time-Resolved Satellite Clock/i)).toBeInTheDocument();
  });
});
