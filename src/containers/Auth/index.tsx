import React, { useEffect } from 'react';
import TextInput from '../../components/Generic/TextInput/TextInput';

function Auth() {
  useEffect(() => {
    //TODO - Check auth token in cookie
  }, []);

  return (
    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full">
      <TextInput name="login" placeholder="Enter your username" label="Login" />
      <TextInput name="password" placeholder="Enter your username" label="Password" />
    </div>
  );
}

export default Auth;
