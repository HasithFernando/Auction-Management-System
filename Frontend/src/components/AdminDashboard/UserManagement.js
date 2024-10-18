import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users from the backend API
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5229/api/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data); // Assuming the response is an array of users
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:5229/api/admin/users/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }

        // Remove the user from the state after successful deletion
        setUsers(users.filter(user => user.userId !== userId)); // Adjust userId according to your user model
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
       <AdminNavbar/>
      <h1>User Management</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No users found</td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user.userId}> {/* Use a unique key for each user */}
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm mx-2" 
                    onClick={() => handleDelete(user.userId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
