import React from 'react';
import TextInput from '../../components/Generic/TextInput/TextInput';
import Button, { ButtonStyle } from '../../components/Generic/Button/Button';

function Auth() {
  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
      <div className="tw-text-gray-500">Welcome</div>
      <TextInput name="login" placeholder="Enter your username" label="Login" />
      <TextInput name="password" placeholder="Enter your username" label="Password" />
      <Button type="submit" onClick={() => {}} style={ButtonStyle.green}>
        Log in
      </Button>
    </div>
  );
}

export default Auth;
