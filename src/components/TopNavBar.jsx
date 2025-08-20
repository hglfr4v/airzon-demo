import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaChartBar, FaHandshake, FaCalendarAlt, FaComments, FaBars, FaBoxes, FaUserCircle, FaShoppingCart, FaBell } from 'react-icons/fa';
import AlertsSidebar from '../components/Alerts'; // <- import your sidebar
import '../airzon.css';
import logo from '../assets/figures/logo4.png'; // replace with your actual logo path

const TopNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAlerts, setShowAlerts] = useState(false);

  const leftNav = [
    { label: 'Homepage', path: '/', icon: <FaHome /> },
    { label: 'Analytics', path: '/analytics', icon: <FaChartBar /> },
    { label: 'Market', path: '/market', icon: <FaHandshake /> },
    { label: 'My Inventory', path: '/inventory', icon: <FaBoxes /> },
    { label: 'Events', path: '/events', icon: <FaCalendarAlt /> },
    { label: 'Messages', path: '/messages', icon: <FaComments /> }
  ];

  // Remove Alerts from rightNav
  const rightNav = [
    { label: 'My Profile', path: '/profile', icon: <FaUserCircle /> },
    { label: 'My Cart', path: '/mycart', icon: <FaShoppingCart /> }
    // No Alerts here
  ];

  // Sample data (replace with your real alert data)
  const alertsData = {
      market: [
    `A new <a href="#">Part D23189000-22</a> listed below <b>USD 150,000</b> is available <br/>(condition: <b>1,000 Flight Hours</b>)`,
    `A new <a href="#">Part D23189000-22</a> listed below <b>USD 150,000</b> is available <br/>(condition: <b>3,000 Flight Hours</b>)`,
    `A new <a href="#">Part 555</a> listed below <b>USD 500</b> is available <br/>(condition: <b>New</b>)`
  ],
    inventory: [
      'Your Part <a href="#">D23189000-22</a> has <b>reached 3,000 flight hours</b>',
      'You have a new bid for <a href="#">Part D23189000-22</a> from <span style="color:#71b0ff;font-weight:600">Lion Technic</span>',
      'You have a new counteroffer for <a href="#">Part D23189000-22</a> from <span style="color:#71b0ff;font-weight:600">Lion Technic</span> (<span style="color:#71b0ff">USD 150,000 vs. USD 6,200</span>)'
    ],
    news: [
      'Easyjet signs SAF deal with Enilive in Italy',
      'Aerlytix & Airfinance Global become partners',
      'HTF sees aviation market to $85bn in 2032'
    ]
  };

  // Hide navbar on login/register
  if (location.pathname === '/login' || location.pathname === '/register') 
    return (
      <nav className="top-nav">
        <div className="nav-left">
          <div className="nav-logo" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </nav>
    );

  return (
    <>
      <nav className="top-nav">
        <div className="nav-left">
          <button className="nav-button" aria-label="Menu" style={{ marginRight: '8px' }}>
            <FaBars />
          </button>
          <div className="nav-logo" onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" style={{ cursor: 'pointer' }} />
          </div>
          {leftNav.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? 'nav-button active' : 'nav-button'}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="nav-right">
          {rightNav.map(item => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? 'nav-button active' : 'nav-button'}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          {/* ALERTS BUTTON: just toggles sidebar */}
          <button
            className="nav-button"
            onClick={() => setShowAlerts(true)}
            aria-label="Alerts"
          >
            <FaBell />
            <span>Alerts</span>
          </button>
        </div>
      </nav>
      <AlertsSidebar open={showAlerts} onClose={() => setShowAlerts(false)} alerts={alertsData} />
    </>
  );
};

export default TopNavBar;