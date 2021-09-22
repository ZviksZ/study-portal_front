import React from 'react';
import { render, waitFor } from '@testing-library/react';
import LoginForm from 'components/Auth/LoginForm/LoginForm';

describe('LoginForm', () => {
  test('Simple usage', async () => {
    const component = render(<LoginForm />);

    await waitFor(() => component.getByTestId('auth-login-form'));
  });
});
