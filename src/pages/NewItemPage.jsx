import React, { useState } from "react";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import "../airzon.css";

const defaultItem = {
  name: "",
  partNumber: "",
  serialNumber: "",
  offerUntilDate: "",
  offerUntilTime: "",
  aircraftType: "",
  engineType: "",
  location: "",
  description: "",
  images: [],
  quantity: "",
  unit: "Item",
  flightHours: "New",
  cycle: "New",
  currency: "USD",
  price: "",
  documentation: [],
  paymentType: "",
  iban: "",
  bic: "",
  useProfileBank: false,
};

const paymentOptions = [
  "Payment via Airzon with escrow account managed by Escrow Agent Partner",
  "Bilateral payment with escrow account managed by Escrow Agent Partner",
  "Payment via Airzon without escrow account",
  "Bilateral payment without escrow account",
];

export default function NewItemPage() {
  const [step, setStep] = useState(1);
  const [item, setItem] = useState(defaultItem);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectPayment = (value) => {
    setItem((prev) => ({ ...prev, paymentType: value }));
  };

  const handleImageUpload = (e) => {
    setItem((prev) => ({
      ...prev,
      images: [...prev.images, ...Array.from(e.target.files)],
    }));
  };

  const handleDocUpload = (e) => {
    setItem((prev) => ({
      ...prev,
      documentation: [...prev.documentation, ...Array.from(e.target.files)],
    }));
  };

  // --- Step 1: Basic Item Info ---
  function renderStep1() {
    return (
      <>
        <div className="step-header">
          <button className="tab active" disabled>Step 1</button>
          <button className="tab" disabled>Step 2</button>
          <button className="tab" disabled>Step 3</button>
        </div>
        <h2 className="section-title">Fill the main information about your item</h2>
        <form className="item-form">
          <div className="item-form-left">
            <div className="form-group">
              <label htmlFor="name" className="form-input-label">Name</label>
              <input name="name" id="name" className="form-input" placeholder="Type..." value={item.name} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="partNumber" className="form-input-label">Part number</label>
                <input name="partNumber" id="partNumber" className="form-input" placeholder="EE-55547" value={item.partNumber} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="serialNumber" className="form-input-label">Serial number</label>
                <input name="serialNumber" id="serialNumber" className="form-input" placeholder="123456789" value={item.serialNumber} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="offerUntilDate" className="form-input-label">Maintain offer until</label>
                <input name="offerUntilDate" id="offerUntilDate" className="form-input" placeholder="DD/MM/YYYY" value={item.offerUntilDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="offerUntilTime" className="form-input-label">Time</label>
                <input name="offerUntilTime" id="offerUntilTime" className="form-input" placeholder="00:00am" value={item.offerUntilTime} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="aircraftType" className="form-input-label">Aircraft type</label>
                <input name="aircraftType" id="aircraftType" className="form-input" placeholder="Type..." value={item.aircraftType} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="engineType" className="form-input-label">Engine type</label>
                <input name="engineType" id="engineType" className="form-input" placeholder="Type..." value={item.engineType} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="location" className="form-input-label">Current location of the part</label>
              <input name="location" id="location" className="form-input" placeholder="City" value={item.location} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="form-input-label">Description</label>
              <textarea name="description" id="description" className="form-input" rows={3} placeholder="Type..." value={item.description} onChange={handleChange} />
            </div>
          </div>
          <div className="item-form-right">
            <label className="upload-label" htmlFor="upload-images">
              <div className="upload-area">
                <div className="upload-icon">☁️</div>
                <div className="upload-text">Upload pictures & videos</div>
                <div className="upload-count">{item.images.length > 0 && `${item.images.length} file(s) selected`}</div>
              </div>
            </label>
            <input type="file" accept="image/*,video/*" multiple id="upload-images" style={{ display: "none" }} onChange={handleImageUpload} />
          </div>
        </form>
        <div className="step-actions">
          <button className="form-button wide secondary">Save draft</button>
          <button
            className="form-button wide"
            onClick={() => setStep(2)}
            disabled={!item.name || !item.partNumber || !item.serialNumber || !item.offerUntilDate || !item.aircraftType}
          >
            Set price & quantity
          </button>
        </div>
      </>
    );
  }

  // --- Step 2: Set Price, Certificate ---
  function renderStep2() {
    return (
      <>
        <div className="step-header">
          <button className="tab" disabled>Step 1</button>
          <button className="tab active" disabled>Step 2</button>
          <button className="tab" disabled>Step 3</button>
        </div>
        <h2 className="section-title">Upload the certificate and set your price</h2>
        <form className="item-form">
          <div className="item-form-left">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity" className="form-input-label">Quantity sold</label>
                <input name="quantity" id="quantity" className="form-input" placeholder="1,2,3..." value={item.quantity} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="unit" className="form-input-label">Unit of measure</label>
                <input name="unit" id="unit" className="form-input" placeholder="Item" value={item.unit} onChange={handleChange} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="flightHours" className="form-input-label">Flight hours</label>
                <input name="flightHours" id="flightHours" className="form-input" placeholder="New" value={item.flightHours} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cycle" className="form-input-label">Cycle</label>
                <input name="cycle" id="cycle" className="form-input" placeholder="New" value={item.cycle} onChange={handleChange} />
              </div>
            </div>
             <label htmlFor="cycle" className="form-input-label">Market prices for ATR Main Landing Gear</label>
            <div className="market-info-row">
               
              <div className="market-info-card">USD 450,000<br /><span>Highest price</span></div>
              <div className="market-info-card">USD 60,000<br /><span>Lowest price</span></div>
              <div className="market-info-card">+5.0%<br /><span>Price trend YTD</span></div>
              <div className="market-info-card">156<br /><span>Parts currently listed in Airzon</span></div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="currency" className="form-input-label">Currency</label>
                <input name="currency" id="currency" className="form-input" placeholder="USD" value={item.currency} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="price" className="form-input-label">Set your price</label>
                <input name="price" id="price" className="form-input" placeholder="1234..." value={item.price} onChange={handleChange} />
              </div>
            </div>
          </div>
          <div className="item-form-right">
            <label className="upload-label" htmlFor="upload-docs">
              <div className="upload-area">
                <div className="upload-icon">☁️</div>
                <div className="upload-text">Upload Documentation</div>
                <div className="upload-count">{item.documentation.length > 0 && `${item.documentation.length} file(s) selected`}</div>
              </div>
            </label>
            <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" multiple id="upload-docs" style={{ display: "none" }} onChange={handleDocUpload} />
          </div>
        </form>
        <div className="step-actions">
          <button className="form-button wide secondary" onClick={() => setStep(1)}>Back</button>
          <button className="form-button wide secondary">Save draft</button>
          <button
            className="form-button wide"
            onClick={() => setStep(3)}
            disabled={!item.price}
          >
            Review and validate
          </button>
        </div>
      </>
    );
  }

  // --- Step 3: Validate and Certify ---
  function renderStep3() {
    return (
      <>
        <div className="step-header">
          <button className="tab" disabled>Step 1</button>
          <button className="tab" disabled>Step 2</button>
          <button className="tab active" disabled>Step 3</button>
        </div>
        <h2 className="section-title">Validate your inputs and upload your certificate on the blockchain</h2>
        <div className="item-recap-section">
          <div className="item-recap-left">
            <div className="recap-box">
              <div><strong>{item.name || "Item Name"}</strong></div>
              <div>Part number: {item.partNumber}</div>
              <div>Serial number: {item.serialNumber}</div>
              <div>Price: {item.currency} {item.price}</div>
              <div>Sold quantity: {item.quantity}</div>
              <div>Flight hours: {item.flightHours}</div>
              <div>Cycles: {item.cycle}</div>
              <div>Aircraft type: {item.aircraftType}</div>
            </div>
            <div className="form-group" style={{ marginTop: 18 }}>
              <label>Select type of payment</label>
              {paymentOptions.map((opt, idx) => (
                <div key={idx} className="radio-row">
                  <input type="radio" name="paymentType" checked={item.paymentType === opt} onChange={() => handleSelectPayment(opt)} /> {opt}
                </div>
              ))}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="iban" className="form-input-label">IBAN</label>
                <input name="iban" id="iban" className="form-input" placeholder="IBAN" value={item.iban} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="bic" className="form-input-label">BIC</label>
                <input name="bic" id="bic" className="form-input" placeholder="BIC" value={item.bic} onChange={handleChange} />
              </div>
            </div>
            <label className="checkbox-label">
              <input type="checkbox" name="useProfileBank" checked={item.useProfileBank} onChange={handleChange} />
              Use my profile details
            </label>
          </div>
          <div className="item-recap-right">
            {item.images.length > 0 ? (
              <img src={URL.createObjectURL(item.images[0])} alt="part" className="item-img-preview" />
            ) : (
              <div className="img-placeholder">No image</div>
            )}
            <div className="item-seller-info">
              <div className="seller-title">{item.name || "Seller: ..."}</div>
              <div className="seller-details">
                Location: {item.location || "..."}
                <br />
                Offer until: {item.offerUntilDate ? `${item.offerUntilDate} ${item.offerUntilTime}` : "..."}
                <br />
                <span>{item.description || "Description..."}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="step-actions">
          <button className="form-button wide secondary" onClick={() => setStep(2)}>Back</button>
          <button className="form-button wide secondary">Download documentation</button>
          <button className="form-button wide secondary">Save draft</button>
          <button
            className="form-button wide green"
            disabled={!item.paymentType}
            onClick={() => alert("Listing validated and sent to blockchain!")}
          >
            Validate
          </button>
        </div>
      </>
    );
  }

  // === Main render ===
  return (
    <div className="login-page-wrapper">
      <TopNavBar />
      <div className="login-container">
        <div className="login-form-section">
          <div className="login-box">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}