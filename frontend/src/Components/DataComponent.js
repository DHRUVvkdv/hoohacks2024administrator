import React from "react"; // Corrected import
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../assets/edit.jpeg";
import deleteIcon from "../assets/delete.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DataComponent.css";

function DataComponent({ title, imageUrl, onClick, user, item }) {
  const navigate = useNavigate();

  const handleDelete = (event) => {
    // Corrected to include event
    event.stopPropagation();
    // Confirm with the user
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`/posts/${item._id}`)
        .then((response) => {
          console.log("Item deleted:", response.data);
          alert("Item deleted succesfully!");
          // Suggested improvement: update state instead of reloading the page
        })
        .catch((error) => {
          console.error("There was an error deleting the item:", error);
        });
    }
  };

  const handleEdit = (event) => {
    // Corrected to include event
    event.stopPropagation();
    navigate(`/update_item/${item._id}`);
  };

  return (
    <div
      className="card custom-card"
      style={{ width: "18rem", position: "relative" }}
      onClick={onClick}
    >
      <div className="card-icon-container" onClick={(e) => e.stopPropagation()}>
        <img
          src={editIcon}
          alt="Edit"
          className="card-edit-icon"
          onClick={(e) => handleEdit(e)} // Pass event
        />
        <img
          src={deleteIcon}
          alt="Delete"
          className="card-delete-icon"
          onClick={(e) => handleDelete(e)} // Pass event
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <img src={imageUrl} className="card-img-top" alt={title} />
      </div>
    </div>
  );
}

export default DataComponent;

// import React from "react";
// import PropTypes from "prop-types"; // Optional: for props validation
// import "./DataComponent.css"; // Assuming your styles are defined here

// const DataComponent = ({ picture, title, description, onEdit, onDelete }) => {
//   return (
//     <div className="data-component">
//       <div className="data-header">
//         <img src={picture} alt={title} className="data-image" />
//         <h3 className="data-title">{title}</h3>
//       </div>
//       <p className="data-description">{description}</p>
//       <div className="data-actions">
//         <button onClick={onEdit} className="data-edit-btn">
//           Edit
//         </button>
//         <button onClick={onDelete} className="data-delete-btn">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };

// // Optional: Adding PropTypes for type checking
// DataComponent.propTypes = {
//   picture: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   onEdit: PropTypes.func.isRequired,
//   onDelete: PropTypes.func.isRequired,
// };

// export default DataComponent;
