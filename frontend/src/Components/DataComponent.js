import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../assets/edit.jpeg";
import deleteIcon from "../assets/delete.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DataComponent.css";

function DataComponent({ item, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleDelete = (event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios
        .delete(`/posts/${item._id}`)
        .then((response) => {
          console.log("Item deleted:", response.data);
          alert("Item deleted successfully!");
        })
        .catch((error) => {
          console.error("There was an error deleting the item:", error);
        });
    }
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    onEdit(item.id);
    navigate(`/update_item/${item._id}`);
  };

  return (
    <div className="data-component">
      <img src={item.imageUrl} className="card-img-top" alt={item.title} />

      <div className="data-description">
        <h5 className="data-title">{item.title}</h5>
        <p>{item.description}</p> {/* Ensure description is rendered */}
      </div>

      <div className="card-icon-container">
        <img
          src={editIcon}
          alt="Edit"
          className="card-edit-icon"
          onClick={handleEdit}
        />
        <img
          src={deleteIcon}
          alt="Delete"
          className="card-delete-icon"
          onClick={handleDelete}
        />
      </div>
    </div>
  );
}

export default DataComponent;
