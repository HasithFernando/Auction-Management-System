import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BidInterface = () => {
  const { id } = useParams();  // Get the auction ID from the URL
  const [auction, setAuction] = useState(null);
  const [highestCurrentBid, setHighestCurrentBid] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [message, setMessage] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0); // Define timeRemaining state

  useEffect(() => {
    const fetchAuction = async () => {
      const response = await fetch(`http://localhost:5229/api/auction/${id}`);
      const data = await response.json();

      // Make sure your data structure matches
      setAuction(data.auction);
      setHighestCurrentBid(data.highestCurrentBid); // Assuming the API returns it like this
      setTimeRemaining(new Date(data.auction.endTime).getTime() - new Date().getTime()); // Set initial time remaining
    };
    fetchAuction();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prevTime => Math.max(prevTime - 1000, 0)); // Decrement time remaining every second
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer on unmount
  }, []);

  const formatTimeRemaining = (time) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / 1000 / 60 / 60) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    return `${days} days ${hours} h ${minutes} m ${seconds} s`;
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const response = await fetch(`http://localhost:5229/api/auction/${id}/place`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auctionId: id,   // ensure this matches your backend DTO
        bidAmount: bidAmount,
      }),
    });

    if (response.ok) {
      setMessage('Bid placed successfully!');
      setBidAmount(''); // Clear bid amount after successful submission
      // Optionally, you could refetch the auction data to update the highest current bid
      // fetchAuction();
    } else {
      try {
        const errorData = await response.json(); // Attempt to parse the error response
        setMessage(`Error: ${errorData.message}`);
      } catch (error) {
        setMessage(`Error: Unable to place bid. Please try again later.`);
      }
    }
  };

  if (!auction) {
    return <p>Loading auction details...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img src={auction.imageURL} alt={auction.title} className="img-fluid rounded" />
        </div>
        <div className="col-md-6">
          <h1 className="display-4">{auction.title}</h1>
          <p className="lead">{auction.description}</p>
          <hr className="my-4" />
          <p><strong>Starting Bid:</strong> ${auction.startBid.toFixed(2)}</p>
          <p><strong>Current Highest Bid: </strong> ${highestCurrentBid ? highestCurrentBid.toFixed(2) : 'N/A'}</p>
          <p><strong>Time Remaining:</strong> {formatTimeRemaining(timeRemaining)}</p>
          <p><strong>End Time:</strong> {new Date(auction.endTime).toLocaleString()}</p>
          <form onSubmit={handleBidSubmit} className="mt-4">
            <div className="form-group">
              <label htmlFor="bidAmount">Bid Amount:</label>
              <input 
                type="number" 
                className="form-control mt-2 mb-2" 
                id="bidAmount" 
                value={bidAmount} 
                onChange={(e) => setBidAmount(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Place Bid</button>
          </form>
          {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
      </div>
    </div>
  );
};

export default BidInterface;
