import React, { useState, useEffect } from 'react';
import '../styles/home.css';
import AuctionCard from '../components/AuctionCard';

const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  return (
    <>
      <section className="hero">
        <h1>Bid on Excellence, Own the Extraordinary</h1>
        <p>Your trusted auctioneer for exclusive and rare items.</p>
        <a href="/SignUp" className="btn">Register Now</a>
        <a href="/Auctions" className="btn">View Upcoming Auctions</a>
      </section>

      <section className="featured-auctions text-center">
        <h2>Featured Auctions</h2>

        {loading ? (
          <p>Loading auctions...</p>
        ) : error ? (
          <p>Error loading featured auctions: {error}</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3 g-3 justify-content-center px-3">
            {auctions.slice(0, 3).map((auction) => (
              <div className="col" key={auction.auctionID}>
                <AuctionCard
                  id={auction.auctionID}
                  title={auction.title}
                  description={auction.description}
                  imageUrl={auction.imageURL}
                  startBid={auction.startBid}
                  endTime={new Date(auction.endTime).toLocaleDateString()}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="how-it-works">
        <div className="container">
          <div className="section-title">
            <h2>How It Works</h2>
          </div>
          <div className="row text-center">
            <div className="col-md-3">
              <h4>Register for Free</h4>
              <p>Create your account and get ready to bid.</p>
              <a href="#" className="btn btn-primary">Register Now</a>
            </div>
            <div className="col-md-3">
              <h4>Browse Auctions</h4>
              <p>Explore hundreds of live auctions or filter by category to find items that interest you.</p>
              <a href="#" className="btn btn-primary">View Auctions</a>
            </div>
            <div className="col-md-3">
              <h4>Place Your Bid</h4>
              <p>Participate in real-time bidding wars or set automatic bids for convenience.</p>
              <a href="#" className="btn btn-primary">Start Bidding</a>
            </div>
            <div className="col-md-3">
              <h4>Win and Checkout</h4>
              <p>Secure your items by being the highest bidder at auction close. Easily complete your purchase via our secure payment system.</p>
              <a href="#" className="btn btn-primary">Checkout</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light seller-section">
        <div className="container">
          <div className="section-title">
            <h2>Become a Seller</h2>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <h4>List Your Items</h4>
              <p>Create an auction listing in minutes with our guided process.</p>
              <a href="#" className="btn btn-success">List Now</a>
            </div>
            <div className="col-md-4">
              <h4>Set Your Terms</h4>
              <p>You control the auction length, starting price, and reserve price.</p>
              <a href="#" className="btn btn-success">Set Terms</a>
            </div>
            <div className="col-md-4">
              <h4>Watch the Bids Roll In</h4>
              <p>Track your auctions in real-time as bidders compete for your items.</p>
              <a href="#" className="btn btn-success">Track Auctions</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
