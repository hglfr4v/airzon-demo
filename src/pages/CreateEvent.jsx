import React, { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const defaultEvent = {
  name: "",
  date: "",
  time: "",
  untilDate: "",
  untilTime: "",
  location: "",
  engine: "",
  description: "",
  images: [],
  spots: "",
  currency: "USD",
  price: "",
  eventWall: false,
  iban: "",
  bic: "",
  useProfile: false,
  payInAirzon: false,
};

const CreateEvent = () => {
  const [step, setStep] = useState(1);
  const [event, setEvent] = useState(defaultEvent);
  const [imagePreview, setImagePreview] = useState(null);
const [confirmed, setConfirmed] = useState(false);
  // Handle field change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEvent((prev) => ({ ...prev, images: [file] }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleValidate = (e) => {
  e.preventDefault();
  setConfirmed(true);
  // Optionally reset form or perform other actions
};
const handleDownloadICS = () => {
  const dtStart = event.date ? `${event.date.replace(/-/g, '')}T${(event.time || '00:00').replace(':', '')}00Z` : '';
  const dtEnd = event.untilDate ? `${event.untilDate.replace(/-/g, '')}T${(event.untilTime || '00:00').replace(':', '')}00Z` : '';
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.name}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${dtStart}
${event.untilDate ? `DTEND:${dtEnd}` : ''}
END:VEVENT
END:VCALENDAR`.replace(/^\s+/gm, "");

  const blob = new Blob([icsContent], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.name || "event"}.ics`;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 0);
};

  // Stepper navigation
  const nextStep = () => setStep((s) => Math.min(2, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="create-event-root">
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
 {confirmed && (
  <div className="confirm-overlay">
    <div className="confirm-modal">
      <div className="confirm-message">
        <span role="img" aria-label="success" className="confirm-icon">✅</span>
        Event successfully created!
      </div>
      <button className="btn-download-ics" onClick={handleDownloadICS}>
        Download calendar (.ics)
      </button>
    </div>
  </div>
)}
      <div className="create-event-card">
        <div className="stepper">
          <div className={step === 1 ? "step active" : "step"}>
            Step 1
          </div>
          <div className={step === 2 ? "step active" : "step"}>
            Step 2
          </div>
        </div>
        {step === 1 && (
          <div className="step-content">
            <h2>Fill the main information about your event</h2>
            <div className="create-event-form">
              <div className="form-fields">
                <label>
                  Name
                  <input
                    name="name"
                    value={event.name}
                    onChange={handleChange}
                    placeholder="Type..."
                  />
                </label>
                <div className="two-cols">
                  <label>
                    Date
                    <input
                      type="date"
                      name="date"
                      value={event.date}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Time
                    <input
                      type="time"
                      name="time"
                      value={event.time}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="two-cols">
                  <label>
                    Maintain event on Airzon until
                    <input
                      type="date"
                      name="untilDate"
                      value={event.untilDate}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    <span style={{ opacity: 0 }}>.</span>
                    <input
                      type="time"
                      name="untilTime"
                      value={event.untilTime}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="two-cols">
                  <label>
                    Current location of the part
                    <input
                      name="location"
                      value={event.location}
                      onChange={handleChange}
                      placeholder="City"
                    />
                  </label>
                  <label>
                    Engine type
                    <input
                      name="engine"
                      value={event.engine}
                      onChange={handleChange}
                      placeholder="Type..."
                    />
                  </label>
                </div>
                <label>
                  Description
                  <textarea
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                    placeholder="Type..."
                  />
                </label>
              </div>
              <div className="upload-box">
                <label className="upload-label">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />
                  <FiUploadCloud className="upload-icon" />
                  <div>Upload pictures & videos</div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="image-preview"
                    />
                  )}
                </label>
              </div>
            </div>
            <div className="create-event-actions">
              <button className="btn-draft">Save draft</button>
              <button className="btn-next" onClick={nextStep}>
                Set price & quantity
              </button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="step-content">
            <h2>Set number of available spots and validate</h2>
            <div className="create-event-form">
              <div className="form-fields">
                <label>
                  Number of spots available
                  <input
                    name="spots"
                    value={event.spots}
                    onChange={handleChange}
                    placeholder="Type..."
                  />
                </label>
                <div className="two-cols">
                  <label>
                    Currency
                    <input
                      name="currency"
                      value={event.currency}
                      onChange={handleChange}
                      placeholder="USD"
                    />
                  </label>
                  <label>
                    Price
                    <input
                      name="price"
                      value={event.price}
                      onChange={handleChange}
                      placeholder="Free"
                    />
                  </label>
                </div>
                <div className="switch-row">
                  <label>
                    <input
                      type="checkbox"
                      name="eventWall"
                      checked={event.eventWall}
                      onChange={handleChange}
                    />{" "}
                    Activate Event Wall
                  </label>
                </div>
                <label>
                  Select type of payment
                  <input
                    name="iban"
                    value={event.iban}
                    onChange={handleChange}
                    placeholder="IBAN"
                  />
                  <input
                    name="bic"
                    value={event.bic}
                    onChange={handleChange}
                    placeholder="BIC"
                  />
                </label>
                <div className="switch-row">
                  <label>
                    <input
                      type="checkbox"
                      name="useProfile"
                      checked={event.useProfile}
                      onChange={handleChange}
                    />{" "}
                    Use my profile details
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name="payInAirzon"
                      checked={event.payInAirzon}
                      onChange={handleChange}
                    />{" "}
                    Payment in Airzon
                  </label>
                </div>
              </div>
              <div className="preview-box">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                  />
                ) : (
                  <div className="img-placeholder">No image uploaded</div>
                )}
                <div className="preview-details">
                  <strong>{event.name || "Event name"}</strong>
                  <div>
                    {event.date
                      ? `${new Date(event.date).toLocaleDateString()} ${
                          event.time || ""
                        }`
                      : ""}
                  </div>
                  <div>
                    {event.location && `Location: ${event.location}`}
                  </div>
                  <div>{event.description}</div>
                </div>
              </div>
            </div>
            <div className="create-event-actions">
              <button className="btn-draft" onClick={prevStep}>
                Back
              </button>
            <button className="btn-validate" onClick={handleValidate}>
  <FaCheckCircle style={{ marginRight: 6 }} /> Validate
</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;