import React from 'react';

const AuctionList = ({ auctions }) => {
  return (
    <section className="container mt-5">
      <h2 className="text-center mb-4">Featured Auctions</h2>
      <div className="row">
        {auctions.map((auction, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={auction.image}
                className="card-img-top"
                alt={auction.title}
              />
              <div className="card-body">
                <h5 className="card-title">{auction.title}</h5>
                <p className="card-text">Starting Bid: ${auction.startingBid}</p>
                <a href={auction.link} className="btn btn-outline-primary">
                  View Auction
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AuctionList;