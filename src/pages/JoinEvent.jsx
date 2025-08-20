import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import events from "../assets/data/eventsData.js";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer.jsx";
import { FaHeart, FaRegCommentDots, FaPaperPlane } from "react-icons/fa";
import "../airzon.css";

const JoinEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = events.find(ev => ev.id === eventId);

  // For demonstration, fake a related event (replace with real data if available)
  const relatedEvents = events.filter(ev => ev.id !== eventId).slice(0, 1);

  // Join flow state
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [iban, setIban] = useState("");
  const [bic, setBic] = useState("");
  const [useProfile, setUseProfile] = useState(false);

  // Handle booking confirm
  const [confirmed, setConfirmed] = useState(false);

  // Download ICS example
  const handleCalendarDownload = () => {
    const dtStart = event?.date
      ? `${event.date
          .replace(/(\w+ \d+\w*, )?/, "") // Remove day of week if present
          .replace(/[^\d]/g, "")
        }T110000Z`
      : "";
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event?.title || "Event"}
DESCRIPTION:${event?.description || ""}
LOCATION:${event?.location || ""}
DTSTART:${dtStart}
END:VEVENT
END:VCALENDAR`.replace(/^\s+/gm, "");
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${event?.title || "event"}.ics`;
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 0);
  };

  if (!event) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2>Event not found.</h2>
        <button className="btn-join" onClick={() => navigate(-1)}>Back</button>
      </div>
    );
  }

  return (
    <>

      <div className="join-event-root">
        <div className="join-event-card">
          {/* Stepper */}
          <div className="stepper">
            <div className={step === 1 ? "step active" : "step"}>Step 1</div>
            <div className={step === 2 ? "step active" : "step"}>Step 2</div>
            <div className={step === 3 ? "step active" : "step"}>Step 3</div>
          </div>

          {/* Step 1: Select quantity */}
          {step === 1 && (
            <div className="step-content">
              <h2>Select your quantity</h2>
              <div className="join-event-body">
                <div className="join-event-side">
                  <div className="event-free">Free</div>
                  <div className="event-spots">
                    {event.spots || "15"} spots available
                  </div>
                  <div className="event-img-wrap">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="event-image"
                    />
                  </div>
                  <div className="event-actions">
                    <button className="btn-alerts">Create Alerts</button>
                    <button className="btn-cart">Save in cart</button>
                    <button
                      className="btn-join"
                      onClick={() => setStep(2)}
                    >
                      Join the event
                    </button>
                  </div>
                </div>
                <div className="join-event-main">
                  <div className="event-details">
                    <strong>{event.title}</strong>
                    <div>{event.organization}</div>
                    <div>{event.date}</div>
                    <div>
                      <strong>Location:</strong> {event.location}
                    </div>
                    <div>
                      <strong>Description</strong> <br />
                      {event.description}
                    </div>
                    <div className="event-desc-icons">
                      <span>
                        <FaHeart style={{ color: "#d45072" }} /> {event.likes}
                      </span>
                      <span>
                        <FaRegCommentDots style={{ color: "#36518a", marginLeft: 18 }} />{" "}
                        {event.comments || 0}
                      </span>
                      <span>
                        <FaPaperPlane style={{ color: "#8ca7cd", marginLeft: 18 }} />{" "}
                        {event.shares}
                      </span>
                    </div>
                  </div>
                  <button className="btn-message-org">Message the organizer</button>
                       
                </div>
                
              </div>
         <div className="related-events">
                <div className="related-title">Related events</div>
                {relatedEvents.map((e, i) => (
                  <div className="related-event" key={e.id}>
                    <img src={e.image} alt={e.title} className="related-image" />
                    <div>
                      <strong>{e.title}</strong>
                      <div>{e.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Confirm and book */}
          {step === 2 && (
            <div className="step-content">
              <h2>Confirm pricing and book</h2>
              <div className="join-event-body">
                <div className="join-event-side">
                  <div className="event-free">Free</div>
                  <div className="event-spots">Selected quantity: {quantity}</div>
                  <form
                    className="event-payment-form"
                    onSubmit={e => {
                      e.preventDefault();
                      setStep(3);
                      setConfirmed(true);
                    }}
                    autoComplete="off"
                  >
                    <label>
                      IBAN
                      <input
                        type="text"
                        value={iban}
                        onChange={e => setIban(e.target.value)}
                        placeholder="IBAN"
                      />
                    </label>
                    <label>
                      BIC
                      <input
                        type="text"
                        value={bic}
                        onChange={e => setBic(e.target.value)}
                        placeholder="BIC"
                      />
                    </label>
                    <div className="switch-row">
                      <label>
                        <input
                          type="checkbox"
                          checked={useProfile}
                          onChange={() => setUseProfile(v => !v)}
                        />{" "}
                        Use profile details
                      </label>
                    </div>
                    <div className="event-actions">
                      <button
                        className="btn-cart"
                        type="button"
                        onClick={() => setStep(1)}
                      >
                        Save in cart
                      </button>
                      <button className="btn-join" type="submit">
                        Book now
                      </button>
                    </div>
                  </form>
                </div>
                <div className="join-event-main">
                  <div className="event-details">
                    <strong>{event.title}</strong>
                    <div>{event.organization}</div>
                    <div>{event.date}</div>
                    <div>
                      <strong>Location:</strong> {event.location}
                    </div>
                    <div>
                      <strong>Description</strong> <br />
                      {event.description}
                    </div>
                    <div className="event-desc-icons">
                      <span>
                        <FaHeart style={{ color: "#d45072" }} /> {event.likes}
                      </span>
                      <span>
                        <FaRegCommentDots style={{ color: "#36518a", marginLeft: 18 }} />{" "}
                        {event.comments || 0}
                      </span>
                      <span>
                        <FaPaperPlane style={{ color: "#8ca7cd", marginLeft: 18 }} />{" "}
                        {event.shares}
                      </span>
                    </div>
                  </div>
                  <button className="btn-message-org">Message the organizer</button>
                </div>
              </div>
              <div className="related-events">
                <div className="related-title">Related events</div>
                {relatedEvents.map((e, i) => (
                  <div className="related-event" key={e.id}>
                    <img src={e.image} alt={e.title} className="related-image" />
                    <div>
                      <strong>{e.title}</strong>
                      <div>{e.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Booking confirmation */}
          {step === 3 && (
            <div className="step-content">
              <h2 style={{ color: "#21b841", marginBottom: "1rem" }}>
                Your place is now booked!
              </h2>
              <div className="join-event-body">
                <div className="join-event-side">
                  <div className="event-free">Free</div>
                  <div className="event-spots">Selected quantity: {quantity}</div>
                  <div className="event-progress">
                    <div className="progress-step progress-complete">Event booked</div>
                    <div className="progress-line"></div>
                    <div className="progress-step progress-complete">Event in calendar</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">Join event wall</div>
                    <div className="progress-line"></div>
                    <div className="progress-step">Event day</div>
                  </div>
                  <div className="event-actions">
                    <button className="btn-alerts">Join event wall</button>
                    <button className="btn-cart" onClick={handleCalendarDownload}>
                      Add to your calendar
                    </button>
                    <button className="btn-join">Download invoice</button>
                  </div>
                </div>
                <div className="join-event-main">
                  <div className="event-details">
                    <strong>{event.title}</strong>
                    <div>{event.organization}</div>
                    <div>{event.date}</div>
                    <div>
                      <strong>Location:</strong> {event.location}
                    </div>
                    <div>
                      <strong>Description</strong> <br />
                      {event.description}
                    </div>
                    <div className="event-desc-icons">
                      <span>
                        <FaHeart style={{ color: "#d45072" }} /> {event.likes}
                      </span>
                      <span>
                        <FaRegCommentDots style={{ color: "#36518a", marginLeft: 18 }} />{" "}
                        {event.comments || 0}
                      </span>
                      <span>
                        <FaPaperPlane style={{ color: "#8ca7cd", marginLeft: 18 }} />{" "}
                        {event.shares}
                      </span>
                    </div>
                  </div>
                  <button className="btn-message-org">Message the organizer</button>
                </div>
              </div>
              <div className="related-events">
                <div className="related-title">Related events</div>
                {relatedEvents.map((e, i) => (
                  <div className="related-event" key={e.id}>
                    <img src={e.image} alt={e.title} className="related-image" />
                    <div>
                      <strong>{e.title}</strong>
                      <div>{e.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JoinEvent;