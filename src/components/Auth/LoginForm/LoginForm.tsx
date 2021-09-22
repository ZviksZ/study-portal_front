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

  console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        placeholder="Enter your username or email"
        label="Login"
        error={errors.login?.message}
        {...register('login', {
          required: {
            value: true,
            message: 'This field is required',
          },
          maxLength: {
            value: 10,
            message: 'Max value length is 10',
          },
        })}
      />
      <TextInput
        type="password"
        placeholder="Enter your password"
        label="Password"
        {...register('password', {
          required: {
            value: true,
            message: 'This field is required',
          },
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
