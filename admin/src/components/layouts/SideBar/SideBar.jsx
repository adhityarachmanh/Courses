import React from "react";
import { Link } from "react-router-dom";
import { sideBar } from "./data";

class SideBar extends React.Component {
  render() {
    const { match, history } = this.props;
    return (
      <div
        className="sidebar"
        data-color="purple"
        data-background-color="white"
        data-image="assets/img/sidebar-1.jpg"
      >
        <div className="logo">
          <a
            href="http://www.creative-tim.com"
            className="simple-text logo-normal"
          >
            Karisma Course
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {sideBar.map((d, i) => {
              return (
                <li
                  key={i}
                  className={`nav-item ${
                    history.location.pathname === d.path ? "active" : null
                  }`}
                >
                  <Link className="nav-link" to={d.path}>
                    <i className="material-icons">{d.icon}</i>
                    <p>{d.nama}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
export default SideBar;
