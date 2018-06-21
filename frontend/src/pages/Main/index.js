import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Authentication from '../Authentication';
import NewAccount from '../Authentication/components/NewAccount';
import Calendar from '../Calendar';
import Profile from '../Profile';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Authentication} />
      <Route exact path="/account" component={NewAccount} />
      <Route exact path="/calendar" component={Calendar} />
      <Route exact path="/profile" component={Profile} />
    </Switch>
  </main>
);

export default Main;
