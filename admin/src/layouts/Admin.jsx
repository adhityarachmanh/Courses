import React from "react";
import SideBar from "../components/layouts/SideBar/SideBar";
import Navbar from "../components/layouts/Navbar/Navbar";
import FixedPlugin from "../components/layouts/FixedPlugin/FixedPlugin";
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes";
import { connect } from "react-redux";

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/admin" to="/admin/dashboard" />
  </Switch>
);
class Admin extends React.Component {
  render() {
    const { auth, history, match } = this.props;

    if (!auth.uid) return <Redirect to="/login-admin/" />;
    return (
      <>
        <div className="wrapper ">
          <SideBar match={match} history={history} />
          <div className="main-panel">
            <Navbar match={match} history={history} />
            <div className="content">{switchRoutes}</div>
          </div>
        </div>
        <FixedPlugin />
      </>
    );
  }
}
const mapStateToProps = state => {
  const auth = state.firebase.auth;
  return {
    auth: auth
  };
};
export default connect(mapStateToProps)(Admin);
