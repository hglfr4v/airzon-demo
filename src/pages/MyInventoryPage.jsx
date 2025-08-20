import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import '../airzon.css';
import { FaSearch } from 'react-icons/fa';
import { FiBox, FiDollarSign, FiGlobe, FiTool, FiUploadCloud } from 'react-icons/fi';

const inventory = [
  {
    name: "ATR landing gear",
    part: "D23189000-22",
    quantity: 1,
    status: "part bidded for sale",
    marketValue: "USD 150,000",
    delta: "+2%",
    bids: true,
  },
  {
    name: "ATR landing gear",
    part: "D23189000-22",
    quantity: 1,
    status: "part in inventory",
    marketValue: "USD 150,000",
    delta: "+2%",
    bids: false,
  },
  {
    name: "ATR landing gear",
    part: "D23189000-22",
    quantity: 1,
    status: "part in inventory",
    marketValue: "USD 150,000",
    delta: "+2%",
    bids: false,
  }
];

const MyInventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  function handleDummySearch(e) {
    e.preventDefault();
    // Search logic here
  }

  return (
    <>
      <div className="inventory-wrapper">
        <TopNavBar />
        {/* Hero */}
        <section className="hero-market">
          <div className="hero-overlay-inventory">
            <h1>
              Explore your inventory
            </h1>
          </div>
          <div className="search-bar-wrapper-inventory">
            <form className="search-box" onSubmit={handleDummySearch}>
              <input
                type="text"
                placeholder="Write here parts number, keywords, description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <FaSearch size={18} />
              </button>
            </form>
          </div>
          <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
            {/* Filled shape */}
            <path
              d="M0,0 Q720,100 1440,0 V100 H0 Z"
              fill="#F9F9F9"
              stroke="none"
            />
            {/* Stroke only along the wave curve (top) */}
            <path
              d="M0,0 Q720,100 1440,0"
              fill="none"
              stroke="#4EAD5B"
              strokeWidth="3"
            />
          </svg>
        </section>
        
        {/* Main */}
        <div className="inventory-main-section">
          {/* LEFT */}
          <div className="inventory-left">
            <div className="inventory-title-section">Filters &amp; categories</div>
            <div className="inventory-filters-row">
              <button className="inventory-filter-btn"><FiBox style={{marginRight:6}} /> Categories</button>
              <button className="inventory-filter-btn"><FiDollarSign style={{marginRight:6}} /> Charges</button>
              <button className="inventory-filter-btn"><FiGlobe style={{marginRight:6}} /> Countries</button>
              <button className="inventory-filter-btn"><FiTool style={{marginRight:6}} /> Condition</button>
            </div>

            <div className="inventory-title-section" style={{marginTop:32}}>Upload new parts</div>
            <div className="inventory-upload-row">
              <button className="inventory-upload-btn yellow">
                <FiUploadCloud style={{marginRight:7, fontSize:25}} /><br/>
                Individual part
              </button>
              <button className="inventory-upload-btn dark">
                <FiUploadCloud style={{marginRight:7, fontSize:25}} /><br/>
                Upload a list
              </button>
              <button className="inventory-upload-btn blue">
                <FiUploadCloud style={{marginRight:7, fontSize:25}} /><br/>
                Upload from ERP
              </button>
            </div>

            <div className="inventory-title-section" style={{marginTop:38}}>Key insights on my inventory</div>
            {/* Add key insights widget or summary here if needed */}
          </div>
          
          {/* RIGHT */}
          <div className="inventory-right">
            <div className="inventory-title">My parts in Inventory</div>
            <div className="inventory-list">
              {inventory.map((item, idx) => (
                <div className="inventory-card" key={idx}>
                  <div className="inventory-card-main">
                    <div className="inventory-card-title">
                      Item: {item.name} | Part {item.part}
                    </div>
                    <div className="inventory-card-details">
                      <span>Quantity: {item.quantity}</span>
                      <span>Status: <span className="inventory-status">{item.status}</span></span>
                      <span>
                        Market value: <span className="inventory-value">{item.marketValue}</span>
                        {" "}<span className="inventory-delta">({item.delta})</span>
                      </span>
                    </div>
                  </div>
                  <div className="inventory-card-actions">
                    <button
                      className={`inventory-action-btn ${item.bids ? 'bids' : 'sale'}`}
                      style={{width:170, minWidth:128}}
                    >
                      {item.bids ? "See bids" : "Sale"}
                    </button>
                    <button
                      className="inventory-action-btn insights"
                      style={{width:170, minWidth:128}}
                    >
                      See key insights
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <style>
      {`
        .inventory-title-section {
          font-size: 1.07rem;
          font-weight: 700;
          color: #143469;
          margin-bottom: 19px;
          margin-top: 0;
        }
      `}
      </style>
    </>
  );
};

export default MyInventory;