import React from "react";
import Swal from "sweetalert2/dist/sweetalert2";
import { Link } from "react-router-dom";

class TrResults extends React.Component {
  render() {
    const { d, users, i } = this.props;
    return (
      <tr>
        <td>{i + 1}</td>
        <td>{d.nama}</td>
        <td>{users && users[d.uid].email}</td>
        <td>{d.grade}</td>
      </tr>
    );
  }
}

export default TrResults;
