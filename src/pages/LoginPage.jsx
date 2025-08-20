import React, { useState } from 'react';
import '../airzon.css';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

function LoginPage({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignIn, setIsSignIn] = useState(true);
  const [selectedClientType, setSelectedClientType] = useState(null); // null, 'client', or 'non-client'
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'password') {
      login(); // call parent login handler
    } else {
      alert('Invalid credentials');
    }
  };

  const handleCreateProfile = () => {
    navigate('/register');
  };

  return (

    <div className="login-page-wrapper">
        <TopNavBar />
        <div className="login-container">
            <div className="login-form-section">
                <h1 className="login-title">Welcome to Airzon</h1>
                <div className="login-box">
                    <div className="tab-toggle">
                        <button 
                        className={`tab ${isSignIn ? 'active' : ''}`} 
                        onClick={() => setIsSignIn(true)}
                        >
                            Sign in
                        </button>
                        <button
                        className={`tab ${!isSignIn ? 'active' : ''}`}
                        onClick={() => setIsSignIn(false)}
                        >
                            Create your account
                        </button>
                    </div>
                    {isSignIn ? (
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="username" className="form-label">Username or Email</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your email"
                            className="form-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="form-button">
                            LOG IN
                        </button>
                    </form>
                    ) : (
                    // Create account selection
                    <div className="account-selection">
                        <div className="client-options">
                            <button
                            className={`option-box ${selectedClientType === 'client' ? 'selected' : ''}`}
                            onClick={() => setSelectedClientType('client')}
                            >
                                I am a client of Anchor Partner
                            </button>
                            <button
                                className={`option-box ${selectedClientType === 'non-client' ? 'selected' : ''}`}
                                onClick={() => setSelectedClientType('non-client')}
                            >
                                I am not a client of Anchor Partner
                            </button>
                        </div>
                        <button 
                            className="form-button" 
                            onClick={handleCreateProfile}>
                                CREATE ACCOUNT
                        </button>
                    </div>
                    )}
                </div>
            </div>
            <div className="carousel-section"><Carousel /></div>
        </div>
        <Footer />
    </div>
  );

  };



  export default LoginPage;
