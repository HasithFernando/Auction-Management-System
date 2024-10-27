import React, { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    // Fetch user profile
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            
            try {
                const response = await fetch('http://localhost:5229/api/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const profileData = await response.json();
                    setProfile(profileData); // Set profile data here
                    fetchNotifications(profileData.userId); // Fetch notifications using user ID
                } else {
                    const errorText = await response.text();
                    console.error('Error response body:', errorText);
                    navigate('/login'); // Redirect to login on error
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login'); // Redirect to login on error
            }
        };

        fetchProfile();
    }, []); 

    // Function to fetch notifications
    const fetchNotifications = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5229/api/notification/${userId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setNotifications(data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mark notification as read
    const markAsRead = async (id) => {
        try {
            const response = await fetch(`http://localhost:5229/api/notification/${id}/mark-read`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setNotifications(notifications.map(notification => 
                notification.notificationID === id ? { ...notification, isRead: true } : notification
            ));
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Your Notifications</h2>
            <div className="list-group">
                {notifications.length === 0 ? (
                    <div className="list-group-item">No notifications available.</div>
                ) : (
                    notifications.map(notification => (
                        <div
                            key={notification.notificationID}
                            className={`list-group-item ${notification.isRead ? 'bg-light' : ''}`}
                        >
                            <h5 className="mb-1">{notification.messageContent}</h5>
                            <small>{new Date(notification.sentAt).toLocaleString()}</small>
                            {!notification.isRead && (
                                <button
                                    className="btn btn-sm btn-primary float-right mark-read"
                                    onClick={() => markAsRead(notification.notificationID)}
                                >
                                    Mark as Read
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Notifications;
