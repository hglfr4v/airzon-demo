import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import '../airzon.css';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { FaSearch } from 'react-icons/fa';
import airplane from '../assets/figures/airplane.png';
import handshake from '../assets/figures/handshake.jpg';
import container from '../assets/figures/container.png';
import heroMarket from '../assets/figures/Marketplace.jpg';

const MarketPlacePage = () => {
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchPerformed, setSearchPerformed] = useState(false);
const location = useLocation();

  const initialMode = location.state?.mode || "buyer";  // default buyer
  const [mode, setMode] = useState(initialMode);
  // Toggle state: 'parts' or 'events'
const [activeTab, setActiveTab] = useState('seller');


function handleSearch(e) {
  e.preventDefault();
  if (!searchTerm.trim()) {
    setSearchResults([]);
    setSearchPerformed(false);
    return;
  }

  // Simple case-insensitive search on name and part
  const results = items.filter(item =>
    (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.part && item.part.toLowerCase().includes(searchTerm.toLowerCase()))
    
  );

  setSearchResults(results);
  setSearchPerformed(true);
}

// In your component:
const navigate = useNavigate();

function handleOpenDetail(result) {
  if (result.type === "item") {
    navigate(`/market/item/${result.id}`);
  } else if (result.type === "event") {
    navigate(`/event/${result.id}`);
  }
}


useEffect(() => {
    if (searchTerm === "") {
      setSearchPerformed(false);
      setSearchResults([]);
    }
  }, [searchTerm]);


  return (
    
    <div className="market-wrapper">
      <TopNavBar />
      {/* HERO */}
      <section className="hero-market" style={{ backgroundImage: `url(${heroMarket})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay">
        <h1>{mode === 'seller' ? "Manage your counteroffers received" : "Make a new deals, track your deliveries, grow your business"}</h1>
        </div>
        <div className="search-bar-wrapper">
          <form className="search-box" onSubmit={handleSearch}>
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
        {searchPerformed && (
  <div className="search-banner">
    {searchResults.length === 0 ? (
      <div className="search-banner__not-found">Item/Event not found.</div>
    ) : (
      <ul className="search-banner__results">
        {searchResults.map(result => (
          <li key={result.id}>
            <button
              className="result-link"
              onClick={() => handleOpenDetail(result)}
            >
              {result.type === "item" ? `${result.name} | Part ${result.part}` : `${result.name} (Event)`}
            </button>
          </li>
        ))}
      </ul>
    )}
  </div>
)}
       {mode === 'seller' ? (
  <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,0 Q720,100 1440,0 V100 H0 Z" fill="#F9F9F9" stroke="none" />
    <path d="M0,0 Q720,100 1440,0" fill="none" stroke="#28a745" strokeWidth="3" />
  </svg>
) : (
  <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
    <path d="M0,0 Q720,100 1440,0 V100 H0 Z" fill="#F9F9F9" stroke="none" />
    <path d="M0,0 Q720,100 1440,0" fill="none" stroke="#003366" strokeWidth="3" />
  </svg>
)}
      </section>
<div className="mode-toggle">
    <button
      className={`mode-btn ${mode === "buyer" ? "active" : ""}`}
      onClick={() => setMode("buyer")}
    >
      Buyer
    </button>
    <button
      className={`mode-btn ${mode === "seller" ? "active" : ""}`}
      onClick={() => setMode("seller")}
    >
      Seller
    </button>
  </div>

   {mode === "buyer" && ( 
  <section className="marketplace-content">
    <div className="qa-grid">
      {/* Buyer card 1 */}
      <article className="qa-card">
        <div className="qa-media">
          <img src={airplane} alt="Buyer - new part" />
          <span className="qa-chip buyer">Buy </span>
        </div>
        <div className="qa-row">
          <button className="qa-primary buyer equal " onClick={() => navigate('/market', { state: { mode: 'buyer', buyerView: 'part' } })}>Check the market</button>
          <button className="qa-secondary buyer equal btn-003366" onClick={() => navigate('/market', { state: { mode: 'buyer', buyerView: 'bid' } })}>Check your bids</button>
        </div>
      </article>

      {/* Buyer card 2 */}
      <article className="qa-card">
        <div className="qa-media">
          <img src={handshake} alt="Buyer - RFP" />
          <span className="qa-chip buyer">Make an RFP</span>
        </div>
        <div className="qa-body">
          <button className="qa-primary buyer" onClick={() => navigate('/rfp')}>Request a part to vendors</button>
        </div>
      </article>

      {/* Buyer card 3 */}
      <article className="qa-card">
        <div className="qa-media">
          <img src={container} alt="Buyer - track" />
          <span className="qa-chip buyer">Track </span>
        </div>
        <div className="qa-row">
  <button className="qa-secondary equal btn-003366">Track past deals</button>
  <button className="qa-secondary equal btn-5C8EDC">Track parts sold in delivery</button>
</div>
      </article>
    </div>
  </section>
)}

{mode === "seller" && ( 
  <section className="marketplace-content">
    <div className="qa-grid">
      {/* Seller card 1 */}
      <article className="qa-card">
        <div className="qa-media">
          <img src={airplane} alt="Seller - list part" />
          <span className="qa-chip seller">List a new part</span>
        </div>
       <div className="qa-row">
  <button className="qa-secondary equal btn-yellow">Confidential price</button>
  <button className="qa-secondary equal btn-003366">RFQ</button>
  <button className="qa-secondary equal btn-5C8EDC" onClick={() => navigate('/create-item')}>Quote a price</button>
</div>
      </article>

      {/* Seller card 2 */}
      <article className="qa-card">
        <div className="qa-media">
          <img src={handshake} alt="Seller - offers" />
          <span className="qa-chip seller">My offers</span>
        </div>
       <div className="qa-row">
  <button className="qa-secondary equal btn-003366" onClick={() => navigate('/market', { state: { mode: 'seller', sellerView: 'counteroffer' } })}>See counteroffers received</button>
  <button className="qa-secondary equal btn-5C8EDC"   onClick={() => navigate('/market', { state: { mode: 'seller', sellerView: 'listing' } })}>See all my parts listed</button>
</div>
      </article>

      {/* Seller card 3 */}
      <article className="qa-card">
        <div className="qa-media">
          <img src={container} alt="Seller - track" />
          <span className="qa-chip seller">Track parts sold</span>
        </div>
        <div className="qa-row">
  <button className="qa-secondary equal btn-003366">Track past deals</button>
  <button className="qa-secondary equal btn-5C8EDC">Track parts sold in delivery</button>
</div>
      </article>
    </div>
  </section>
)}
      <Footer />
    </div>
  );
};

export default MarketPlacePage;