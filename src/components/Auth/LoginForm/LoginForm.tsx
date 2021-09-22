import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../Generic/TextInput/TextInput';
import Button, { ButtonStyle } from '../../Generic/Button/Button';

interface LoginFormInputs {
  login: string;
  password: string;
}

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = (data: LoginFormInputs) => {
    console.log('DATA', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder="Enter your username or email"
        label="Login"
        error={errors.login?.message}
        {...register('login', {
          required: 'This field is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Please enter a valid email',
          },
        })}
      />
      <TextInput
        type="password"
        placeholder="Enter your password"
        label="Password"
        {...register('password', {
          required: 'This field is required',
        })}
        error={errors.password?.message}
      />
      <div className="tw-flex tw-justify-center tw-pt-3">
        <Button type="submit" style={ButtonStyle.green}>
          Log in
        </Button>
      </div>
    </form>
  );
}
