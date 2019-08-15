import React from "react";
import Swal from "sweetalert2/dist/sweetalert2";
import { Link } from "react-router-dom";

class TrTempalte extends React.Component {
  handleShowImage = image => {
    Swal.fire({
      imageUrl: image,
      imageHeight: 400,
      imageAlt: "A tall image"
    });
  };
  async handleShowOptions(options) {
    await Swal.fire({
      title: "Options",
      input: "select",
      inputOptions: options
    });
  }
  render() {
    const { d, match } = this.props;
    return (
      <tr>
        <td>{d.no}</td>
        <td>{d.question}</td>
        <td>
          {d.image !== "no-image" ? (
            <button
              onClick={() => this.handleShowImage(d.image)}
              className="btn btn-default btn-sm"
            >
              Show Image
            </button>
          ) : (
            "No Image"
          )}
        </td>
        <td>
          <button
            onClick={() => this.handleShowOptions(d.options)}
            className="btn btn-default btn-sm"
          >
            Show Options
          </button>
        </td>
        <td>{d.answer}</td>
        <td>
          <Link
            to={`/admin/manage-courses/${match.params.class}/edit/${d.no}`}
            className="btn btn-info btn-sm"
          >
            edit
          </Link>
        </td>
      </tr>
    );
  }
}

export default TrTempalte;
