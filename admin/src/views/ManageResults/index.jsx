import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";

import { Link } from "react-router-dom";
import { colorCourse } from "../ManageCourse/data";
import TrResults from "./sections/TrResults";
import SearchResults from "./sections/SearchResults";

class ManageResults extends React.Component {
  state = {
    search: false,
    searchVal: null
  };
  handleSearch = e => {
    if (e.target.value !== "") {
      this.setState({
        search: true,
        searchVal: e.target.value
      });
    } else {
      this.setState({
        search: false,
        searchVal: null
      });
    }
  };

  render() {
    const { results, selectClass, match, history, users } = this.props;

    const classColor = colorCourse[selectClass - 1];
    const { search, searchVal } = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className={`card-header card-header-${classColor}`}>
                <h4 className="card-title ">Table Results Class {selectClass}</h4>
              </div>
              <div className="card-body">
                <div className="row justify-content-start">
                  <div className="col-md-6">
                    <div className="form-group">
                      Search:{" "}
                      <input
                        className="form-control"
                        onChange={this.handleSearch}
                        placeholder="find Name or Grade..."
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table responsive text-center">
                    <thead className=" text-primary">
                      <th>No</th>
                      <th>Nama</th>
                      <th>Email</th>
                      <th>Grade</th>
                    </thead>
                    <tbody>
                      {search ? (
                        <SearchResults
                          match={match}
                          results={results}
                          searchVal={searchVal}
                        />
                      ) : (
                        results &&
                        results.map((d, i) => {
                          return (
                            <TrResults key={i} i={i} users={users} d={d} />
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const results = state.firestore.ordered.results;
  const users = state.firestore.data.users;
  const selectClass = parseInt(ownProps.match.params.class);

  //olah data
  const fResults =
    results &&
    results.filter(d => {
      return d.class === selectClass;
    });

  return {
    results: fResults,
    selectClass: selectClass,
    users: users
  };
};
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "results" }, { collection: "users" }])
)(ManageResults);
