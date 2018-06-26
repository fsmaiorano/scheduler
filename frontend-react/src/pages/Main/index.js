import React from "react";
import { Switch, Route } from "react-router-dom";

import Authentication from "../Authentication";
import NewAccount from "../Authentication/NewAccount";
import Calendar from "../Calendar";

const Main = () => (
    <Switch>
        <main>
            <Route exact path="/" component={Authentication} />
            <Route exact path="/account" component={NewAccount} />
            <Route exact path="/calendar" component={Calendar} />
        </main>
    </Switch>
);

export default Main;
