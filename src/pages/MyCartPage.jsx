import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import '../airzon.css';
import WorldMap from '../components/WorldMap';
import heroMarket from '../assets/figures/Marketplace.jpg';

// React Icons
import { FaStar, FaStarHalfAlt, FaRegStar, FaSearch, FaFilter, FaTags, FaFlag, FaDollarSign, FaTools } from 'react-icons/fa';



const filterIcons = [
  { icon: <FaTags />, label: 'Categories' },
  { icon: <FaDollarSign />, label: 'Price' },
  { icon: <FaFlag />, label: 'Countries' },
  { icon: <FaTools />, label: 'Condition' }, // Only for "parts"
];

const MyCartPage = () => {
  const [activeTab, setActiveTab] = useState('parts');
  const [searchTerm, setSearchTerm] = useState("");

  function handleDummySearch(e) {
    e.preventDefault();
    // Dummy: do nothing or console.log('search');
  }

    function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array(fullStars).fill(<FaStar />)}
        {halfStar && <FaStarHalfAlt />}
        {Array(emptyStars).fill(<FaRegStar />)}
      </>
    );
  }

  // Set button color classes depending on tab
  const filterBtnClass = activeTab === 'parts' ? 'mycart-filter-btn blue' : 'mycart-filter-btn grey';

  return (
    <div className="market-wrapper">
      <TopNavBar />
      <section className="hero-market" style={{ backgroundImage: `url(${heroMarket})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="hero-overlay">
          <h1>{activeTab === 'parts' ? "Finalize your purchases" : "Finalize your bookings"}</h1>
        </div>
        <div className="search-bar-wrapper">
          <form className="search-box" onSubmit={handleDummySearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              aria-label="Search"
              placeholder={
                activeTab === 'parts'
                  ? "Write here parts number, keywords, description…"
                  : "Write here keywords, description, cities…"
              }
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <FaSearch size={18} />
            </button>
          </form>
        </div>
        <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 Q720,100 1440,0 V100 H0 Z" fill="#F9F9F9" stroke="none" />
          <path d="M0,0 Q720,100 1440,0" fill="none" stroke="#003366" strokeWidth="3" />
        </svg>
      </section>

      {/* Tab Toggle */}
      <div className="mycart-toggle-row">
        <button
          className={`mycart-toggle-btn${activeTab === 'parts' ? ' active' : ''}`}
          onClick={() => setActiveTab('parts')}
        >
          Switch to my Parts cart
        </button>
        <button
          className={`mycart-toggle-btn${activeTab === 'events' ? ' active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Switch to my Events cart
        </button>
      </div>

      <div className="mycart-main-section">
        {/* LEFT COLUMN: Filters, Summary */}
        <div className="mycart-left">
          <div className="mycart-summary-title">
            Filters & categories
          </div>
          <div className="mycart-filters-row">
            {filterIcons.slice(0, activeTab === 'parts' ? 4 : 3).map(({ icon, label }) => (
              <button key={label} className={filterBtnClass}>
                <span className="mycart-filter-icon">{icon}</span><br/>
                {label}
              </button>
            ))}
          </div>
          <div className="mycart-summary-title">
  {activeTab === 'parts'
    ? 'Overview your Parts in your Cart'
    : 'Overview your Events in your Cart'}
</div>
<div className="mycart-summary-card">
  <div className="mycart-summary-bluebox">
    <div className="mycart-summary-number">
      {activeTab === 'parts' ? 5 : 2}
    </div>
    <div className="mycart-summary-label">
      {activeTab === 'parts' ? "Parts in my cart" : "Bookings to finalize"}
    </div>
  </div>
  <div className="mycart-summary-map">
<WorldMap />
  </div>
  
</div>
        </div>

        {/* RIGHT COLUMN: Main list */}
        <div className="mycart-right">
          <div className="mycart-summary-title">
            {activeTab === 'parts'
              ? 'My Parts in Cart'
              : 'My Events in Cart'}
          </div>
          {activeTab === 'parts' ? (
            // PARTS LIST
            <div className="mycart-parts-list">
              {/* Example Part Card */}
              <div className="mycart-part-card">
                <div className="mycart-part-title">Item: ATR landing gear | Part D23189000-22</div>
                <div className="mycart-part-details">
                  <span>Seller: Lion technical services</span>
                  <span>{renderStars(4.5)}</span>
                  <span>Quantity: 1</span>
                  <span>Flight hours: new</span>
                  <span>Location: Blagnac</span>
                </div>
                <div className="mycart-part-action-row">
                  <div className="mycart-part-price">USD 150,000</div>
                  <button className="mycart-buy-btn">Buy</button>
                </div>
              </div>
            </div>
          ) : (
            // EVENTS LIST
            <div className="mycart-events-list">
              <div className="mycart-event-card">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                  alt="Event"
                  className="mycart-event-img"
                />
                <div className="mycart-event-info">
                  <div className="mycart-event-title">
                    Salon du Bourget: conference on spare-parts market
                  </div>
                  <div className="mycart-event-org">Super repair services</div>
                  <div className="mycart-event-date">June 26th, 2027 — 11:00am</div>
                  <div className="mycart-event-desc">
                    Conference on the key development in the aircraft spare parts markets hosted by leading MRO.
                  </div>
                  <button className="mycart-join-btn">Join</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyCartPage;