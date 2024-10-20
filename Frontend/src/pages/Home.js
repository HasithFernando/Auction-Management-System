import React, { useState, useEffect } from 'react';
import '../styles/home.css'
import AuctionCard from '../components/AuctionCard';

const Home = () => {

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

    <section className="hero">
        <h1>Bid on Excellence, Own the Extraordinary</h1>
        <p>Your trusted auctioneer for exclusive and rare items.</p>
        <a href='/SignUp' className="btn">Register Now</a>
        <a href="/Auctions" className="btn">View Upcoming Auctions</a>
    </section>

    <section className="featured-auctions text-center">
  <h2>Featured Auctions</h2>

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
</section>



    <section class="how-it-works">
            <div class="container">
                <div class="section-title">
                    <h2>How It Works</h2>
                </div>
                <div class="row text-center">
                    <div class="col-md-3">
                        <h4>Register for Free</h4>
                        <p>Create your account and get ready to bid.</p>
                        <a href="#" class="btn btn-primary">Register Now</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Browse Auctions</h4>
                        <p>Explore hundreds of live auctions or filter by category to find items that interest you.</p>
                        <a href="#" class="btn btn-primary">View Auctions</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Place Your Bid</h4>
                        <p>Participate in real-time bidding wars or set automatic bids for convenience.</p>
                        <a href="#" class="btn btn-primary">Start Bidding</a>
                    </div>
                    <div class="col-md-3">
                        <h4>Win and Checkout</h4>
                        <p>Secure your items by being the highest bidder at auction close. Easily complete your purchase via our secure payment system.</p>
                        <a href="#" class="btn btn-primary">Checkout</a>
                    </div>
                </div>
            </div>
        </section>

        <section class="bg-light seller-section">
            <div class="container">
                <div class="section-title">
                    <h2>Become a Seller</h2>
                </div>
                <div class="row text-center">
                    <div class="col-md-4">
                        <h4>List Your Items</h4>
                        <p>Create an auction listing in minutes with our guided process.</p>
                        <a href="#" class="btn btn-success">List Now</a>
                    </div>
                    <div class="col-md-4">
                        <h4>Set Your Terms</h4>
                        <p>You control the auction length, starting price, and reserve price.</p>
                        <a href="#" class="btn btn-success">Set Terms</a>
                    </div>
                    <div class="col-md-4">
                        <h4>Watch the Bids Roll In</h4>
                        <p>Track your auctions in real-time as bidders compete for your items.</p>
                        <a href="#" class="btn btn-success">Track Auctions</a>
                    </div>
                </div>
            </div>
        </section>
  
    </>
  );

}
export default Home;