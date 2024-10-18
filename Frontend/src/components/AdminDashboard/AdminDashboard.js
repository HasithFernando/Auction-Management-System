import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const AdminDashboard = () => {
  const [auctionCount, setAuctionCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [bidCount, setBidCount] = useState(0);

  useEffect(() => {
    // Fetch summary data from the backend API
    const fetchSummary = async () => {
        try {
            const auctionRes = await fetch('http://localhost:5229/api/admin/auctions/count');
            if (!auctionRes.ok) {
                throw new Error('Failed to fetch auction count');
            }
            const auctionData = await auctionRes.json();
            setAuctionCount(auctionData.count);
    
            const userRes = await fetch('http://localhost:5229/api/admin/users/count');
            if (!userRes.ok) {
                throw new Error('Failed to fetch user count');
            }
            const userData = await userRes.json();
            setUserCount(userData.count);
    
            const bidRes = await fetch('http://localhost:5229/api/admin/bids/count');
            if (!bidRes.ok) {
                throw new Error('Failed to fetch bid count');
            }
            const bidData = await bidRes.json();
            setBidCount(bidData.count);
        } catch (error) {
            console.error('Error fetching summary:', error);
            // Optionally set state to display an error message in the UI
        }
    };

    fetchSummary();
  }, []);

  return (
    <div className="container mt-4">
    <AdminNavbar/>
    <h1 className="mb-5">Admin Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Auctions</h5>
              <p className="card-text">{auctionCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Bids</h5>
              <p className="card-text">{bidCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
