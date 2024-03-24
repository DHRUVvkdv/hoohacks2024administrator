import React, { useState } from "react";
import DataComponent from "../Components/DataComponent";
import "./AdminDashboard.css";
import deleteIcon from "../assets/delete.png";

const AdminDashboard = () => {
  const [data, setData] = useState([
    {
      id: 1,
      picture: "deleteIcon",
      title: "Data 1",
      description: "Description of Data 1",
    },
    {
      id: 2,
      picture: "https://example.com/image2.jpg",
      title: "Data 2",
      description: "Description of Data 2",
    },
    {
      id: 3,
      picture: "https://example.com/image2.jpg",
      title: "Data 2",
      description: "Description of Data 2",
    },
    {
      id: 4,
      picture: "https://example.com/image2.jpg",
      title: "Data 2",
      description: "Description of Data 2",
    },
    {
      id: 5,
      picture: "https://example.com/image2.jpg",
      title: "Data 2",
      description: "Description of Data 2",
    },
    // Add more data objects as needed
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddData = () => {
    // Logic to add new data
    console.log("Adding new data");
  };

  const handleEditData = (id) => {
    // Logic to edit data with the given id
    console.log(`Editing data with id ${id}`);
  };

  const handleDeleteData = (id) => {
    // Logic to delete data with the given id
    console.log(`Deleting data with id ${id}`);
  };

  return (
    <div className="admin-dashboard">
      {/* Welcome message */}
      <div className="welcome-message-container">
        <div className="welcome-message">Welcome, Administrator @ UVA!</div>
      </div>
      <button className="add-button" onClick={handleAddData}>
        +
      </button>

      <div className="data-container">
        {data.map((item) => (
          <DataComponent
            key={item.id} // Correctly using 'key' here
            item={item} // Pass the whole item object
            onEdit={() => handleEditData(item.id)}
            onDelete={() => handleDeleteData(item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
