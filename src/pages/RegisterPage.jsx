import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNavBar from '../components/TopNavBar';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import '../airzon.css';

// Step 2 questions
const questions = [
  {
    label: "In which sector are you working?",
    field: "sector",
    options: [
      "Airline", "OEM", "MRO", "Aircraft parts trading", "Military", "Other"
    ]
  },
  {
    label: "What type of parts are you mostly trading?",
    field: "partType",
    options: [
      "Engine", "Airframe", "Avionics", "Hydraulics & Pneumatics",
      "Flight Control Surfaces (rudders, flaps, ailerons)", "Other"
    ]
  },
  {
    label: "What is your market segment?",
    field: "marketSegment",
    options: [
      "General aviation & ultralight", "Regional aircrafts", "Narrow-Body Aircraft",
      "Wide-Body Aircraft", "Helicopters", "Military aircrafts"
    ]
  },
  {
    label: "In which regions are you operating?",
    field: "region",
    options: [
      "Europe", "North America", "South America",
      "Africa & Middle East", "Asia", "Oceania"
    ]
  },
  {
    label: "Which stats matter most to you?",
    field: "stat",
    options: [
      "Parts available in the market", "Your main supplier new offers",
      "Delivery status of your parts acquired", "Budget spent year-to-date for parts acquisition",
      "Parts price prediction", "Other"
    ]
  }
];

export default function RegisterPage() {
  // Steps: 1 = profile, 2 = questions, 3 = summary
  const [step, setStep] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
const navigate = useNavigate();
  // Main form state
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', birthday: '',
    organization: '', position: '', password: '', repeatPassword: '', acceptedTerms: false,
    sector: '', partType: '', marketSegment: '', region: '', stat: ''
  });

  // Handlers
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSelect = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  // === Render step 1: Profile ===
  function renderProfileStep() {
    return (
      <>
        <div style={{ display: "flex", marginBottom: 24 }}>
          <button className={`register-tab active`} disabled>Step 1</button>
          <button className={`register-tab`} disabled>Step 2</button>
           <h2 style={{ color:"#003366", marginLeft: '20px',fontSize: 20 }}>Create your profile</h2>
        </div>
         <div className="login-box">
        <div className="login-form">
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleInput} className="form-input" />
          <input name="firstName" placeholder="First name" value={form.firstName} onChange={handleInput} className="form-input" />
          <input name="lastName" placeholder="Last name" value={form.lastName} onChange={handleInput} className="form-input" />
          <input name="birthday" placeholder="Birthday (DD/MM/YYYY)" value={form.birthday} onChange={handleInput} className="form-input" />
          <input name="organization" placeholder="Organization" value={form.organization} onChange={handleInput} className="form-input" />
          <input name="position" placeholder="Position" value={form.position} onChange={handleInput} className="form-input" />
          <input name="password" type="password" placeholder="Create your Password" value={form.password} onChange={handleInput} className="form-input" />
          <input name="repeatPassword" type="password" placeholder="Repeat your Password" value={form.repeatPassword} onChange={handleInput} className="form-input" />
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 10, color:"#003366" }}>
            <input type="checkbox" name="acceptedTerms" checked={form.acceptedTerms} onChange={handleInput} className="form-checkbox" />
            <span>Accept <a href="#" style={{ color: "#4A90E2", textDecoration: "underline" }}>Terms & Services</a></span>
          </div>
          <button
            className="register-form-button"
            onClick={() => setStep(2)}
            disabled={
              !form.email || !form.firstName || !form.lastName ||
              !form.password || !form.repeatPassword ||
              form.password !== form.repeatPassword ||
              !form.acceptedTerms
            }
          >Continue</button>
        </div>
        </div>
      </>
    );
  }

  // === Render step 2: Questions, one per screen ===
  function renderQuestionsStep() {
    const q = questions[questionIndex];
    return (
      <>
        <div style={{ display: "flex", marginBottom: 24 }}>
          <button className={`register-tab`} disabled>Step 1</button>
          <button className={`register-tab active`} disabled>Step 2</button>
            <h2 style={{ color:"#003366",fontSize: 20,marginLeft: '10px' }}>Questions to customize Airzon for you</h2>
        </div>
        <p style={{ fontWeight: 600, fontSize: 30, color:"#003366" }}>{q.label}</p>
        <div className="client-options" style={{ flexWrap: "wrap" }}>
          {q.options.map(opt => (
            <button
              key={opt}
              className={`option-box ${form[q.field] === opt ? 'selected' : ''}`}
              onClick={() => handleSelect(q.field, opt)}
              style={{ minWidth: 200, marginBottom: 8 }}
            >{opt}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 32,width: '100%' }}>
          {questionIndex > 0 &&
            <button
              className="register-form-button"
              style={{ background: "#e5e7eb", color: "#003366", width: "100%" }}
              onClick={() => setQuestionIndex(i => i - 1)}
            >Back</button>}
          <button
            className="register-form-button"
            style={{ width: "100%" }}
            onClick={() => {
              if (questionIndex === questions.length - 1) setStep(3);
              else setQuestionIndex(i => i + 1);
            }}
            disabled={!form[q.field]}
          >Continue ({questionIndex + 1}/5)</button>
        </div>

      </>
    );
  }
  const handleCreateProfile = () => {
    navigate('/login');
  };

  // === Render step 3: Summary ===
function renderSummaryStep() {
     
  return (
    <>

      <h2 style={{ color:"#003366"}} >Your set-up is now complete!</h2>
      <h3 style={{ color:"#003366"}} >An email has been sent to activate your account</h3>
      {/* PROFILE RECAP */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12,color:"#003366" }}>
        <div>
          <div><strong>Name:</strong> {form.firstName} {form.lastName}</div>
          <div><strong>Position:</strong> {form.position}</div>
          <div><strong>Company:</strong> {form.organization}</div>
          {/* Example: Client of Anchor Partner (if you have it in your logic) */}
        </div>
    
      </div>

      {/* TOP INTERESTS RECAP */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div>
          <div style={{ marginBottom: 8, fontWeight: 600,color:"#003366" }}>Your top interests</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 ,color:"#003366"}}>
            {[
              form.sector,
              form.partType,
              form.marketSegment,
              form.region,
              form.stat
            ].map((interest, idx) =>
              <div
                key={idx}
                style={{
                  background: "#f3f4f6",
                  color: "#003366",
                  borderRadius: 16,
                  padding: "8px 18px",
                  fontWeight: 500,
                  marginBottom: 4
                }}
              >
                {interest}
              </div>
            )}
          </div>
        </div>
        <button
          className="form-button"
          style={{
            background: "#F8C045",
            color: "white",
            fontWeight: 500,
            borderRadius: 20,
            marginLeft: 24,
            padding: "6px 18px"
          }}
          onClick={() => {
            setStep(2);
            setQuestionIndex(0); // Go to first question; enhance if you want more targeting
          }}
        >
          Modify
        </button>
      </div>
 <div style={{ fontSize: 13, color: "#999", marginTop: 10, color:"#003366" }}>
        You can change your profile and preferences at any moment!
      </div>
      <div style={{ marginTop: 36, width:'100%' }}>
      <button
  className="register-form-button wide"
  style={{ marginTop: 12,width:'100%' }}
  onClick={() => navigate('/login')}
>
  Get started
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
         
            {step === 1 && renderProfileStep()}
            {step === 2 && renderQuestionsStep()}
            {step === 3 && renderSummaryStep()}

        </div>
        <div className="carousel-section"><Carousel /></div>
      </div>
      <Footer />
    </div>
  );
}