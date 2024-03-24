import React, { useState } from "react";
import DataComponent from "../Components/DataComponent";
import "./AdminDashboard.css";
import deleteIcon from "../assets/delete.png";
import Modal from "react-modal";
import axios from "axios";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log("Selected File:", selectedFile);
    console.log("Title:", title);
    console.log("Description:", description);

    // Construct the object to send
    const newsItem = {
      title: title,
      description: description,
      imageUrl: "URL_PLACEHOLDER", // Replace 'URL_PLACEHOLDER' with the actual image URL after uploading
    };

    try {
      const response = await axios.post(
        "http://localhost:5001/news",
        newsItem,
        {
          headers: {
            "Content-Type": "application/json", // Indicate that you're sending JSON data
          },
        }
      );
      console.log("News Item Saved:", response.data);
      // Update UI accordingly or navigate as needed
    } catch (error) {
      console.error("Error posting news:", error);
    }
    // Close the modal after submission
    closeModal();
  };

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
      <button className="add-button" onClick={openModal}>
        +
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Data Modal"
      >
        <h2>Add Data</h2>
        <input type="file" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
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
