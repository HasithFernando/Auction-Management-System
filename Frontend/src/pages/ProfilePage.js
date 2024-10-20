import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuctionProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5229/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const profileData = await response.json();
                    setProfile(profileData); // Set profile data here
                } else {
                    const errorText = await response.text();
                    console.error('Error response body:', errorText);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
    
        fetchProfile();
    }, []); // Run only on mount
    


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/LoginPage');
    };


    if (!profile) {
        return <Spinner animation="border" variant="primary" />; // Loading spinner while fetching data
    }

    return (
        <Container className="my-5">
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card className="shadow-lg">
                        <Card.Body className="text-center">
                            <h3 className="mb-4">{profile.role} Profile</h3>
                            <div className="d-flex justify-content-center mb-4">
                                <img
                                    src={profile.profilePicture || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'}
                                    alt="Profile"
                                    className="img-fluid rounded-circle border"
                                    width="150"
                                    height="150"
                                    style={{ padding: '10px', borderColor: '#ddd', borderWidth: '2px' }}
                                />
                            </div>
                            
                            <h5>Username</h5>
                            <p>{profile.username}</p>

                            <h5>Email</h5>
                            <p>{profile.email}</p>

                            {profile.role == "Admin" && (
                                <a href="/AdminDashboard"><Button variant="primary" className="mt-2 mx-2">
                                    Admin Dashboard
                                    </Button></a>
                            )}

                            <Button variant="danger" onClick={handleLogout} className="mt-2">
                                Logout
                            </Button>


                        </Card.Body>
                    </Card>
                </Col>

                <Col md={8}>
                {profile.role == "Seller" && (
                    <Card className="shadow-lg mb-4">
                        <Card.Body>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3>Your Auction Items</h3>
                            <button className="btn btn-primary">Add Auction</button>
                        </div>
                            <Table striped bordered hover responsive className="mt-4">
                                <thead className="bg-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Bids</th>
                                        <th>Highest Bid</th>
                                        <th>Auction Ends</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.auctionItems?.length > 0 ? (
                                        profile.auctionItems.map((Auction, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{Auction.title}</td>
                                                <td>{Auction.bidCount}</td>
                                                <td>{Auction.highestBid}</td>
                                                <td>{Auction.endTime}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No auction items available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                )}


                    <Card className="shadow-lg">
                        <Card.Body>
                            <h3 className="mb-4">Your Bid History</h3>
                            <Table striped bordered hover responsive className="mt-4">
                                <thead className="bg-light">
                                    <tr>
                                        <th>#</th>
                                        <th>Item Name</th>
                                        <th>Your Bid</th>
                                        <th>Status</th>
                                        <th>Auction Ends</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {profile.bidHistory?.length > 0 ? (
                                        profile.bidHistory.map((bid, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{bid.itemName}</td>
                                                <td>{bid.yourBid}</td>
                                                <td>{bid.status}</td>
                                                <td>{bid.auctionEnd}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="text-center">No bid history available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AuctionProfilePage;
