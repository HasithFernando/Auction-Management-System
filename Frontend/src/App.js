import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import Product from './pages/product';
import ProfilePage from './pages/ProfilePage';
import AuctionPage from './pages/AuctionPage';
import AddAuction from './pages/AddAuctionForm';
import BidInterface from './pages/BiddingInterface';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import UserManagement from './components/AdminDashboard/UserManagement';
import AuctionManagement from './components/AdminDashboard/AuctionManagement';
import BidManagement from './components/AdminDashboard/BidManagement';


const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content */}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Product" element={<Product/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/Auctions" element={<AuctionPage/>} />
          <Route path="/AddAuction" element={<AddAuction/>} />
          <Route path="/AdminDashboard" element={<AdminDashboard/>} />
          <Route path="/AdminUsers" element={<UserManagement/>} />
          <Route path="//AdminAuctions" element={<AuctionManagement/>} />
          <Route path="//AdminBids" element={<BidManagement/>} />
          <Route path="/auctions/:id/bid" element={<BidInterface />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
