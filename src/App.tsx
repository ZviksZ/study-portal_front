import React, { useEffect } from 'react';
import useRoutes from 'routes';

function App() {
  const routes = useRoutes();

  useEffect(() => {
    //TODO - Check auth token in cookie
  }, []);

  return <>{routes}</>;
}

export default App;
