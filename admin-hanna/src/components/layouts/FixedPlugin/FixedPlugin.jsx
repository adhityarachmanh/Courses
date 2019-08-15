import React from "react";
import BG_1 from "../../../assets/img/sidebar-1.jpg";
import BG_2 from "../../../assets/img/sidebar-2.jpg";
import BG_3 from "../../../assets/img/sidebar-3.jpg";
import BG_4 from "../../../assets/img/sidebar-4.jpg";

class FixedPlugin extends React.Component {
  state = {
    bg: [BG_1, BG_2, BG_3, BG_4]
  };
  render() {
    const { bg } = this.state;
    return (
      <div className="fixed-plugin">
        <div className="dropdown show-dropdown">
          <a href="#" data-toggle="dropdown">
            <i className="fa fa-cog fa-2x"> </i>
          </a>
          <ul className="dropdown-menu">
            <li className="header-title"> Sidebar Filters</li>
            <li className="adjustments-line">
              <a className="switch-trigger active-color">
                <div className="badge-colors ml-auto mr-auto">
                  <span
                    className="badge filter badge-purple"
                    data-color="purple"
                  />
                  <span
                    className="badge filter badge-azure"
                    data-color="azure"
                  />
                  <span
                    className="badge filter badge-green"
                    data-color="green"
                  />
                  <span
                    className="badge filter badge-warning"
                    data-color="orange"
                  />
                  <span
                    className="badge filter badge-danger"
                    data-color="danger"
                  />
                  <span
                    className="badge filter badge-rose active"
                    data-color="rose"
                  />
                </div>
                <div className="clearfix" />
              </a>
            </li>
            <li className="header-title">Images</li>
            {bg.map((d, i) => {
              return (
                <li key={i} className={i === 0 ? "active" : ""}>
                  <a className="img-holder switch-trigger">
                    <img src={d} alt="" />
                  </a>
                </li>
              );
            })}
            {/* <li className="active">
              <a className="img-holder switch-trigger">
                <img src="assets/img/sidebar-1.jpg" alt="" />
              </a>
            </li>
            <li>
              <a className="img-holder switch-trigger">
                <img src="../../../assets/img/sidebar-2.jpg" alt="" />
              </a>
            </li>
            <li>
              <a className="img-holder switch-trigger">
                <img src="assets/img/sidebar-3.jpg" alt="" />
              </a>
            </li>
            <li>
              <a className="img-holder switch-trigger">
                <img src="assets/img/sidebar-4.jpg" alt="" />
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    );
  }
}
export default FixedPlugin;
