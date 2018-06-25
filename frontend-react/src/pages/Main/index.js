import React from "react";
import { Switch, Route } from "react-router-dom";

import Authentication from "../Authentication";
import NewAccount from './../Authentication/NewAccount';

const Main = () => (
    <Switch>
        <main>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/account" component={NewAccount} />
        </main>
    </Switch>
);

export default Main;
