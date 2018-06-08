import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Authentication from '../Authentication';
import NewAccount from '../Authentication/components/NewAccount';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Authentication} />
      <Route exact path="/account" component={NewAccount} />
    </Switch>
  </main>
);

export default Main;

// <Route exact path="/" component={Home} />
// <Route path="/roster" component={Roster} />
// <Route path="/schedule" component={Schedule} />
