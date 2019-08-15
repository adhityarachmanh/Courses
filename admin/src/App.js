import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Admin from "./layouts/Admin";
import LoginAdmin from "./layouts/Auth/LoginAdmin";
import "aos/dist/aos.css";

import "sweetalert2/src/sweetalert2.scss";

const hist = createBrowserHistory();
function App() {
  return (
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login-admin" component={LoginAdmin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Router>
  );
}

export default App;
