import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const BidManagement = () => {
  const [bids, setBids] = useState([]);
  const [editingBid, setEditingBid] = useState(null);
  const [newBidAmount, setNewBidAmount] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch bids from the backend API
    const fetchBids = async () => {
      try {
        const response = await fetch('http://localhost:5229/api/admin/bids');
        if (!response.ok) {
          throw new Error('Failed to fetch bids');
        }
        const data = await response.json();
        setBids(data); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchBids();
  }, []);

  const handleEdit = (bid) => {
    setEditingBid(bid);
    setNewBidAmount(bid.bidAmount); // Pre-fill the input with the current bid amount
  };

  const handleUpdateBid = async () => {
    if (!newBidAmount || isNaN(newBidAmount)) {
      setError('Please enter a valid bid amount.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5229/api/admin/bids/${editingBid.bidId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bidAmount: parseFloat(newBidAmount) }),
      });

      if (!response.ok) {
        throw new Error('Failed to update bid');
      }

      // Update the bids in the state
      const updatedBids = bids.map(bid =>
        bid.bidId === editingBid.bidId ? { ...bid, bidAmount: parseFloat(newBidAmount) } : bid
      );
      setBids(updatedBids);
      setEditingBid(null); // Close the edit mode
      setNewBidAmount('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <AdminNavbar />
      <h1>Bid Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Bid ID</th>
            <th>Auction ID</th>
            <th>User ID</th>
            <th>Bid Amount</th>
            <th>Bid Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bids.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No bids found</td>
            </tr>
          ) : (
            bids.map(bid => (
              <tr key={bid.bidId}>
                <td>{bid.bidId}</td>
                <td>{bid.auctionId}</td>
                <td>{bid.userId}</td>
                <td>{bid.bidAmount}</td>
                <td>{new Date(bid.bidTime).toLocaleString()}</td>
                <td>
                  <button className="btn btn-warning btn-sm" onClick={() => handleEdit(bid)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editingBid && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Bid</h5>
                <button className="close" onClick={() => setEditingBid(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="bidAmount">New Bid Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    id="bidAmount"
                    value={newBidAmount}
                    onChange={(e) => setNewBidAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setEditingBid(null)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleUpdateBid}>Update Bid</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BidManagement;

