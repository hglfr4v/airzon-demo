import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import '../airzon.css';

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
  uom: "",
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


const CreateItem = () => {
  const [step, setStep] = useState(1);
  const [item, setItem] = useState(defaultItem);
  const [imagePreview, setImagePreview] = useState(null);
  const [docName, setDocName] = useState(null);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setItem((prev) => ({ ...prev, docs: [file] }));
      setDocName(file.name);
    }
  };

  const nextStep = () => setStep((s) => Math.min(3, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
const [showBanner, setShowBanner] = useState(false);
  return (
    <div className="create-item-root">
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
        <div className="stepper">
          <div className={step === 1 ? "step active" : "step"}>Step 1</div>
          <div className={step === 2 ? "step active" : "step"}>Step 2</div>
          <div className={step === 3 ? "step active" : "step"}>Step 3</div>
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
                  Quantity sold
                  <input name="quantity" value={item.quantity} onChange={handleChange} placeholder="1,2,3,4..." />
                </label>
                <label>
                  Unit of measure
                  <input name="uom" value={item.uom} onChange={handleChange} placeholder="Item" />
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
              <div className="form-fields" style={{ maxWidth: 440 }}>
                <div className="review-title">Select type of payment</div>
                <div className="pay-radio-group">
                  {paymentOptions.map((opt, idx) => (
                    <label key={idx} className="pay-radio">
                      <input
                        type="radio"
                        name="paymentType"
                        checked={item.paymentType === opt}
                        value={opt}
                        onChange={handleChange}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
                <label>
                  IBAN
                  <input name="iban" value={item.iban} onChange={handleChange} placeholder="IBAN" />
                </label>
                <label>
                  BIC
                  <input name="bic" value={item.bic} onChange={handleChange} placeholder="BIC" />
                </label>
                <div className="switch-row">
                  <label>
                    <input
                      type="checkbox"
                      name="useProfile"
                      checked={item.useProfile}
                      onChange={handleChange}
                    />{" "}
                    Use my profile details
                  </label>
                </div>
                <div className="create-item-actions">
                  <button className="btn-draft" onClick={prevStep}>Back</button>
                <button className="btn-next btn-validate" type="button" onClick={() => setShowBanner(true)}>
                Validate
              </button>
                </div>
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
    </div>
  );
};

export default CreateItem;