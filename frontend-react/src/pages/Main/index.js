import React from "react";
import { Switch, Route } from "react-router-dom";

import Authentication from "../Authentication";

const Main = () => (
    <Switch>
        <main>
            <Route exact path="/" component={Authentication} />
        </main>
    </Switch>
);

export default Main;
