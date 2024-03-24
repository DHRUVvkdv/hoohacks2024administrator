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
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5001/news");
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

      // Then, construct the news item with the image URL
      const newsItem = {
        title: title,
        description: description,
        imageUrl: imageUrl, // Use the URL from Cloudinary
      };

      // Finally, post the news item to your database
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
      // Here you can update state, show a success message, navigate, etc.
    } catch (error) {
      console.error("Error:", error);
      // Here you should handle errors, show error messages, etc.
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
