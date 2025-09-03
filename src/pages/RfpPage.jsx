import React, { useMemo, useState } from "react";
import "../airzon.css";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import { FiUploadCloud, FiArrowLeft } from "react-icons/fi"; // add this import


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

const suppliersMock = [
  { id: "sup-1", name: "Anchor Partner" },
  { id: "sup-2", name: "Lion Technical Services" },
  { id: "sup-3", name: "SkyParts EU" },
  { id: "sup-4", name: "AeroTrade US" },
];

export default function RfpPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const isStep1Valid = useMemo(() => {
    return (
      form.partNumber.trim() !== "" &&
      form.name.trim() !== "" &&
      form.rfpUntilDate.trim() !== "" &&
      form.rfpUntilTime.trim() !== "" &&
      form.sellerName.trim() !== "" &&          // ⬅️ (optional)
      form.sellerLocation.trim() !== ""   
    );
  }, [form]);

  const isStep2Valid = useMemo(() => {
    return form.quantity.trim() !== "";
  }, [form]);

  const canGoNext = () =>
    (step === 1 && isStep1Valid) || (step === 2 && isStep2Valid) || step === 3;

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleNumberOnly = (field) => (e) => {
    const v = e.target.value.replace(/[^\d.,]/g, "");
    setForm((f) => ({ ...f, [field]: v }));
  };

  const handleFiles = (files) => {
    const list = Array.from(files || []);
    setForm((f) => ({ ...f, media: [...f.media, ...list] }));
  };

  const removeMedia = (idx) =>
    setForm((f) => ({
      ...f,
      media: f.media.filter((_, i) => i !== idx),
    }));

  const toggleSupplier = (id) =>
    setForm((f) => {
      const exists = f.selectedSuppliers.includes(id);
      return {
        ...f,
        selectedSuppliers: exists
          ? f.selectedSuppliers.filter((x) => x !== id)
          : [...f.selectedSuppliers, id],
      };
    });

  const saveDraft = async () => {
    setSaving(true);
    try {
      // plug into your API here
      console.log("Saving draft…", form);
    } finally {
      setSaving(false);
    }
  };

  const submitRfp = async () => {
    // minimal guard
    if (!isStep1Valid || !isStep2Valid) {
      setStep(!isStep1Valid ? 1 : 2);
      return;
    }
    console.log("Submitting RFP…", form);
    alert("RFP submitted!");
  };

  const summary = useMemo(() => {
    return {
      title: form.name || "—",
      partNumber: form.partNumber || "—",
      qty: form.quantity || "—",
      condition: `${form.flightHours}/${form.cycles}`.toLowerCase(),
      aircraft: form.aircraftType || "—",
      lastMaint: form.lastMaintenanceDate || "n.a.",
      location: form.currentLocation || "—",
      rfpUntil: form.rfpUntilDate && form.rfpUntilTime
        ? `${form.rfpUntilDate} — ${form.rfpUntilTime}`
        : "—",
      recipients:
        form.preferredRecipients === "anchor"
          ? "Anchor Partner"
          : form.preferredRecipients === "all"
          ? "All Airzon members"
          : `${form.selectedSuppliers.length} selected supplier(s)`,
      sellerName: form.sellerName || "—",
      sellerLocation: form.sellerLocation || "—",
    };
  }, [form]);

  return (
    <div className="rfp-page">
      <TopNavBar />

      <main className="rfp-container">
        <Steps step={step} setStep={setStep} />

        {step === 1 && (
          <section className="rfp-grid">
            <div className="rfp-left">
              <h2>Indicate the part that you need</h2>

              <Label>Name</Label>
              <input
                className="rfp-input"
                placeholder="Type…"
                value={form.name}
                onChange={handleChange("name")}
              />

              <Label>Part number</Label>
              <input
                className="rfp-input"
                placeholder="EE-55547"
                value={form.partNumber}
                onChange={handleChange("partNumber")}
              />

              <div className="rfp-row">
                <div className="rfp-col">
                  <Label>Maintain the RFP until (date)</Label>
                  <input
                    type="date"
                    className="rfp-input"
                    value={form.rfpUntilDate}
                    onChange={handleChange("rfpUntilDate")}
                  />
                </div>
                <div className="rfp-col">
                  <Label>Time</Label>
                  <input
                    type="time"
                    className="rfp-input"
                    value={form.rfpUntilTime}
                    onChange={handleChange("rfpUntilTime")}
                  />
                </div>
              </div>

              <div className="rfp-row">
                <div className="rfp-col">
                  <Label>Aircraft type</Label>
                  <input
                    className="rfp-input"
                    placeholder="Type…"
                    value={form.aircraftType}
                    onChange={handleChange("aircraftType")}
                  />
                </div>
                <div className="rfp-col">
                  <Label>Engine type</Label>
                  <input
                    className="rfp-input"
                    placeholder="Type…"
                    value={form.engineType}
                    onChange={handleChange("engineType")}
                  />
                </div>
              </div>

              <Label>Current location of the part</Label>
              <input
                className="rfp-input"
                placeholder="City"
                value={form.currentLocation}
                onChange={handleChange("currentLocation")}
              />

              <Label>Description</Label>
              <textarea
                className="rfp-input rfp-textarea"
                placeholder="Type…"
                rows={6}
                value={form.description}
                onChange={handleChange("description")}
              />

              <Label>Seller company</Label>
<input
  className="rfp-input"
  placeholder="e.g., Lion technical services"
  value={form.sellerName}
  onChange={handleChange("sellerName")}
/>

<Label>Seller location</Label>
<input
  className="rfp-input"
  placeholder="City, Country"
  value={form.sellerLocation}
  onChange={handleChange("sellerLocation")}
/>
            </div>

            <UploadPanel
              media={form.media}
              onFiles={handleFiles}
              onRemove={removeMedia}
              primaryBtn={{
                label: "Save draft",
                onClick: saveDraft,
                loading: saving,
              }}
              secondaryBtn={{
                label: "Set price & quantity",
                onClick: () => setStep(2),
                disabled: !isStep1Valid,
              }}
            />
          </section>
        )}

        {step === 2 && (
          <section className="rfp-grid">
            <div className="rfp-left">
              <h2>Indicate the quantity, condition & preferred suppliers</h2>

              <Label>Quantity you wish to acquire</Label>
              <input
                className="rfp-input"
                placeholder="1,2,3,4…"
                value={form.quantity}
                onChange={handleNumberOnly("quantity")}
              />

              <div className="rfp-row">
                <div className="rfp-col">
                  <Label>Flight hours</Label>
                  <select
                    className="rfp-input"
                    value={form.flightHours}
                    onChange={handleChange("flightHours")}
                  >
                    <option>New</option>
                    <option>Overhauled</option>
                    <option>Serviceable</option>
                    <option>As removed</option>
                  </select>
                </div>
                <div className="rfp-col">
                  <Label>Cycles</Label>
                  <select
                    className="rfp-input"
                    value={form.cycles}
                    onChange={handleChange("cycles")}
                  >
                    <option>New</option>
                    <option>Low cycles</option>
                    <option>High cycles</option>
                  </select>
                </div>
              </div>

              <Label>Date of last maintenance</Label>
              <input
                type="date"
                className="rfp-input"
                value={form.lastMaintenanceDate}
                onChange={handleChange("lastMaintenanceDate")}
              />

              <Label>Your preferred suppliers that will receive the RFP</Label>
              <div className="rfp-choice-row">
                <button
                  type="button"
                  className={`rfp-choice ${form.preferredRecipients === "anchor" ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, preferredRecipients: "anchor" }))}
                >
                  Anchor Partner
                </button>
                <button
                  type="button"
                  className={`rfp-choice ${form.preferredRecipients === "all" ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, preferredRecipients: "all" }))}
                >
                  All Airzon members
                </button>
                <button
                  type="button"
                  className={`rfp-choice ${form.preferredRecipients === "selected" ? "selected" : ""}`}
                  onClick={() => setForm((f) => ({ ...f, preferredRecipients: "selected" }))}
                >
                  Select Suppliers
                </button>
              </div>

              {form.preferredRecipients === "selected" && (
                <div className="rfp-suppliers">
                  {suppliersMock.map((s) => (
                    <label key={s.id} className="rfp-supplier">
                      <input
                        type="checkbox"
                        checked={form.selectedSuppliers.includes(s.id)}
                        onChange={() => toggleSupplier(s.id)}
                      />
                      <span>{s.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <UploadPanel
              media={form.media}
              onFiles={handleFiles}
              onRemove={removeMedia}
              primaryBtn={{
                label: "Save draft",
                onClick: saveDraft,
                loading: saving,
              }}
              secondaryBtn={{
                label: "Review and validate",
                onClick: () => setStep(3),
                disabled: !isStep2Valid,
              }}
            />
          </section>
        )}

      {step === 3 && (
  <section className="rfp-grid three">
    {/* LEFT BAR */}
    <aside className="rfp-leftbar">
      <div className="rfp-leftbar-header">
        <div className="rfp-pill">RFP</div>
        <div className="rfp-leftbar-title">
          {summary.title}
        </div>
        <div className="rfp-leftbar-sub">Part number: {summary.partNumber}</div>
      </div>

      <ul className="rfp-leftbar-list">
        <li><b>Sold quantity:</b> {summary.qty}</li>
        <li><b>Flight hours:</b> {form.flightHours || "—"}</li>
        <li><b>Cycles:</b> {form.cycles || "—"}</li>
        <li><b>Aircraft type:</b> {summary.aircraft}</li>
        <li><b>Last maintenance date:</b> {summary.lastMaint}</li>
        <li><b>Recipients:</b> {summary.recipients}</li>
        <li><b>RFP until:</b> {summary.rfpUntil}</li>
      </ul>
    </aside>

    {/* MIDDLE FORM */}
    <div className="rfp-left">
      <h2>Indicate preferred means of payment & send your RFP</h2>

      <Radio
        name="paymentType"
        value="airzon_escrow"
        checked={form.paymentType === "airzon_escrow"}
        onChange={handleChange("paymentType")}
        label="Payment via Airzon with escrow account managed by Escrow Agent Partner"
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

      <div className="rfp-exchange">
        <h4>Include a part exchange (optional)</h4>
        <div className="rfp-row">
          <div className="rfp-col">
            <button
              type="button"
              className="rfp-upload-btn"
              onClick={() => setForm((f) => ({ ...f, exchangePartId: "INV-1234" }))}
              title="Select from your inventory"
            >
              Select part from your inventory
            </button>
          </div>
          <div className="rfp-col">
            <Label>Currency</Label>
            <select
              className="rfp-input"
              value={form.exchangeCurrency}
              onChange={handleChange("exchangeCurrency")}
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div className="rfp-col">
            <Label>Value exchange</Label>
            <input
              className="rfp-input"
              placeholder="1234…"
              value={form.exchangeValue}
              onChange={handleNumberOnly("exchangeValue")}
            />
          </div>
        </div>
        {form.exchangePartId && (
          <p className="rfp-note">Selected part: {form.exchangePartId}</p>
        )}
      </div>

      
    </div>

    {/* RIGHT PREVIEW */}
    <aside className="rfp-summary">
      <div className="rfp-summary-media">
        {form.media[0] ? (
          <img
            alt="upload"
            src={URL.createObjectURL(form.media[0])}
            onLoad={(e) => URL.revokeObjectURL(e.target.src)}
          />
        ) : (
          <div className="rfp-summary-placeholder">No image</div>
        )}
      </div>
      <div className="rfp-summary-info">
        <h3>{summary.title}</h3>
  <ul>
  <li><b>Seller:</b> {summary.sellerName}</li>
  <li><b>Location:</b> {summary.sellerLocation}</li>
  <li><b>Description:</b> {form.description || "—"}</li>
</ul>
        <div className="rfp-actions">
        <button className="btn ghost" onClick={saveDraft} disabled={saving}>
          {saving ? "Saving…" : "Save draft"}
        </button>
        <button className="btn primary" onClick={submitRfp}>
          Validate
        </button>
      </div>
      </div>
      
    </aside>
  </section>
)}

   
      </main>
      <Footer />
    </div>
  );
}

/* ---------- Small helpers ---------- */

function Steps({ step, setStep }) {
  return (
    <div className="rfp-steps">
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          className={`rfp-step ${step === n ? "active" : ""} ${step > n ? "done" : ""}`}
          onClick={() => setStep(n)}
          type="button"
        >
          <span>Step {n}</span>
        </button>
      ))}
    </div>
  );
}

function UploadPanel({ media, onFiles, onRemove, primaryBtn, secondaryBtn }) {
  return (
    <aside className="rfp-upload">
      <div
        className="rfp-drop"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          onFiles(e.dataTransfer.files);
        }}
      >
        <FiUploadCloud className="rfp-cloud-icon" />   {/* updated icon */}
        <p>Upload pictures & videos (optional)</p>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => onFiles(e.target.files)}
        />
      </div>

      {media.length > 0 && (
        <ul className="rfp-media-list">
          {media.map((f, i) => (
            <li key={`${f.name}-${i}`}>
              <span className="rfp-file">{f.name}</span>
              <button className="link" onClick={() => onRemove(i)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <div className="rfp-upload-actions">   {/* wrapper for centered buttons */}
        <button
          className="btn"
          onClick={primaryBtn.onClick}
          disabled={primaryBtn.loading}
        >
          {primaryBtn.loading ? "Saving…" : primaryBtn.label}
        </button>
        <button
          className="btn primary"
          onClick={secondaryBtn.onClick}
          disabled={secondaryBtn.disabled}
        >
          {secondaryBtn.label}
        </button>
      </div>
    </aside>
  );
}

function Label({ children }) {
  return <label className="rfp-label">{children}</label>;
}

function Radio({ name, value, checked, onChange, label }) {
  return (
    <label className="rfp-radio">
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span />
      {label}
    </label>
  );
}