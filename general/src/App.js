import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import HomePage from "./views/HomePage/HomePage";
import LoginPage from "./views/Auth/LoginPage/LoginPage";
import RegisterPage from "./views/Auth/RegisterPage/RegisterPage";
import "aos/dist/aos.css";

import "sweetalert2/src/sweetalert2.scss";
import KelasPage from "./views/KelasPage/KelasPage";
import LandingCourse from "./views/LandingCourse/LandingCourse";
import CoursePage from "./views/CoursePage/CoursePage";
import CheckRecord from "./views/CheckRecord/CheckRecord";

function App() {
  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/register-page" component={RegisterPage} />
        <Route path="/check-record/class/:class" component={CheckRecord} />
        <Route path="/select-class" component={KelasPage} />
        <Route path="/class/:class/start" component={LandingCourse} />
        <Route path="/class/:class/test/:course" component={CoursePage} />
      </Switch>
    </Router>
  );
}

export default App;
