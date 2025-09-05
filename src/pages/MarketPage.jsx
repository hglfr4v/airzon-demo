import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import heroMarket from '../assets/figures/Marketplace.jpg';
import '../airzon.css';
import WorldMap from '../components/WorldMap';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
import { FaCloudUploadAlt, FaStar, FaStarHalfAlt, FaRegStar, FaThLarge, FaDollarSign, FaGlobeEurope, FaTools, FaSearch, FaHandshake, FaTruck } from 'react-icons/fa';



const MarketPage = () => {
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchPerformed, setSearchPerformed] = useState(false);
const location = useLocation();

  const initialMode = location.state?.mode || "buyer";  // default buyer
  const [mode, setMode] = useState(initialMode);

  // NEW: extra seller sub-state
const initialSellerView = location.state?.sellerView || "listing"; // 'listing' | 'counteroffer'
const initialBuyerView = location.state?.buyerView || "bid"; // 'part' | 'bid'
const [sellerView, setSellerView] = useState(initialSellerView);
const [buyerView, setBuyerView] = useState(initialBuyerView);
// Toggle state: 'parts' or 'events'
const [activeTab, setActiveTab] = useState('seller');

const buyerBids = [
  {
    id: "bid-1",
    itemId: 1,
    title: "ATR Main Landing Gear | Part D23189000-22",
    seller: "Lion technical services",
    rating: 4.5,
    reviews: 97,
    quantity: 1,
    hours: "new",
    location: "Blagnac",
    rfq: false,
    originalPrice: "USD 170,000",
    myBid: "USD 158,000",
    status: "accepted",          // accepted | refused | lost
    statusLabel: "Accepted",
  },
  {
    id: "bid-4",
    itemId: 1,
    title: "ATR Main Landing Gear | Part D23189000-22",
    seller: "Lion technical services",
    rating: 4.5,
    reviews: 97,
    quantity: 1,
    hours: "new",
    location: "Blagnac",
    rfq: false,
    originalPrice: "USD 170,000",
    myBid: "USD 158,000",
    status: "accepted",          // accepted | refused | lost
    statusLabel: "Accepted",
  },
  {
    id: "bid-2",
    itemId: 1,
    title: "ATR Main Landing Gear | Part D23189000-22",
    seller: "Lion technical services",
    rating: 4.5,
    reviews: 97,
    quantity: 1,
    hours: "new",
    location: "Blagnac",
    rfq: true,
    originalPrice: "RFQ",
    myBid: "USD 145,000",
    status: "refused",
    statusLabel: "Refused",
  },
  {
    id: "bid-3",
    itemId: 1,
    title: "ATR Main Landing Gear | Part D23189000-22",
    seller: "Lion technical services",
    rating: 4.5,
    reviews: 97,
    quantity: 1,
    hours: "new",
    location: "Blagnac",
    rfq: false,
    originalPrice: "USD 120,000",
    myBid: "USD 100,000",
    status: "lost",
    statusLabel: "Lost",
  },
    {
    id: "bid-5",
    itemId: 1,
    title: "ATR Main Landing Gear | Part D23189000-22",
    seller: "Lion technical services",
    rating: 4.5,
    reviews: 97,
    quantity: 1,
    hours: "new",
    location: "Blagnac",
    rfq: false,
    originalPrice: "USD 120,000",
    myBid: "USD 100,000",
    status: "lost",
    statusLabel: "Lost",
  },
];

const items = [
  {
    id: 1,
    type: "item",
    name: "ATR landing gear",
    part: "Part D23189000-22",
    seller: "Lion technical services",
    rating: 4.5,
    reviews: 97,
    price: 150.000,
  },
  {
    id: 2,
    type: "event",
    name: "Aerospace Expo 2025",
    location: "Berlin",
    date: "2025-09-21",
  },
  // Add more as needed
];

const sellerItems = [
    {
      id: 'D2189000-22',
      title: 'ATR landing gear | Part D2189000-22',
      bidder: 'Bidder: Lion technical services',
      reviews: 97,
      quantity: 1,
      hours: '1,500',
      condition: 'new',
      location: 'Blagnac',
      theirPrice: 'USD 168,000',
      myPrice: 'USD 150,000'
    },
    {
      id: 'C20595100',
      title: 'A320 Family – Brake Assembly | Part C20595100',
      bidder: 'Bidder: Lion technical services',
      reviews: 97,
      quantity: 1,
      hours: '—',
      condition: 'new',
      location: 'Blagnac',
      theirPrice: 'USD 100,000',
      myPrice: 'USD 80,000'
    },
    {
      id: 'D2189000-22-2',
      title: 'ATR Main Landing Gear | Part D2189000-22',
      bidder: 'Bidder: Lion technical services',
      reviews: 97,
      quantity: 1,
      hours: '—',
      condition: 'overhauled',
      location: 'Blagnac',
      theirPrice: 'USD 300,000',
      myPrice: 'USD 270,000'
    }
  ];

  const additionalListings = [
  {
    id: 'C20595100',
    title: 'A320 Family – Brake Assembly | Part C20595100',
    bidders: 5,
    quantity: 3,
    hours: 'new',
    condition: 'new',
    location: 'Blagnac',
    myPrice: 'RFQ',
    theirPrice: 'RFQ'
  },
  {
    id: 'D2189000-22-viewed',
    title: 'ATR Main Landing Gear | Part D2189000-22',
    bidders: 0,
    quantity: 1,
    hours: '1,500',
    condition: 'new',
    location: 'Blagnac',
    myPrice: 'USD 150,000',
    theirPrice: 'USD 150,000'
  }
];

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
        <h1>{mode === 'seller' ? "Manage your counteroffers received" : "Explore the marketplace and find the right part"}</h1>
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
      onClick={() => navigate('/marketplace', { state: { mode: 'buyer' } })}
    >
      Buyer
    </button>
    <button
      className={`mode-btn ${mode === "seller" ? "active" : ""}`}
      onClick={() => navigate('/marketplace', { state: { mode: 'seller' } })}
    >
      Seller
    </button>
  </div>
  {mode === "buyer" && buyerView === "part" && (
      <section className="market-content">
        
        {/* LEFT COLUMN */}
        <div className="left-column">
           <h3>Filters & categories</h3>
     <div className="filters">
  <div className="filter-buttons">
    <button><FaThLarge style={{ marginRight: 3 }} /> Categories</button>
    <button><FaDollarSign style={{ marginRight: 3 }} /> Price</button>
    <button><FaGlobeEurope style={{ marginRight: 3 }} /> Countries</button>
    <button><FaTools style={{ marginRight: 3 }} /> Condition</button>
  </div>
</div>
           <h3>Overview of the Items available in the market</h3>
          <div className="stats-overview">
           
            <div className="stats">
              <div className='stats-button'>+5.0%<br /><span>Price trend YTD</span></div>
              <div className='stats-button'>156<br /><span>Parts in market</span></div>
            </div>
            <WorldMap />
          </div>
           <h3>Track my parts acquired</h3>
         <div className="track-section">
  <button className="track-btn-deal">
    <FaHandshake style={{ marginRight: 10, fontSize: 20 }} />
    Past deals
  </button>
  <button className="track-btn-truck">
    <FaTruck style={{ marginRight: 10, fontSize: 20 }} />
    Track my parts in deliveries
  </button>
</div>
<h3>Make an RFP</h3>
         <div className="track-section">
  <button className="track-btn-truck" onClick={() => navigate('/rfp')}>
    <FaHandshake style={{ marginRight: 10, fontSize: 20 }} />
    Request a part to vendors
  </button>
</div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="right-column">
           <h3>Latest listings</h3>
          <section className="listings">
           
            <div className="listing sponsored">
              <div>
                <strong>Item:</strong> ATR landing gear | Part C20595100<br />
                <small>Seller: Lion technical services {renderStars(4.5)} (97 reviews)<br />
                Quantity: 1 – Flight hours: new – Location: Blagnac</small>
              </div>
              <div className="listing-action">
                <div>USD 150,000</div>
                <button className="buy-btn" onClick={() => navigate(`/market/item/1`)}>Buy</button>
              </div>
            </div>
              <div className="listing sponsored">
    <div>
      <strong>Item:</strong> ATR landing gear | Part C20595100<br />
      <small>Seller: Lion technical services {renderStars(5)} (180 reviews)<br />
      Quantity: 1 – Flight hours: new – Location: Blagnac</small>
    </div>
    <div className="listing-action">
      <div>USD 150,000</div>
      <button className="buy-btn">Buy</button>
    </div>
  </div>

  <div className="listing sponsored">
    <div>
      <strong>Item:</strong> A320 Family – Brake Assembly | Part C20595100<br />
      <small>Seller: Giraffe technical services {renderStars(3.5)} (10 reviews)<br />
      Quantity: 3 – Flight hours: new – Location: Blagnac</small>
    </div>
    <div className="listing-action">
      <div>RFQ</div>
      <button className="buy-btn">Bid</button>
    </div>
  </div>

  <div className="listing">
    <div>
      <strong>Item:</strong> ATR landing gear | Part C20595100<br />
      <small>Seller: Lion technical services {renderStars(5)} (200 reviews)<br />
      Quantity: 1 – Flight hours: new – Location: Blagnac</small>
    </div>
    <div className="listing-action">
      <div>No price</div>
      <button className="buy-btn">Bid</button>
    </div>
  </div>

  <div className="listing">
    <div>
      <strong>Item:</strong> ATR landing gear | Part C20595100<br />
      <small>Seller: Lion technical services {renderStars(3)} (1000 reviews)<br />
      Quantity: 1 – Flight hours: new – Location: Blagnac</small>
    </div>
    <div className="listing-action">
      <div>No price</div>
      <button className="buy-btn">Bid</button>
    </div>
  </div>

  <div className="listing">
    <div>
      <strong>Item:</strong> ATR landing gear | Part C20595100<br />
      <small>Seller: Lion technical services {renderStars(4.5)} (157 reviews)<br />
      Quantity: 1 – Flight hours: new – Location: Blagnac</small>
    </div>
    <div className="listing-action">
      <div>No price</div>
      <button className="buy-btn">Bid</button>
    </div>
  </div>

  <div className="listing">
    <div>
      <strong>Item:</strong> ATR landing gear | Part C20595100<br />
      <small>Seller: Lion technical services {renderStars(4.5)} (130 reviews)<br />
      Quantity: 1 – Flight hours: new – Location: Blagnac</small>
    </div>
    <div className="listing-action">
      <div>No price</div>
      <button className="buy-btn">Bid</button>
    </div>
  </div>
            {/* More listings can go here */}
          </section>
        </div>
      </section>
      )}
{mode === "buyer" && buyerView === "bid" && (
  <section className="market-content">
    {/* LEFT COLUMN (keep the filters + track) */}
    <div className="left-column">
      <h3>Filters & categories</h3>
      <div className="filters">
        <div className="filter-buttons">
          <button><FaThLarge style={{ marginRight: 3 }} /> Categories</button>
          <button><FaDollarSign style={{ marginRight: 3 }} /> Bid type</button>
          <button><FaGlobeEurope style={{ marginRight: 3 }} /> Countries</button>
          <button><FaTools style={{ marginRight: 3 }} /> Condition</button>
        </div>
      </div>

      <h3>Track my parts acquired</h3>
      <div className="track-section">
        <button className="track-btn-deal">
          <FaHandshake style={{ marginRight: 10, fontSize: 20 }} />
          Past deals
        </button>
        <button className="track-btn-truck">
          <FaTruck style={{ marginRight: 10, fontSize: 20 }} />
          Track my parts in deliveries
        </button>
      </div>
    </div>

    {/* RIGHT COLUMN: Latest bids */}
    <div className="right-column">
      <h3>Latest bids</h3>
      <section className="listings">
        {buyerBids.map((b) => (
          <div
            key={b.id}
            className={`listing bid-card ${b.status}`}
            title={b.statusLabel}
          >
            <div>
              <strong>Item: </strong>{b.title}<br />
              <small>
                Seller: {b.seller} {renderStars(b.rating)} ({b.reviews} reviews)<br />
                Quantity: {b.quantity} – Flight hours: {b.hours} – Location: {b.location}
              </small>
            </div>

            <div className="bid-action">
              <div className="bid-col">
                <div className="bid-col-title">{b.rfq ? "RFQ" : "Price"}</div>
                <div className="bid-value">{b.rfq ? "RFQ" : b.originalPrice}</div>
                <div className="bid-sub">The original offer</div>
              </div>

              <div className="divider" />

              <div className="bid-col">
                <div className="bid-col-title">USD</div>
                <div className="bid-value">{b.myBid}</div>
                <div className="bid-sub">My bidding offer</div>
              </div>

              <div className="divider" />

              <div className="bid-col end">
                <span className={`bid-status-tag ${b.status}`}>{b.statusLabel}</span>
                <button
                  className={`buy-btn ${b.status === "accepted" ? "" : "outline"}`}
                  onClick={() =>
                    b.status === "accepted"
                      ? navigate(`/checkout/${b.id}`)
                      : navigate(`/market/item/${b.itemId}`)
                  }
                >
                  {b.status === "accepted" ? "Buy" : "Bid"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  </section>
)}
        {mode === "seller" && ( 

            <section className="market-content">
          <div className="left-column">
            <h3>Filters & categories</h3>
            <div className="filters">
              <div className="filter-buttons">
                <button><FaThLarge style={{ marginRight: 3 }} /> Categories</button>
                <button><FaDollarSign style={{ marginRight: 3 }} /> Price</button>
                <button><FaGlobeEurope style={{ marginRight: 3 }} /> Countries</button>
                <button><FaTools style={{ marginRight: 3 }} /> Condition</button>
              </div>
            </div>
              <h3>Make a new deal</h3>
               <div className="make-deals-box">
  <div className="deal-actions">
  <button className="deal-btn yellow">
    <FaCloudUploadAlt size={24} /> Confidential price
  </button>
  <button className="deal-btn navy">
    <FaCloudUploadAlt size={24} /> RFQ
  </button>
  <button className="deal-btn blue" onClick={() => navigate('/create-item')}>
    <FaCloudUploadAlt size={24} /> Quote a price
  </button>
</div>
</div>
               <h3>Track my parts sold</h3>
         <div className="track-section">
  <button className="track-btn-deal">
    <FaHandshake style={{ marginRight: 10, fontSize: 20 }} />
    Track Past deals
  </button>
  <button className="track-btn-truck">
    <FaTruck style={{ marginRight: 10, fontSize: 20 }} />
    Track parts sold in delivery
  </button>
</div>
           


          </div>

         <div className="right-column">
                {sellerView === 'counteroffer' ? (
        <>
  <h3>My latest counteroffers received</h3>
  <section className="listings">
    {sellerItems.map(item => (
      <div key={item.id} className="listing seller-listing">
        <div>
          <strong>Item: </strong>{item.title}<br />
          <small>
            {item.bidder} ★★★★★ ({item.reviews} reviews)<br />
            Quantity: {item.quantity} – Flight hours: {item.hours} – Condition: {item.condition} – Location: {item.location}
          </small>
        </div>

        <div className="seller-listing-action">
          <div className="price-column">
            <div className="price">{item.myPrice}</div>
            <div className="label">My original price</div>
          </div>
          <div className="divider" />
          <div className="price-column">
            <div className="price">{item.theirPrice}</div>
            <div className="label">Their offer</div>
            <button className="reply-btn">Reply</button>
          </div>
        </div>
      </div>
    ))}
  </section>
</>
      ) : (
        <>
  <h3 style={{ marginTop: '30px' }}>My latest listing</h3>
  <section className="listings">
    {additionalListings.map(item => (
      <div key={item.id} className="listing seller-listing">
        <div>
          <strong>Item: </strong> {item.title}<br />
          <small>
            {item.bidders ? `${item.bidders} bidders` : "0 bidders"}<br />
            Quantity: {item.quantity} – Flight hours: {item.hours} – Condition: {item.condition} – Location: {item.location}
          </small>
        </div>

        <div className="seller-listing-action">
          <div className="price-column">
            <div className="price">{item.myPrice}</div>
            <div className="label">My original price</div>
          </div>
          <div className="divider" />
          <div className="price-column">
            <div className="price">{item.theirPrice}</div>
            <div className="label">{item.bidders ? "Highest offer" : "Published price"}</div>
            <button className="reply-btn" onClick={() => navigate(`/market/offers/${item.id}`)} >View</button>
          </div>
        </div>
      </div>
    ))}
  </section>
   </>
      )}
</div>
        </section>
        )}


      <Footer />
    </div>
  );
};

export default MarketPage;