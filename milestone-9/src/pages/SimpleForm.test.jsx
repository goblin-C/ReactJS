import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import SimpleForm from './SimpleForm';

describe('<SimpleForm />', () => {
  it('renders all input fields and submit button', () => {
    render(<SimpleForm />);
    expect(screen.getByTestId('input-name')).toBeInTheDocument();
    expect(screen.getByTestId('input-email')).toBeInTheDocument();
    expect(screen.getByTestId('input-password')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('allows user to type in inputs', async () => {
    render(<SimpleForm />);
    await userEvent.type(screen.getByTestId('input-name'), 'John');
    await userEvent.type(screen.getByTestId('input-email'), 'john@example.com');
    await userEvent.type(screen.getByTestId('input-password'), '12345');

    expect(screen.getByTestId('input-name')).toHaveValue('John');
    expect(screen.getByTestId('input-email')).toHaveValue('john@example.com');
    expect(screen.getByTestId('input-password')).toHaveValue('12345');
  });

  it('shows success message on submit', async () => {
    render(<SimpleForm />);
    await userEvent.click(screen.getByTestId('submit-button'));
    expect(await screen.findByTestId('success-message')).toHaveTextContent('Logged in!');
  });
});
