import React, { useState } from "react";
import axios from "axios";
import "./NameForm.css"; // Import external CSS

const NameForm = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/names", { name });
      alert(response.data.message); // Show success message
      setName(""); // Clear the form input
    } catch (error) {
      console.error("Error submitting name:", error);
      alert("Failed to submit name");
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <div className="form-box">
          <h2>Enter Your Name</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NameForm;
