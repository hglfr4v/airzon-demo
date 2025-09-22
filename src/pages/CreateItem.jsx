import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import '../airzon.css';
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";

  const defaultItem = {
  name: "",
  partNumber: "",
  serialNumber: "",
  untilDate: "",
  untilTime: "",
  aircraftType: "",
  engineType: "",
  location: "",
  description: "",
  quantity: "",
  flightHours: "New",
  cycles: "New",
  price: "",
  currency: "USD",
  marketPrices: {
    highest: 450,
    lowest: 60,
    trend: "+5.0%",
    listed: 156,
  },
  docs: [],
  image: null,
  paymentType: "",
  iban: "",
  bic: "",
  useProfile: false,
};

const paymentOptions = [
  "Payment via Airzon with escrow account managed by Escrow Agent Partner",
  "Bilateral payment with escrow account managed by Escrow Agent Partner",
  "Payment via Airzon without escrow account",
  "Bilateral payment without escrow account"
];

function Radio({ name, value, checked, onChange, label }) {
  return (
    <label className="rfp-radio">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span />
      {label}
    </label>
  );
}

const CreateItem = () => {
  const [step, setStep] = useState(1);
  const [item, setItem] = useState(defaultItem);
  const [imagePreview, setImagePreview] = useState(null);
  const [docName, setDocName] = useState(null);

  const initialForm = {
  // Step 1
  name: "",
  partNumber: "",
  rfpUntilDate: "",
  rfpUntilTime: "",
  aircraftType: "",
  sellerName: "",
  sellerLocation: "",
  engineType: "",
  currentLocation: "",
  description: "",
  media: [],

  // Step 2
  quantity: "",
  flightHours: "New",
  cycles: "New",
  lastMaintenanceDate: "",
  preferredRecipients: "anchor", // anchor | all | selected
  selectedSuppliers: [],

  // Step 3
  paymentType: "airzon_escrow", // airzon_escrow | bilateral_escrow | airzon_no_escrow | bilateral_no_escrow
  acceptedCurrencies: "ALL",
  exchangeCurrency: "USD",
  exchangeValue: "",
  exchangePartId: "",
};

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));
const [form, setForm] = useState(initialForm);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  function Label({ children }) {
  return <label className="rfp-label">{children}</label>;
}

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem((prev) => ({ ...prev, docs: [file] }));
      setDocName(file.name);
    }
  };
  const handleNumberOnly = (field) => (e) => {
    const v = e.target.value.replace(/[^\d.,]/g, "");
    setForm((f) => ({ ...f, [field]: v }));
  };
  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
const [showBanner, setShowBanner] = useState(false);
  return (
    <><div className="create-item-root">
      <TopNavBar />
      {showBanner && (
        <div className="success-overlay">
          <div className="success-modal">
            <h2>Item successfully created!</h2>
            <p>Your item was published and is now live on Airzon.</p>
            <button className="btn-next" onClick={() => setShowBanner(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="create-item-card">
        <button
          onClick={() => window.history.back()}
          className="btn-back-arrow"
          style={{ marginBottom: "1rem", display: "flex", alignItems: "center", color: "#003366", background: "none", border: "none", cursor: "pointer" }}
        >
          ← Back
        </button>

        <div className="stepper">
          {[1, 2, 3].map((s) => {
            const isActive = step === s;
            const isClickable = s <= step; // Only allow clicking current and previous steps

            return (
              <div
                key={s}
                className={`step ${isActive ? "active" : ""}`}
                onClick={() => {
                  if (isClickable) setStep(s);
                } }
                style={{
                  cursor: isClickable ? "pointer" : "not-allowed",
                  opacity: isClickable ? 1 : 0.5,
                }}
              >
                Step {s}
              </div>
            );
          })}
        </div>

        {/* --- Step 1: Main Info --- */}
        {step === 1 && (
          <div className="step-content">
            <h2>Fill the main information about your item</h2>
            <div className="create-item-form">
              <div className="form-fields">
                <label>
                  Name
                  <input name="name" value={item.name} onChange={handleChange} placeholder="Type..." />
                </label>
                <div className="two-cols">
                  <label>
                    Part number
                    <input name="partNumber" value={item.partNumber} onChange={handleChange} placeholder="EE-55547" />
                  </label>
                  <label>
                    Serial number
                    <input name="serialNumber" value={item.serialNumber} onChange={handleChange} placeholder="123456789" />
                  </label>
                </div>
                <div className="two-cols">
                  <label>
                    Maintain offer until
                    <input type="date" name="untilDate" value={item.untilDate} onChange={handleChange} />
                  </label>
                  <label>
                    <span style={{ opacity: 0 }}>.</span>
                    <input type="time" name="untilTime" value={item.untilTime} onChange={handleChange} />
                  </label>
                </div>
                <div className="two-cols">
                  <label>
                    Aircraft type
                    <input name="aircraftType" value={item.aircraftType} onChange={handleChange} placeholder="Type..." />
                  </label>
                  <label>
                    Engine type
                    <input name="engineType" value={item.engineType} onChange={handleChange} placeholder="Type..." />
                  </label>
                </div>
                <label>
                  Current location of the part
                  <input name="location" value={item.location} onChange={handleChange} placeholder="City" />
                </label>
                <label>
                  Description
                  <textarea name="description" value={item.description} onChange={handleChange} placeholder="Type..." />
                </label>
              </div>
              <div className="upload-box">
                <label className="upload-label">
                  <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                  <FiUploadCloud className="upload-icon" />
                  <div>Upload pictures & videos</div>
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  )}
                </label>
              </div>
            </div>
            <div className="create-item-actions">
              <button className="btn-draft">Save draft</button>
              <button className="btn-next" onClick={nextStep}>
                Set price & quantity
              </button>
            </div>
          </div>
        )}

        {/* --- Step 2: Price, Certificate, Docs --- */}
        {step === 2 && (
          <div className="step-content">
            <h2>Upload the certificate and set your price</h2>
            <div className="create-item-form">
              <div className="form-fields">
                <label>
                  Quantity
                  <input name="quantity" value={item.quantity} onChange={handleChange} placeholder="1,2,3,4..." />
                </label>
                
                <div className="two-cols">
                  <label>
                    Flight hours
                    <input name="flightHours" value={item.flightHours} onChange={handleChange} placeholder="New" />
                  </label>
                  <label>
                    Cycles
                    <input name="cycles" value={item.cycles} onChange={handleChange} placeholder="New" />
                  </label>
                </div>
                <div style={{ display: "flex", gap: 16, margin: "18px 0 8px 0" }}>
                  <div className="market-pill">
                    USD {item.marketPrices.highest} <br /><span>Highest price</span>
                  </div>
                  <div className="market-pill">
                    USD {item.marketPrices.lowest} <br /><span>Lowest price</span>
                  </div>
                  <div className="market-pill">
                    {item.marketPrices.trend} <br /><span>Price trend YTD</span>
                  </div>
                  <div className="market-pill">
                    {item.marketPrices.listed} <br /><span>Parts currently listed in Airzon</span>
                  </div>
                </div>
                <div className="two-cols">
                  <label>
                    Currency
                    <input name="currency" value={item.currency} onChange={handleChange} placeholder="USD" />
                  </label>
                  <label>
                    Set your price
                    <input name="price" value={item.price} onChange={handleChange} placeholder="1234..." />
                  </label>
                </div>
              </div>
              <div className="upload-box">
                <label className="upload-label">
                  <input type="file" style={{ display: "none" }} onChange={handleDocUpload} />
                  <FiUploadCloud className="upload-icon" />
                  <div>Upload Documentation</div>
                  {docName && (
                    <div className="doc-preview">{docName}</div>
                  )}
                </label>
              </div>
            </div>
            <div className="create-item-actions">
              <button className="btn-draft" onClick={prevStep}>Back</button>
              <button className="btn-next" onClick={nextStep}>
                Review and validate
              </button>
            </div>
          </div>
        )}

        {/* --- Step 3: Review, Payment, Blockchain --- */}
        {step === 3 && (
          <div className="step-content">
            <h2>Validate your inputs and upload your certificate on the blockchain</h2>
            <div className="create-item-form">
              <div className="review-panel">
                <div className="review-title">ATR Main Landing Gear</div>
                <div className="review-details">
                  <div>Part number: <span>{item.partNumber || "D231B9000-22"}</span></div>
                  <div>Serial number: <span>{item.serialNumber || "12345679"}</span></div>
                  <div className="review-price">USD {item.price || "150,000"}</div>
                  <div>
                    Sold quantity: <span>{item.quantity || 1}</span>
                  </div>
                  <div>Flight hours: <span>{item.flightHours || "new"}</span></div>
                  <div>Cycles: <span>{item.cycles || "new"}</span></div>
                  <div>Aircraft type: <span>{item.aircraftType || "ATR 72-500"}</span></div>
                </div>
              </div>
              <div className="rfp-left">
      <h2>Indicate preferred means of payment</h2>

      <Radio
        className="input-create-item"
        name="paymentType"
        value="airzon_escrow"
        checked={form.paymentType === "airzon_escrow"}
        onChange={handleChange("paymentType")}
        label="Payment via Airzon with escrow account managed by Escrow Agent Partner"
        style={{ color: "#003366" }}
      />
      <Radio
        name="paymentType"
        value="bilateral_escrow"
        checked={form.paymentType === "bilateral_escrow"}
        onChange={handleChange("paymentType")}
        label="Bilateral payment with escrow account managed by Escrow Agent Partner"
      />
      <Radio
        name="paymentType"
        value="airzon_no_escrow"
        checked={form.paymentType === "airzon_no_escrow"}
        onChange={handleChange("paymentType")}
        label="Payment via Airzon without escrow account"
      />
      <Radio
        name="paymentType"
        value="bilateral_no_escrow"
        checked={form.paymentType === "bilateral_no_escrow"}
        onChange={handleChange("paymentType")}
        label="Bilateral payment without escrow account"
      />

      <div className="rfp-row">
        <div className="rfp-col">
          <Label>Accepted currencies</Label>
          <select
            className="rfp-input"
            value={form.acceptedCurrencies}
            onChange={handleChange("acceptedCurrencies")}
          >
            <option value="ALL">All</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>

      
  <button className="main-btn" style={{ background: "#02AF4F", color: "#fff", width: "100%", border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, marginTop: "30px" }} onClick={() => alert("Request submitted. The part is listed and the documentation is uploaded on the blockchain")}>Validate</button>

    </div>
              <div className="preview-box">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="img-placeholder">No image uploaded</div>
                )}
                <div className="preview-details" style={{ marginTop: 8 }}>
                  <strong>Seller: Lion technical services</strong>
                  <div>Location: Blagnac, France</div>
                  <div>Offer until: {item.untilDate || "12.05.2027"} — {item.untilTime || "12:00 am"}</div>
                  <div style={{ margin: "8px 0" }}>
                    <strong>Description</strong>
                    <div style={{ fontWeight: 400, color: "#485870", fontSize: "0.97rem" }}>
                      {item.description || "OEM-verified complete MLG unit for ATR 72-500/600. Fully overhauled, ready-to-install, with dual-wheel configuration and excellent structural integrity. Ideal for operators seeking reliable performance and minimal downtime."}
                    </div>
                  </div>
                </div>
                <button className="btn-doc" style={{ margin: "16px 0 0 0" }}>Download documentation</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div><Footer /></>
  );
};

export default CreateItem;