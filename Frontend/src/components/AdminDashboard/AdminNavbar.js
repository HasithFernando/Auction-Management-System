import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="btn-group ms-auto " role="group" aria-label="Basic example">
              <NavLink className="btn btn-secondary" to="/AdminDashboard">Dashboard</NavLink>
              <NavLink className="btn btn-secondary" to="/AdminUsers">User Management</NavLink>
              <NavLink className="btn btn-secondary" to="/AdminAuctions">Auction Management</NavLink>
              <NavLink className="btn btn-secondary" to="/AdminBids">Bid Management</NavLink>
            </div>
          </div>
        </nav>
      );
      
};

export default Navbar;
