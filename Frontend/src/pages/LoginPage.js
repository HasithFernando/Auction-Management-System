import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error message
    const navigate = useNavigate(); // Create a navigate function

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear any existing error

        // Check for empty fields
        if (!email || !password) {
            setError('Email and Password are required');
            return;
        }

        try {
            const response = await fetch('http://localhost:5229/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store the JWT token in localStorage
                localStorage.setItem('token', data.token);
                // Redirect to profile or dashboard
                navigate('/profile'); // Change '/profile' to your desired route
                console.log('Login successful!');
            } else {
                setError(data.message); // Set the error message to state
                console.error(data.message);
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
            console.error(err);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4">Login</h3>
                {error && <p className="text-danger">{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <a href="/SignUp">Register</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
