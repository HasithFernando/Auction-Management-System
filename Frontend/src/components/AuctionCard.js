import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../styles/AuctionCard.css';

const AuctionCard = ({ id, title, description, imageUrl, startBid, endTime }) => {
  const formattedBid = startBid !== null && startBid !== undefined ? `$${startBid}` : 'N/A';
  const formattedEndDate = endTime ? new Date(endTime).toLocaleDateString() : 'Unknown';
  const navigate = useNavigate(); // Initialize useNavigate

  const handlePlaceBid = () => {

    const token = localStorage.getItem('token');
        if (!token) {
            navigate('/LoginPage');  // Redirect to login if not logged in
            return;
        }else{
            navigate(`/auctions/${id}/bid`); // Navigate to bidding interface with auction ID
        }
  };

  return (
    <div class="product-card">
        <img src={imageUrl} alt="Product Image"/>
        <div class="content">
            <h2>{title}</h2>
            <p class="description">{description}</p>
            <div class="price"><strong>Current Bid:</strong> {formattedBid}</div>
            <div class="end-date"><strong>Ends On:</strong> {formattedEndDate}</div>
            <button onClick={handlePlaceBid}>Place Bid</button>
        </div>
    </div>
  );
};

export default AuctionCard;
