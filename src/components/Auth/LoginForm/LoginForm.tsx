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
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder="Enter your username or email"
        label="Login"
        {...register('login', {
          required: true,
        })}
        error={errors.login?.message}
      />
      <TextInput
        type="password"
        placeholder="Enter your password"
        label="Password"
        {...register('password', {
          required: true,
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
