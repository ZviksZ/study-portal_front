import React, { useEffect } from 'react';

function Auth() {
  useEffect(() => {
    //TODO - Check auth token in cookie
  }, []);

  return (
    <div className="tw-flex tw-justify-center tw-items-center tw-h-full">
      <input type="text" />
    </div>
  );
}

export default Auth;
