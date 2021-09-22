import React, { Dispatch, useState, SetStateAction } from 'react';
import LoginForm from '../../components/Auth/LoginForm/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm/RegisterForm';

export enum AuthType {
  login = 'login',
  register = 'register',
}

function Auth() {
  const [authType, setAuthType] = useState<AuthType>(AuthType.login);
  const isLoginForm = authType === AuthType.login;

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
      <div className="tw-text-5xl  tw-text-gray-500 tw-font-bold tw-pb-4">Study Portal</div>
      {isLoginForm ? <LoginForm /> : <RegisterForm />}
      <AuthPageHelpText setAuthType={setAuthType} isLoginForm={isLoginForm} />
    </div>
  );
}

export default Auth;

interface AuthPageHelpTextProps {
  setAuthType: Dispatch<SetStateAction<AuthType>>;
  isLoginForm: boolean;
}

function AuthPageHelpText({ setAuthType, isLoginForm }: AuthPageHelpTextProps) {
  return (
    <div className="tw-pt-3">
      <span>{isLoginForm ? 'No account?' : 'Have account?'}</span>
      <span
        className="tw-text-blue-900 tw-cursor-pointer"
        onClick={() => setAuthType(isLoginForm ? AuthType.register : AuthType.login)}
      >
        {isLoginForm ? ' Sign up' : ' Sign in'}
      </span>
    </div>
  );
}
