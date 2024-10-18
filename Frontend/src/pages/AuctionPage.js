import React, { useState, useEffect } from 'react';
import AuctionCard from '../components/AuctionCard';

const AuctionList = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await fetch('http://localhost:5229/api/auction');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
        setError(error.message); // Update error state
      } finally {
        setLoading(false); // Stop loading when fetch is done
      }
    };

    fetchAuctions();
  }, []);

  if (loading) return <p>Loading auctions...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error state

  return (
    <>
    
    <section className="container mt-5 justify-content-center">
    <div><h1 className="mb-5">All Available Auctions</h1></div>
      <div className="row row-cols-1 row-cols-md-4 g-2 ">
        {auctions.map((auction) => (
          <div className="col" key={auction.id}>
            <AuctionCard
              id={auction.auctionID}
              title={auction.title}
              description={auction.description}
              imageUrl={auction.imageURL}
              startBid={auction.startBid}
              endTime={new Date(auction.endTime).toLocaleDateString()} />
          </div>
        ))}
      </div>
    </section></>
  );
  
};

export default AuctionList;
