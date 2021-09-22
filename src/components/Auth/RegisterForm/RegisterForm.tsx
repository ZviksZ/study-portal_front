import React from "react";
import { useForm } from "react-hook-form";
import TextInput from "../../Generic/TextInput/TextInput";
import Button, { ButtonStyle } from "../../Generic/Button/Button";

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
    <form onSubmit={handleSubmit(onSubmit)} data-ui-purpose="auth-register-form">
      <TextInput
        testId="auth-register-form-email"
        placeholder="Enter your email"
        label="Email"
        {...register("email", {
          required: "This field is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Please enter a valid email",
          },
        })}
        error={errors.email?.message}
      />
      <TextInput
        testId="auth-register-form-username"
        placeholder="Enter your username"
        label="Username"
        {...register("username", {
          required: "This field is required",
        })}
        error={errors.username?.message}
      />
      <TextInput
        testId="auth-register-form-password"
        type="password"
        placeholder="Enter your password"
        label="Password"
        {...register("password", {
          required: "This field is required",
        })}
        error={errors.password?.message}
      />
      <div className="tw-flex tw-justify-center tw-pt-3">
        <Button type="submit" style={ButtonStyle.green} testId="auth-register-form-submit">
          Register
        </Button>
      </div>
    </form>
  );
}
