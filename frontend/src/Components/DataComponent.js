import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../assets/edit.jpeg";
import deleteIcon from "../assets/delete.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DataComponent.css";

function DataComponent({ item, onEdit, onDelete }) {
  const navigate = useNavigate();

  const handleEdit = (event) => {
    event.stopPropagation();
    onEdit(item.id);
    navigate(`/update_item/${item._id}`);
  };

  return (
    <div className="data-component">
      <img src={item.urlToImage} className="card-img-top" alt={item.title} />

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
          onClick={() => onDelete()}
        />
      </div>
    </div>
  );
}

export default DataComponent;
