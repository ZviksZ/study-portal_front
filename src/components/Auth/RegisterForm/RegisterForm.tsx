import React from 'react';
import { useForm } from 'react-hook-form';
import TextInput from '../../Generic/TextInput/TextInput';
import Button, { ButtonStyle } from '../../Generic/Button/Button';

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
}

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput placeholder="Enter your email" label="Email" {...register('email')} />
      <TextInput placeholder="Enter your username" label="Username" {...register('username')} />
      <TextInput
        type="password"
        placeholder="Enter your password"
        label="Password"
        {...register('password')}
      />
      <div className="tw-flex tw-justify-center tw-pt-3">
        <Button type="submit" style={ButtonStyle.green}>
          Register
        </Button>
      </div>
    </form>
  );
}