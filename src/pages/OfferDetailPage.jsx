import React from "react";
import { useParams } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import  additionalListings  from "../assets/data/listingData.js"; // <-- import your listings data
import WorldMap from "../components/WorldMap.jsx";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart
} from 'recharts';
import engine from '../assets/figures/engine.jpg'; // replace with your actual part image
const OfferDetailPage = () => {
  const { id } = useParams();
const [isModalOpen, setIsModalOpen] = React.useState(false);
const [modalStep, setModalStep] = React.useState(1);
const [activeOffer, setActiveOffer] = React.useState(null);
const [actionMessage, setActionMessage] = React.useState(null);

const openOfferModal = (offer) => {
  setActiveOffer(offer);
  setModalStep(1);
  setIsModalOpen(true);
};

const closeOfferModal = () => {
  setIsModalOpen(false);
  setActiveOffer(null);
};

// Close on ESC
React.useEffect(() => {
  const onKey = (e) => e.key === 'Escape' && setIsModalOpen(false);
  if (isModalOpen) window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, [isModalOpen]);
  // find the listing by ID
  const listing = additionalListings.find(l => l.id === id);

  if (!listing) {
    return (
      <div>
        <TopNavBar />
        <div style={{ padding: "2rem" }}>Listing not found</div>
        <Footer />
      </div>
    );
  }

  const data3 = [
  { month: 'Jan', giraffe: 1, market: 3 },
  { month: 'Feb', giraffe: 3, market: 4 },
  { month: 'Mar', giraffe: 4, market: 6 },
  { month: 'Apr', giraffe: 5, market: 6 },
  { month: 'May', giraffe: 6, market: 7 },
  { month: 'Jun', giraffe: 6, market: 8 },
  { month: 'Jul', giraffe: 5, market: 8 },
  { month: 'Aug', giraffe: 5, market: 7 },
  { month: 'Sep', giraffe: 4, market: 6 },
  { month: 'Oct', giraffe: 4, market: 5 },
  { month: 'Nov', giraffe: 4, market: 5 },
  { month: 'Dec', giraffe: 5, market: 6 },
];

 return (
  <div className="offer-detail-wrapper">
    <TopNavBar />
<h2 className="od-heading">Check out the status of your part up for sale</h2>
    <section className="offer-detail three-col">
      {/* LEFT SIDEBAR — part summary */}
      <aside className="od-leftcard">
        <h4 className="od-part-title">
          {listing.title.split("|")[0].replace("item:", "").trim()}
        </h4>
        <div className="od-meta">
          <div><strong>Part number:</strong> {listing.id}</div>
          <div><strong>Serial number:</strong> 12345679</div>
        </div>

        <div className="od-status-badge">RFQ</div>

        <ul className="od-specs">
          <li><strong>Sold quantity:</strong> {listing.quantity}</li>
          <li><strong>Flight hours:</strong> {listing.hours}</li>
          <li><strong>Condition:</strong> {listing.condition}</li>
          <li><strong>Aircraft type:</strong> A320</li>
        </ul>
      </aside>

      {/* CENTER — offers received + messages */}
      <main className="od-center">
        

        <div className="od-panel">
          <div className="od-panel-header">
            <h3>Offers received for the part</h3>
            <div className="od-offers-count">
              <span className="od-count">{listing.bidders ?? 0}</span>
              <span className="od-count-label">Offers received</span>
            </div>
          </div>

          {(listing.bidders ?? 0) > 0 ? (
    <div className="od-offers-list">
      {[
        {
          bidder: "Lion technical services",
          reviews: 97,
          location: "Blagnac",
          price: "USD 82,000",
          exchange: null,
          stars: 5,
        },
        {
          bidder: "Zairus corp",
          reviews: 9,
          location: "Blagnac",
          price: "USD 60,000",
          exchange: "2 ATR 43:500 seats (value: USD 20,000)",
          stars: 5,
        },
        {
          bidder: "Charly Technic",
          reviews: 33,
          location: "Blagnac",
          price: "USD 50,000",
          exchange: "3 ATR 72:500 seats (value: USD 600)",
          stars: 5,
        },
      ].map((o, i) => (
        <button
          key={i}
          type="button"
          className="od-offer-card od-offer-click"
          onClick={() => openOfferModal(o)}
        >
          <div className="od-offer-top">
            <div className="od-bidder"><strong>Bidder:</strong> {o.bidder}</div>
            <div className="od-stars">
              {"★".repeat(o.stars)}{"☆".repeat(5 - o.stars)}
            </div>
            <div className="od-reviews">({o.reviews} reviews)</div>
          </div>
          <div className="od-offer-body">
            <div><strong>Location:</strong> {o.location}</div>
            <div><strong>Offered price:</strong> {o.price}</div>
            {o.exchange && <div><strong>Exchange offer:</strong> {o.exchange}</div>}
          </div>
        </button>
      ))}
    </div>
  ) : (
    <div className="od-no-offers">
      <p>No offers received yet</p>
    </div>
  )}
        </div>

        <div className="od-panel" style={{ marginTop: 16 }}>
              <div className="od-panel-header">
            <h3>Messages received for the part</h3>
            <div className="od-offers-count">
              <span className="od-count">{listing.bidders ?? 0}</span>
              <span className="od-count-label">Messages </span>
            </div>
          </div>
          
          <div className="od-message">
            <div className="od-avatar" aria-hidden>PF</div>
            <div className="od-msg-content">
              <div className="od-msg-head">
                <strong>Philippe François, Aeroservices</strong>
                <span className="od-time">11:00</span>
              </div>
              <p>Hello Jean-Jacques, how are you…</p>
            </div>
            <button className="od-msg-open" title="Open message">1</button>
          </div>
        </div>
      </main>

      {/* RIGHT — product image, seller info, description, actions */}
      <aside className="offer-right od-right">
        <img
          src={engine}
          alt="Part preview"
          className="offer-img"
        />
        <div className="seller-info">
          <p><strong>Seller:</strong> Giraffe technical services</p>
          <p><strong>Location:</strong> Blagnac, France</p>
          <p><strong>Offer start:</strong> 12.05.2025 – 12:00</p>
        </div>
        <div className="description">
          <p><strong>Description: </strong> CFM-certified carbon brake unit compatible with A318/A319/A320/A321 family aircraft.
            Offers superior heat dissipation, reduced weight, and extended service intervals.
            Overhauled and ready-to-ship with full trace and EASA/FAA certification.
          </p>
        </div>
        <div className="actions">
          <button className="doc-btn">Download documentation</button>
          <button className="modify-btn">Modify</button>
          <button className="best-btn">Boost sales</button>
        </div>
      </aside>
</section>
      {/* ANALYTICS ROW */}
<section className="od-analytics">
  {/* Chart card */}
  <div className="od-card">
    <h3 className="od-card-title">Price trend (Giraffe vs Market)</h3>
    <div className="od-card-body chart-wrap">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data3} margin={{ right: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="giraffe" fill="#4682e9" name="Giraffe Technical Services" />
          <Line type="monotone" dataKey="market" stroke="orange" name="Market" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Map card */}
  <div className="od-card">
    <h3 className="od-card-title">Market distribution</h3>
    <div className="od-card-body map-wrap">
      <WorldMap />
    </div>
  </div>
</section>
           
    {isModalOpen && (
  <div className="od-modal-overlay" onClick={closeOfferModal}>
    <div
      className="od-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="odModalTitle"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="od-modal-header">
        <h3 id="odModalTitle">Proposal detail</h3>
        <button className="od-modal-close" onClick={closeOfferModal} aria-label="Close">×</button>
      </div>

      {/* STEP 1: Offer from bidder */}
      {modalStep === 1 && (
        <div className="od-modal-body">
          <div className="od-modal-section">
            <div className="od-offer-line">
              <div>
                <strong>Bidder:</strong> {activeOffer?.bidder} &nbsp;
                <span className="od-stars">{"★".repeat(activeOffer?.stars ?? 0)}</span>
                <span className="od-reviews"> ({activeOffer?.reviews} reviews)</span>
              </div>
              <div className="od-offer-mini">
                <div><strong>Location:</strong> {activeOffer?.location}</div>
                <div><strong>Offered price:</strong> {activeOffer?.price}</div>
                {activeOffer?.exchange && <div><strong>Exchange offer:</strong> {activeOffer.exchange}</div>}
              </div>
            </div>
          </div>


            <label className="od-label">Message to the Buyer</label>
            <textarea className="od-textarea" rows={5} placeholder="Type..." />


          <div className="od-modal-actions">
            {activeOffer?.exchange ? (
              <button className="btn btn-outline" onClick={() => setModalStep(2)}>Next</button>
            ) : (
              <span />
            )}
            <div className="od-action-right">
              <button className="btn btn-green">Confirm</button>
              <button className="btn btn-navy">Refuse</button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Proposed part for exchange */}
      {modalStep === 2 && (
        <div className="od-modal-body">
             <h4>Check the proposed part for exchange</h4>
          <div className="od-modal-section">
            <div className="od-exchange-body">
                <div>
 <div><strong>Item:</strong> ATR passenger seat</div>
              <div><strong>Part:</strong> P9P-000-002</div>
              <div><strong>Seller:</strong> Zairus services</div>
              <div><strong>Hours:</strong> 4,000</div>
              <div><strong>Location:</strong> Blagnac</div>
                </div>
              <div className="od-exchange-side">
          <div className="od-price-pill">USD 200</div>
          <button className="btn btn-small btn-outline">View</button>
        </div>
            </div>
            
          </div>


            <label className="od-label">Message to the Buyer</label>
            <textarea className="od-textarea" rows={5} placeholder="Type..." />


          <div className="od-modal-actions">
            <button className="btn btn-light" onClick={() => setModalStep(1)}>Back</button>
            <div className="od-action-right">
              <button 
  className="btn btn-green" 
  onClick={() => setActionMessage("✅ You have confirmed this offer.")}
>
  Confirm
</button>
<button 
  className="btn btn-navy" 
  onClick={() => setActionMessage("❌ You have refused this offer.")}
>
  Refuse
</button>
            </div>
          </div>
          {actionMessage && (
  <div className="od-action-message">
    {actionMessage}
  </div>
)}
        </div>
      )}
    </div>
  </div>
)}

    <Footer />
  </div>
);
};

export default OfferDetailPage;