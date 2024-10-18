import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in by checking for the token
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        // Redirect to the login page
        navigate('/LoginPage');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">AuctionHouse</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Auctions">Auctions</a>
                        </li>

                        {isLoggedIn ? (
                            <>
                                {/* Profile Icon for Logged-in users */}
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarProfileDropdown" role="button"
                                       data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fas fa-user"></i> Profile
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarProfileDropdown">
                                        <li><a className="dropdown-item" href="/Profile">View Profile</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Login and Register for Guests */}
                                <li className="nav-item">
                                    <a className="nav-link" href="/LoginPage">Log In</a>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
