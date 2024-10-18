import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AuctionManagement = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null); // For handling errors
  const [loading, setLoading] = useState(true); // To manage loading state

  // Fetch auctions from the backend
  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:5229/api/admin/auctions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        setError(error.message); // Set the error message
        console.error('Error fetching auctions:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch
      }
    };

    fetchAuctions();
  }, []);

  // Function to delete an auction
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this auction?')) {
      try {
        const response = await fetch(`/auctions/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete the auction');
        }
        setAuctions(auctions.filter(auction => auction.id !== id)); // Update the state to remove the deleted auction
      } catch (error) {
        setError(error.message); // Set the error message
        console.error('Error deleting auction:', error);
      }
    }
  };


  return (
    <div className="container mt-4">
      <AdminNavbar />
      <h1>Auction Management</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Auction ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Starting Bid</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auctions.map(auction => (
            <tr key={auction.id}>
              <td>{auction.id}</td>
              <td>{auction.title}</td>
              <td>{auction.description}</td>
              <td>${auction.startingBid}</td>
              <td>{auction.status}</td>
              <td>
                <button className="btn btn-warning btn-sm">Edit</button>
                <button 
                  className="btn btn-danger btn-sm" 
                  onClick={() => handleDelete(auction.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionManagement;