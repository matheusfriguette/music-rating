import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/index';
import Insert from './pages/insert';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
      <Route path="/insert" exact component={Insert} />
      <Route path="/insert/:id" component={Insert} />
    </Switch>
  );
};

export default Routes;
