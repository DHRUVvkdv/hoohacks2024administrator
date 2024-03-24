import React, { useState, useEffect } from "react";
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
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5001/news?school=VTECH"
        );
        setData(response.data); // Set the data in state
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show a notification to the user
      }
    };

    fetchData();
  }, []);
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
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    // First, upload the image to Cloudinary
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", selectedFile);
    cloudinaryFormData.append("upload_preset", "wgdt7lvl");

    try {
      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dru4ekf2q/image/upload",
        cloudinaryFormData
      );
      const imageUrl = cloudinaryResponse.data.secure_url;

      const newsItem = {
        title: title,
        description: description,
        urlToImage: imageUrl,
        college: "UVA",
      };

      const response = await axios.post(
        "http://localhost:5001/news",
        newsItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("News Item Saved:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
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

  const handleDeleteData = async (id) => {
    // Ask the user for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) {
      return; // Early return if the user clicks Cancel
    }

    try {
      // Proceed with deletion only if the user confirmed
      await axios.delete(`http://localhost:5001/news/${id}`);
      console.log(`Item with id ${id} deleted successfully`);

      // Update the local state to remove the deleted item
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
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
            key={item._id} // Correctly using 'key' here
            item={item} // Pass the whole item object
            onEdit={() => handleEditData(item._id)}
            onDelete={() => handleDeleteData(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
