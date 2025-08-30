import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import WorldMap from "../components/WorldMap";
import imageDetail from "../assets/figures/ATR+MLG.jpeg";
import documentationPDF from '../assets/files/20250818_Hinweise.pdf';
import TopNavBar from "../components/TopNavBar";


// Example mock data
const items = [
  {
    id: 1,
    name: "ATR Main Landing Gear",
    partNumber: "02118000-22",
    serialNumber: "12345679",
    price: 150000,
    currency: "USD",
    image: imageDetail,
    seller: "Lion technical services",
    quantity: 1,
    flightHours: "new",
    location: "Blagnac",
    description: `OEM, certified complete MLG set for ATR 72-500/600/500. Fully overhauled, ready-to-install, with each order configuration and associated internal integrity. Ideal for operators seeking reliable performance and minimal downtime.`,
    refund: "Refund at payment",
    brokered: "Brokered via Escrow Agent",
    stats: [
      { label: "Highest price", value: "USD 450,000" },
      { label: "Lowest price", value: "USD 60,000" },
      { label: "Price trend YTD", value: "+5.0%" },
      { label: "Parts in market", value: "156" }
    ],
    related: [
      {
        id: 2,
        name: "ATR Main Landing Gear",
        partNumber: "02118000-22",
        seller: "Lion technical services",
        rating: 5,
        reviews: 57,
        location: "Blagnac",
        price: null
      }
    ]
  }
];

const ItemDetail = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const item = items.find(i => String(i.id) === String(id));
const [showAlertModal, setShowAlertModal] = React.useState(false);
const [alertStep, setAlertStep] = React.useState(1);
 const [quantity, setQuantity] = useState(1);
// form fields (customize as needed)
const [notifyUpload, setNotifyUpload] = React.useState(true);
const [maxPrice, setMaxPrice] = React.useState("");
const [condition, setCondition] = React.useState("");
const [customCondition, setCustomCondition] = React.useState("");
const [notifyMarket, setNotifyMarket] = React.useState(false);
const [notifyOther, setNotifyOther] = React.useState(false);

const [showCounterModal, setShowCounterModal] = React.useState(false);
const [counterStep, setCounterStep] = React.useState(1);
const [exchangePartCurrency, setExchangePartCurrency] = React.useState("USD");
const [exchangePartValue, setExchangePartValue] = React.useState("");
const [exchangeAddCurrency, setExchangeAddCurrency] = React.useState("USD");
const [exchangeAddValue, setExchangeAddValue] = React.useState("");
// Counteroffer form fields
const [counterCurrency, setCounterCurrency] = React.useState("USD");
const [counterPrice, setCounterPrice] = React.useState("");
const [counterQuantity, setCounterQuantity] = React.useState("");
const [counterMsg, setCounterMsg] = React.useState("");

// Step 2 fields (optional)
const [partExchangeProposed, setPartExchangeProposed] = React.useState(false);
const [exchangePartName, setExchangePartName] = React.useState("");
const [exchangePartQty, setExchangePartQty] = React.useState("");

  // Steps: 1=select, 2=validate doc, 3=payment, 4=confirmed
  const [activeStep, setActiveStep] = React.useState(1);

  // Step 1: modal state
  const [showBuyModal, setShowBuyModal] = React.useState(false);
  const [selectedQuantity, setSelectedQuantity] = React.useState("");
  const [supplierMessage, setSupplierMessage] = React.useState("");

  // Step 3: payment form
  const [iban, setIban] = React.useState("");
  const [bic, setBic] = React.useState("");
  const [useProfileDetails, setUseProfileDetails] = React.useState(false);

  const handleMessageVendor = () => {
  navigate("/messages", {
    state: { vendor: "Lion technical services" }
  });
};
const handleDownloadDocumentation = () => {
  fetch(documentationPDF)
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '20250818_Hinweise.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    })
    .catch(() => alert('Failed to download documentation.'));
};
  // Utility
  if (!item) return <div className="not-found">Item not found.</div>;

  // Step bar
  const steps = [
    "Step 1", "Step 2", "Step 3"
  ];
  const titles = [
    "Select your quantity and price",
    "Review conditions and validate documentation in the blockchain",
    "Confirm your payment details"
  ];

  // Step bar UI
  const StepBar = () => (
    <><TopNavBar />
    <div className="item-detail-container" style={{
      maxWidth: 1280, margin: "24px auto 0", display: "flex", gap: 40, padding: "0 24px"
    }}>

      {showAlertModal && (
        <div className="success-overlay">
          <div className="success-modal" style={{ maxWidth: 720, width: "97vw" }}>
            <button 
        className="modal-close"
        onClick={() => setShowAlertModal(false)}
        aria-label="Close"
      >
        ×
      </button>
            {alertStep === 1 ? (
              <>
                <h2 style={{ fontWeight: 700, fontSize: "1.29rem", marginBottom: 18 }}>Define the alert</h2>
                <div style={{ textAlign: "left", marginBottom: 18 }}>
                  <label style={{ color: "#003366", display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                    <input type="checkbox" checked={notifyUpload} onChange={() => setNotifyUpload(!notifyUpload)} style={{ accentColor: "#4678ea", width: 18, height: 18 }} />
                    Notify me for the same part number new uploads
                  </label><br />
                  <div style={{ gap: 12, marginBottom: 18 }}>
                    <label style={{ flex: 1 }}>
                      <div style={{ color: "#003366", fontSize: 14, marginBottom: 10 }}>Set a maximum price in USD</div>
                      <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="form-input" placeholder="USD 1234..." style={{ width: "100%", marginBottom: 10 }} />
                    </label>
                    <br />
                    <label style={{ flex: 1 }}>
                      <div style={{ color: "#003366", fontSize: 14, marginBottom: 10 }}>Select condition</div>
                      <select value={condition} onChange={e => setCondition(e.target.value)} className="form-input" style={{ width: "100%", marginBottom: 10 }}>
                        <option value="">Select</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                        <option value="overhauled">Overhauled</option>
                        <option value="custom">Other (specify)</option>
                      </select>
                      {condition === "custom" && (
                        <input
                          value={customCondition}
                          onChange={e => setCustomCondition(e.target.value)}
                          className="form-input"
                          placeholder="Type..." />
                      )}
                    </label><br />
                  </div><br />
                  <label style={{ color: "#003366", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <input type="checkbox" checked={notifyMarket} onChange={() => setNotifyMarket(!notifyMarket)} style={{ accentColor: "#4678ea", width: 18, height: 18 }} />
                    Provide me daily updates on average market price for this part number
                  </label><br />
                  <label style={{ color: "#003366", display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <input type="checkbox" checked={notifyOther} onChange={() => setNotifyOther(!notifyOther)} style={{ accentColor: "#4678ea", width: 18, height: 18 }} />
                    Notify me for other items sold by the supplier
                  </label><br />
                </div>
                <button
                  className="btn-next"
                  style={{ width: "100%" }}
                  onClick={() => setAlertStep(2)}
                >
                  Confirm & Go back
                </button>
              </>
            ) : (
              <>
                <h2>Alerts Activated!</h2>
                <p>You will be notified about any updates or price changes for this item.</p>
                <button className="btn-next" style={{ width: "100%" }} onClick={() => setShowAlertModal(false)}>
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {showCounterModal && (
        <div className="success-overlay">
          <div className="success-modal" style={{ maxWidth: 720, width: "97vw", padding: 0, overflow: "hidden" }}>
           <button 
        className="modal-close"
        onClick={() => setShowCounterModal(false)}
        aria-label="Close"
      >
        ×
      </button>
            {/* Step 1: Counteroffer Form */}
            {counterStep === 1 && (
              <div style={{ padding: "40px 40px 28px" }}>
                <button
                  className="btn-next"
                  style={{
                    background: "#4678ea",
                    color: "#fff",
                    padding: "7px 18px",
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: "1rem",
                    border: "none"
                  }}
                  onClick={() => setCounterStep(2)}
                >
                  Propose a part exchange
                </button>
                <h2 style={{ fontWeight: 700, fontSize: "1.25rem", marginBottom: 18 }}>Define your counteroffer</h2>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginBottom: 8 }}>

                </div>
                <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
                  <label style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, marginBottom: 3, color: '#003366', fontWeight: 600 }}>Currency</div>
                    <input value={counterCurrency} onChange={e => setCounterCurrency(e.target.value)} className="form-input" placeholder="USD" />
                  </label>
                  <label style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, marginBottom: 3, color: '#003366', fontWeight: 600 }}>Set your price</div>
                    <input type="number" value={counterPrice} onChange={e => setCounterPrice(e.target.value)} className="form-input" placeholder="1234..." />
                  </label>
                </div>
                <label style={{ display: "block", marginBottom: 16 }}>
                  <div style={{ fontSize: 16, marginBottom: 3, color: '#003366', fontWeight: 600 }}>Quantity you wish to purchase</div>
                  <input type="number" value={counterQuantity} onChange={e => setCounterQuantity(e.target.value)} className="form-input" placeholder="1234..." style={{ width: "100%" }} />
                </label>
                <label style={{ display: "block", marginBottom: 22 }}>
                  <div style={{ fontSize: 16, marginBottom: 3, color: '#003366', fontWeight: 600 }}>Message to the Supplier</div>
                  <textarea value={counterMsg} onChange={e => setCounterMsg(e.target.value)} className="form-input" placeholder="Type..." style={{ width: "100%", minHeight: 60 }} />
                </label>
                <button
                  className="btn-next"
                  style={{ width: "100%", marginTop: 10 }}
                  onClick={() => setCounterStep(3)}
                >
                  Confirm &amp; Send to Supplier
                </button>
              </div>
            )}
            {/* Step 2: Propose a part exchange */}
            {counterStep === 2 && (
              <div style={{ padding: "40px 40px 28px" }}>
                <button
                  className="btn-next"
                  style={{
                    background: "#4678ea",
                    color: "#fff",
                    padding: "7px 18px",
                    borderRadius: 20,
                    fontWeight: 600,
                    fontSize: "1rem",
                    border: "none"
                  }}
                  onClick={() => setCounterStep(1)} // Go back to price proposal
                >
                  Propose price
                </button>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 0 }}>

                </div>
                <h2 style={{ fontWeight: 700, fontSize: "1.22rem", marginBottom: 18, marginTop: -10 }}>Define your counteroffer</h2>
                <div style={{
                  background: "#f6f8fc",
                  borderRadius: 18,
                  padding: 22,
                  marginBottom: 18,
                  display: "flex",
                  gap: 28,
                  alignItems: "center"
                }}>
                  {/* LEFT: select part */}
                  <div style={{
                    flex: "0 0 160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: 90, height: 90, background: "#e4ecfb",
                      borderRadius: "50%", display: "flex",
                      alignItems: "center", justifyContent: "center", marginBottom: 10
                    }}>
                      <svg width="56" height="56" fill="none" viewBox="0 0 24 24">
                        <path d="M12 16V4M12 4L7 9M12 4l5 5" stroke="#4678ea" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="3" y="16" width="18" height="4" rx="2" fill="#4678ea" fillOpacity="0.15" />
                      </svg>
                    </div>
                    <div style={{ color: "#36518a", fontWeight: 600, fontSize: 13, textAlign: "center" }}>
                      Select part from your inventory
                    </div>
                  </div>
                  {/* RIGHT: value fields */}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3, color: '#003366' }}>Value of the part exchanged</div>
                    <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                      <input
                        className="form-input"
                        placeholder="Currency"
                        value={exchangePartCurrency || "USD"}
                        onChange={e => setExchangePartCurrency(e.target.value)}
                        style={{ width: 90 }} />
                      <input
                        className="form-input"
                        placeholder="Value exchange"
                        value={exchangePartValue}
                        onChange={e => setExchangePartValue(e.target.value)}
                        style={{ flex: 1 }}
                        type="number" />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 15, margin: "14px 0 3px", color: '#003366' }}>Additional funds on top (optional)</div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <input
                        className="form-input"
                        placeholder="Currency"
                        value={exchangeAddCurrency || "USD"}
                        onChange={e => setExchangeAddCurrency(e.target.value)}
                        style={{ width: 90 }} />
                      <input
                        className="form-input"
                        placeholder="Value exchange"
                        value={exchangeAddValue}
                        onChange={e => setExchangeAddValue(e.target.value)}
                        style={{ flex: 1 }}
                        type="number" />
                    </div>
                  </div>
                </div>
                <label style={{ display: "block", marginBottom: 14 }}>
                  <div style={{ fontSize: 14, marginBottom: 3, color: '#003366', fontWeight: 600 }}>Quantity you wish to purchase</div>
                  <input
                    type="number"
                    value={counterQuantity}
                    onChange={e => setCounterQuantity(e.target.value)}
                    className="form-input"
                    placeholder="1234..."
                    style={{ width: "100%" }} />
                </label>
                <label style={{ display: "block", marginBottom: 22 }}>
                  <div style={{ fontSize: 14, marginBottom: 3, color: '#003366', fontWeight: 600 }}>Message to the Supplier</div>
                  <textarea
                    value={counterMsg}
                    onChange={e => setCounterMsg(e.target.value)}
                    className="form-input"
                    placeholder="Type..."
                    style={{ width: "100%", minHeight: 60 }} />
                </label>
                <button
                  className="btn-next"
                  style={{ width: "100%" }}
                  onClick={() => setCounterStep(3)}
                >
                  Confirm &amp; Send to Supplier
                </button>
              </div>
            )}
            {/* Step 3: Success confirmation */}
            {counterStep === 3 && (
              <div style={{ padding: "58px 40px 44px" }}>
                <h2 style={{ color: "#21b841", marginBottom: 12, fontWeight: 700 }}>Counteroffer Sent!</h2>
                <p style={{ fontSize: "1.09rem", color: "#253060", marginBottom: 24 }}>
                  Your counteroffer has been sent to the supplier. You will be notified upon their response.
                </p>
                <button
                  className="btn-next"
                  style={{ width: "100%" }}
                  onClick={() => setShowCounterModal(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 4 }}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`step${activeStep === idx + 1 ? " step-active" : ""}`}
            style={{
              padding: "6px 18px", borderRadius: 16,
              background: activeStep === idx + 1 ? "#204574" : "#f2f4fa",
              color: activeStep === idx + 1 ? "#fff" : "#7d8ca0",
              fontSize: "1rem", fontWeight: 500, marginRight: 4
            }}
          >
            {step}
          </div>
        ))}
        <h2 style={{ color: "#003366", marginLeft: 10, fontWeight: 600 }}>
          {activeStep <= 3 ? titles[activeStep - 1] : ""}
        </h2>
      </div>
    </div></>
  );

  // Step 1 modal
  const BuyModal = (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(30, 40, 60, 0.14)", zIndex: 9000,
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 32, padding: "38px 36px 30px",
        minWidth: 440, maxWidth: 800, width: "90vw", boxShadow: "0 8px 32px rgba(0,0,0,0.15)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: 24, color: "#003366" }}>Define quantity of item to purchase</h2>
         <div style={{ marginBottom: 16, color: "#003366"}}>
         <b>Quantity</b>
        <input
          type="number"
          background= "#fff"
          min={1}
          placeholder="1234..."
          value={selectedQuantity}
          onChange={e => setSelectedQuantity(e.target.value)}
          style={{
            border: "1.5px solid #b5c2e0", borderRadius: 12, padding: "14px 0px",
            fontSize: 18, width: "100%", marginBottom: 24, background: "#fff", color: "#003366"
          }}
        />
        </div>
        <div style={{ marginBottom: 16, color: "#003366"}}>
          <b>Message to the Supplier</b>
          <textarea
            value={supplierMessage}
            onChange={e => setSupplierMessage(e.target.value)}
            placeholder="Type..."
            style={{
              width: "100%",
              minHeight: 90,
              resize: "vertical",
              borderRadius: 14,
              border: "1.5px solid #dbe3ee",
              marginTop: 8,
              padding: "14px 0px",
              fontSize: "1rem",
              background: "#fff",
              color: "#003366"
            }}
          />
        </div>
        <button
          style={{
            width: "100%",
            background: "#5177c2",
            color: "#fff",
            marginTop: 20,
            fontWeight: 700,
            fontSize: 18,
            padding: "16px 0",
            borderRadius: 12,
            border: "none",
            cursor: "pointer"
          }}
          disabled={!selectedQuantity}
          onClick={() => {
            setShowBuyModal(false);
            setActiveStep(2);
          }}
        >
          Confirm & Proceed
        </button>
      </div>
    </div>
  );

  // Step 3: Payment form
  const PaymentForm = (
    <div style={{
      background: "#f8fafd", borderRadius: 12, padding: 24, margin: "24px 0"
    }}>
      <h3 style={{ margin: "0 0 12px 0", color: "#003366" }}>Insert payment details</h3>
      <input
        type="text"
        placeholder="IBAN"
        value={iban}
        onChange={e => setIban(e.target.value)}
        style={{
          width: "100%", marginBottom: 14, fontSize: 16,
          border: "1.5px solid #003366", borderRadius: 12, padding: "14px 18px", background: '#fff'
        }}
      />
      <input
        type="text"
        placeholder="BIC"
        value={bic}
        onChange={e => setBic(e.target.value)}
        style={{
          width: "100%", marginBottom: 14, fontSize: 16,
          border: "1.5px solid #003366", borderRadius: 12, padding: "14px 18px", background: '#fff'
        }}
      />
      <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10, fontSize: 15, color: "#003366" }}>
        <input
          type="checkbox"
          checked={useProfileDetails}
          onChange={() => setUseProfileDetails(!useProfileDetails)}
          style={{ accentColor: "#3a65a5", width: 18, height: 18, background: '#b5c2e0'}}
        />
        Use profile details
      </label>
    </div>
  );

  // Step 4: Confirmation
  const FinalStepContent = (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <div style={{
        color: "#32ad49",
        fontWeight: 700,
        fontSize: 22,
        marginBottom: 22,
        marginTop: 24
      }}>
        Payment Validated — you can now download your invoice
      </div>
      {/* Example: fake progress image/line */}
      <div style={{ background: "#f8fafd", borderRadius: 16, marginBottom: 30, padding: 16 }}>
        <div style={{ width: "100%", maxWidth: 420, margin: "0 auto", fontSize: 15 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <div style={{ color: "green"}}>Item purchased</div>
            <div style={{ color: "green"}}>Item shipped</div>
            <div style={{ color: "grey" }}>Dispatch center</div>
            <div style={{ color: "grey" }}>Item received</div>
          </div>
          <div style={{
            height: 2, background: "#aaa", margin: "16px 0",
            position: "relative", width: "100%"
          }}>
            <div style={{
              position: "absolute", left: 0, top: -7, width: 16, height: 16, background: "#32ad49", borderRadius: "50%", border: "2px solid #fff"
            }} />
            <div style={{
              position: "absolute", left: "33%", top: -7, width: 16, height: 16, background: "#32ad49", borderRadius: "50%", border: "2px solid #fff"
            }} />
            <div style={{
              position: "absolute", left: "66%", top: -7, width: 16, height: 16, background: "#aaa", borderRadius: "50%", border: "2px solid #fff"
            }} />
            <div style={{
              position: "absolute", left: "100%", top: -7, width: 16, height: 16, background: "#aaa", borderRadius: "50%", border: "2px solid #fff", transform: "translateX(-100%)"
            }} />
          </div>
        </div>
      </div>
      <button className="main-btn" style={{ background: "#203050", color: "#fff", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, marginBottom: 12 }}>Track my order</button>
      <button className="main-btn" style={{ background: "#8db2f7", color: "#204574", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}>Download invoice</button>
    </div>
  );

  // LEFT actions per step
  let leftActions = null;
  if (activeStep === 1) {
    leftActions = (
      <>
       <h2 style={{ color: "#003366" }}>Select your quantity</h2>
              <div className="quantity-selector" style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "2rem" }}>
  <button
    type="button"
    className="qty-btn"
    onClick={() => setQuantity(q => q - 1)}
  >
    −
  </button>
  <div className="qty-value" style={{ minWidth: "32px", textAlign: "center", color: "#003366"}}>{quantity}</div>
  <button
    type="button"
    className="qty-btn"
    onClick={() => setQuantity(q => q + 1)}
  >
    +
  </button>
</div>
        <button onClick={() => { setShowAlertModal(true); setAlertStep(1); }} className="main-btn" style={{ background: "#e4a829", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, color: "white" }}>Mark for alerts</button>
        <button onClick={() => { setShowCounterModal(true); setCounterStep(1); }} className="main-btn" style={{ background: "#e8eaf2", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}>Counteroffer</button>
        <button  onClick={() => {setShowBuyModal(false); setActiveStep(2);}} className="main-btn" style={{ background: "#2478b6", color: "#fff", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}>
          Buy @ {item.currency} {(item.price * quantity).toLocaleString()}
        </button>
      </>
    );
  } else if (activeStep === 2) {
    leftActions = (
      <>
        <button className="main-btn" style={{ background: "#203050", color: "#fff", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}>Save in cart</button>
        <button className="main-btn" style={{ background: "#6788db", color: "#fff", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}
          onClick={() => setActiveStep(3)}
        >Validate documentation</button>
      </>
    );
  } else if (activeStep === 3) {
    leftActions = (
      <>
        <button className="main-btn" style={{ background: "#203050", color: "#fff", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}>Save in cart</button>
        <button
          className="main-btn"
          style={{ background: "#8db2f7", color: "#204574", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600 }}
          disabled={!iban || !bic}
          onClick={() => setActiveStep(4)}
        >Buy</button>
      </>
    );
  }

  return (
    <div className="item-detail-page" style={{ background: "#F9F9F9", minHeight: "100vh", paddingBottom: "30px" }}>
      {showBuyModal && BuyModal}
      {/* Back button */}
      <div style={{ padding: "22px 0 0 36px" }}>
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back to Market
        </button>
      </div>
    
      {/* Steps bar (hide after confirmation) */}
      {activeStep <= 3 && <StepBar />}
      {/* Main info & actions */}
      <div className="item-detail-container" style={{
        maxWidth: 1280, margin: "24px auto 0", display: "flex", gap: 40, padding: "0 24px"
      }}>
        {/* LEFT: Info and actions */}
        <div style={{ flex: 1.5 }}>
          <div style={{ marginBottom: 22, display: "flex", gap: 24 }}>
            <div>
              <div style={{ color: "#888", marginBottom: 6 }}>{item.name}</div>
              <div style={{ color: "#003366", fontWeight: 600, fontSize: 18, marginBottom: 3 }}>
                Part number: <span style={{ color: "#123" }}>{item.partNumber}</span>
              </div>
              <div style={{ fontWeight: 400, fontSize: 15, color: "#495" }}>Serial number: {item.serialNumber}</div>
              <div style={{ marginTop: 22, fontSize: 28, fontWeight: 700, color: "#204574" }}>
                {item.currency} {item.price.toLocaleString()}
                {(activeStep > 1) && (
                  <div style={{ fontSize: 18, fontWeight: 500, marginTop: 8 }}>
                    Selected quantity: {quantity}
                  </div>
                )}
                {(activeStep > 2) && (
                  <div style={{ fontSize: 16, marginTop: 8 }}>
                    Documentation: <span style={{ color: "#32ad49" }}>Validated</span>
                  </div>
                )}
              </div>
              <div style={{
                display: "flex", flexDirection: "column", gap: 14, marginTop: 12,
                alignItems: "stretch", width: "100%", minWidth: 300
              }}>
                {activeStep < 4 ? leftActions : null}
              </div>
              
            </div>
{(activeStep === 1 || activeStep === 2) && (
  <img
    src={imageDetail}
    alt={item.name}
    style={{
      borderRadius: 12,
      width: 525,
      height: 350,
      objectFit: "cover",
      background: "#e8e8e8"
    }}
  />
)}
{activeStep === 3 && PaymentForm}
{activeStep === 4 && FinalStepContent}
          </div>
        </div>
        {/* RIGHT: Seller/info */}
        <div style={{
          flex: 1,
          background: "#fff",
          borderRadius: 16,
          padding: 22,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minWidth: 340,
          color: "#003366"
        }}>
          <div><b>Seller:</b> {item.seller}</div>
          <div><b>Quantity:</b> {item.quantity}</div>
          <div><b>Flight hours:</b> {item.flightHours}</div>
          <div><b>Location:</b> {item.location}</div>
          <div><b>Description:</b> <span style={{ color: "#1b3553" }}>{item.description}</span></div>
          <div><b>Refund:</b> {item.refund}</div>
          <div><b>{item.brokered}</b></div>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="main-btn" onClick={handleDownloadDocumentation}>Download documentation</button>
            <button className="main-btn" onClick={handleMessageVendor}style={{ background: "#2861b8", color: "#fff" }}>Message the vendor</button>
          </div>
        </div>
      </div>
      {/* Below: Key insights and related */}
      <div style={{
        maxWidth: 1280, margin: "34px auto 0", display: "flex", gap: 26, padding: "0 24px"
      }}>
        {/* Key insights (left) */}
        <div style={{
          color: "#003366", flex: 1.2, background: "#fff", borderRadius: 14, padding: 18, boxShadow: "0 1px 10px rgba(0,0,0,0.03)"
        }}>
          <div style={{ fontWeight: 600, marginBottom: 10 }}>Key insights on Part {item.partNumber}</div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {item.stats && item.stats.map((stat, idx) => (
              <div key={idx} style={{
                borderRadius: 10, background: "#f2f6fa", padding: "10px 18px", fontSize: 15, minWidth: 108, textAlign: "center"
              }}>
                <b>{stat.value}</b><br />
                <span style={{ fontSize: 13, color: "#888" }}>{stat.label}</span>
              </div>
            ))}
          </div>
          <WorldMap />
        </div>
        {/* Related parts (right) */}
        <div style={{
          flex: 1, background: "#fff", borderRadius: 14, padding: 18, boxShadow: "0 1px 10px rgba(0,0,0,0.03)"
        }}>
          <div style={{ color: "#003366", fontWeight: 600, marginBottom: 10 }}>Related parts in this market</div>
          {item.related && item.related.map(rel => (
            <div key={rel.id} style={{
              color: "#003366", borderBottom: "1px solid #e6e6e6", padding: "12px 0", display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <b>{rel.name}</b> | Part {rel.partNumber}
                <div style={{ fontSize: 13, color: "#3a5373" }}>Seller: {rel.seller}</div>
              </div>
              <button className="main-btn" style={{ background: "#eee", width: 96, border: "none", borderRadius: 8, padding: "8px 0", fontWeight: 600 }}>Bid</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;