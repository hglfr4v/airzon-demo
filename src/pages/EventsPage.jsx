import React, { useState } from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer.jsx';
import events from '../assets/data/eventsData.js';
import { useNavigate } from "react-router-dom";
import '../airzon.css';
import heroImage from '../assets/figures/Events.jpg';

import { FaSearch, FaHeart, FaRegCommentDots, FaPaperPlane, FaHandshake } from 'react-icons/fa';
import { FiGrid, FiDollarSign, FiGlobe, FiUploadCloud,FiMapPin } from 'react-icons/fi';

const EventsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  function handleDummySearch(e) {
    e.preventDefault();
  }

  return (
    <>
      <div className='event-wrapper'>
        <TopNavBar />
        {/* HERO */}
        <section className="hero-events" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="hero-overlay">
            <h1>
              <strong>
                Explore new events to connect with your customers and suppliers
              </strong>
            </h1>
          </div>
          <div className="search-bar-wrapper">
            <form className="search-box" onSubmit={handleDummySearch}>
              <input
                type="text"
                placeholder="Write here keywords, description, cities..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                aria-label="Search"
              />
              <button type="submit" className="search-btn" aria-label="Search">
                <FaSearch size={18} />
              </button>
            </form>
          </div>
          <svg className="hero-wave" viewBox="0 0 1440 100" preserveAspectRatio="none">
            {/* Filled shape */}
            <path
              d="M0,0 Q720,100 1440,0 V100 H0 Z"
              fill="#F9F9F9"
              stroke="none"
            />
            {/* Stroke only along the wave curve (top) */}
            <path
              d="M0,0 Q720,100 1440,0"
              fill="none"
              stroke="#003366"
              strokeWidth="3"
            />
          </svg>
        </section>


          <div className="events-2col">
            {/* LEFT SIDEBAR */}
            <div className="events-sidebar">
              <div className="events-card-title">Filters &amp; categories</div>
              <div className="filter-btns-row">
                <button className="filter-btn"><FiGrid style={{marginRight:6}} /> Categories</button>
                <button className="filter-btn"><FiDollarSign style={{marginRight:6}} /> Price</button>
                <button className="filter-btn"><FiGlobe style={{marginRight:6}} /> Countries</button>
              </div>
              <div className="events-card-title" style={{marginTop:38}}>Actions</div>
              <div className="sidebar-action-row">
                <button className="sidebar-action-btn upload"  onClick={() => navigate("/create-event")}><FiUploadCloud style={{marginRight:20, fontSize:25}} /><br/>Upload a new event</button>
                <button className="sidebar-action-btn past"><FaHandshake style={{marginRight:7, fontSize:25}} /><br/> Past events</button>
                <button className="sidebar-action-btn upcoming"><FaHandshake style={{marginRight:7, fontSize:25}} /><br/> Upcoming events</button>
              </div>
            </div>

            {/* RIGHT: Events List */}
            <div className="events-main-list">
              <div className="events-card-title">Latest events</div>
              <div className="event-list">
                {events.map((event, idx) => (
                  <div className="event-card" key={event.id || idx}>
                    <img src={event.image} alt={event.title} className="event-image" />
                    <div className="event-info">
                      <div className="event-icons">
                        <span title="Organizer" className="event-org">{event.organization}</span>
                        <span title="Location" className="event-location">
                          <FiMapPin style={{marginRight: 4, fontSize: '1em', color:'#4682e9', verticalAlign:'-2px'}} />
                          {event.location}
                        </span>
                      </div>
                      <div className="event-title">{event.title}</div>
                      <div className="event-date">{event.date}</div>
                      <div className="event-desc">{event.description}</div>
                      <div className="event-desc-icons">
                        <span><FaHeart style={{color:"#d45072", verticalAlign:"-3px"}} /> {event.likes || 30}</span>
                        <span><FaRegCommentDots style={{color:"#36518a", verticalAlign:"-3px", marginLeft:18}} /> {event.comments || 12}</span>
                        <span><FaPaperPlane style={{color:"#8ca7cd", verticalAlign:"-3px", marginLeft:18}} /> {event.shares || 6}</span>
                      </div>
                     <button
  className="join-button"
  onClick={() => navigate(`/join-event/${event.id}`)}
>
  Join
</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        <Footer />
      </div>
      <style>
        {`
        .sidebar-action-row {
          display: flex;
          gap: 12px;
          margin: 24px 0 36px 0;
        }
        .sidebar-action-btn {
          flex: 1;
          border-radius: 13px;
          font-size: 1rem;
          padding: 19px 0;
          border: none;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 2px;
          transition: background 0.17s, color 0.17s;
          align-items: center;
          justify-content: center;
        }
        .sidebar-action-btn.upload {
          background: #e3ecff;
          color: #234f9d;
        }
        .sidebar-action-btn.upload:hover {
          background: #b6d1fa;
        }
        .sidebar-action-btn.past {
          background: #131d32;
          color: #fff;
        }
        .sidebar-action-btn.past:hover {
          background: #253060;
        }
        .sidebar-action-btn.upcoming {
          background: #ffe488;
          color: #927100;
        }
        .sidebar-action-btn.upcoming:hover {
          background: #ffdc56;
        }
        .event-desc-icons {
          display: flex;
          gap: 18px;
          font-size: 1.14rem;
          margin: 8px 0 10px 0;
          color: #888;
        }
        `}
      </style>
    </>
  );
};

export default EventsPage;