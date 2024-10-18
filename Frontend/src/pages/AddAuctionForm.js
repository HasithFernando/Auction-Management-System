import React, { useState } from 'react';

const AddAuctionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    startBid: '',
    startTime: '',
    endTime: '',
    sellerId: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5229/api/auction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Auction added successfully!');
        // Optionally reset the form
        setFormData({
          title: '',
          description: '',
          imageUrl: '',
          startBid: '',
          startTime: '',
          endTime: '',
          sellerId: ''
        });
      } else {
        alert('Failed to add auction');
      }
    } catch (error) {
      console.error('Error adding auction:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4 shadow p-3 mb-5 bg-white rounded" style={{ width: '100%', maxWidth: '700px' }}>
      <div className="mb-3">
      <h3 className="text-center mb-4">Add Auction</h3>
        <label className="form-label">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Image URL:</label>
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Bid:</label>
        <input
          type="number"
          name="startBid"
          value={formData.startBid}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Seller ID:</label>
        <input
          type="number"
          name="sellerId"
          value={formData.sellerId}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Auction</button>
    </form>
  );
};

export default AddAuctionForm;
