import React from 'react';
import AuctionList from './AuctionList';

const Home = () => {const auctions = [
    {
      title: 'Antique Vase',
      startingBid: 50,
      image: 'https://media.istockphoto.com/id/482763974/photo/vintage-pottery-isolated-over-a-white-background.jpg?s=1024x1024&w=is&k=20&c=n2mF7KoqwgvO6eW-PbFovieBJP-ZyjLtREP4B_mHgsk=',
      link: '/Product',
    },
    {
      title: 'Vintage Watch',
      startingBid: 100,
      image: 'https://via.placeholder.com/350x200',
      link: '#',
    },
    {
      title: 'Classic Painting',
      startingBid: 200,
      image: 'https://via.placeholder.com/350x200',
      link: '#',
    },
    {
      title: 'Classic Bike',
      startingBid: 2000,
      image: 'https://via.placeholder.com/350x200',
      link: '#',
    },
    {
      title: 'Old Stamps',
      startingBid: 2000,
      image: 'https://via.placeholder.com/350x200',
      link: '#',
    },
    {
      title: 'Classic Car',
      startingBid: 2000,
      image: 'https://via.placeholder.com/350x200',
      link: '#',
    },
  ];
  
  return (
    <>
    <div className="bg-light p-5 text-center">
        <h1 className="display-4">Welcome to AuctionHouse</h1>
        <p className="lead">Bid on your favorite items and discover amazing deals!</p>
        <a href="#" className="btn btn-primary btn-lg">Start Bidding</a>
    </div>
    <AuctionList auctions={auctions} />

    </>
  );
}

export default Home;