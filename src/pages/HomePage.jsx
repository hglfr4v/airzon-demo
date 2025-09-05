import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../airzon.css';
import TopNavBar from '../components/TopNavBar';
import container from '../assets/figures/container.png'; // Make sure this path is correct
import airplane from '../assets/figures/airplane.png'; // Make sure this path is correct
import analysis from '../assets/figures/analysis.jpg'; // Make sure this path is correct
import newss from '../assets/figures/new.jpeg'; // Make sure this path is correct
import events from '../assets/figures/event.jpg'; // Make sure this path is correct
import handshake from '../assets/figures/handshake.jpg'; // Make sure this path is correct
import erp from '../assets/figures/erp.jpg'; // Make sure this path is correct
import dubaiairshow from '../assets/figures/dubaiairshow.jpeg';
import lebourget from '../assets/figures/lebourget.jpeg';
import farnboroughairshow from '../assets/figures/farnboroughairshow.jpeg'
import Footer from '../components/Footer';
import { FaSearch } from 'react-icons/fa';
import heroImage from '../assets/figures/Home1.jpg';
import AlertsSidebar from '../components/Alerts'; // <- import your sidebar


const HomePage = () => {
const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);

const scrollToSlide = (index) => {
  const container = document.getElementById('eventSlides');
  const slideWidth = container.firstChild.offsetWidth;
  container.scrollTo({ left: slideWidth * index, behavior: 'smooth' });
  setCurrentSlide(index);
};
const news = [
  { title: "Easyjet signs SAF deal with Enilive in Italy" },
  { title: "Aerlytix & Airfinance Global become partners" },
  { title: "HTF sees aviation market to $85bn in 2032" },
  { title: "ITA to be acquired by Lufthansa" },
  { title: "Aerlytix & Airfinance Global become partners" },
  { title: "HTF sees aviation market to $85bn in 2032" },
  { title: "ITA to be acquired by Lufthansa" }
];
const [searchTerm, setSearchTerm] = useState("");

  function handleDummySearch(e) {
    e.preventDefault();
    // Dummy: do nothing or console.log('search');
  }

 const [showAlerts, setShowAlerts] = useState(false);

  const handleAlertsClick = () => {
    setShowAlerts(true);
  };

  const handleCloseAlerts = () => {
    setShowAlerts(false);
  };

  const alertsData = {
      market: [
    `A new <a href="#">Part D23189000-22</a> listed below <b>USD 150,000</b> is available <br/>(condition: <b>1,000 Flight Hours</b>)`,
    `A new <a href="#">Part D23189000-22</a> listed below <b>USD 150,000</b> is available <br/>(condition: <b>3,000 Flight Hours</b>)`,
    `A new <a href="#">Part 555</a> listed below <b>USD 500</b> is available <br/>(condition: <b>New</b>)`
  ],
    inventory: [
      'Your Part <a href="#">D23189000-22</a> has <b>reached 3,000 flight hours</b>',
      'You have a new bid for <a href="#">Part D23189000-22</a> from <span style="color:#71b0ff;font-weight:600">Lion Technic</span>',
      'You have a new counteroffer for <a href="#">Part D23189000-22</a> from <span style="color:#71b0ff;font-weight:600">Lion Technic</span> (<span style="color:#71b0ff">USD 150,000 vs. USD 6,200</span>)'
    ],
    news: [
      'Easyjet signs SAF deal with Enilive in Italy',
      'Aerlytix & Airfinance Global become partners',
      'HTF sees aviation market to $85bn in 2032'
    ]
  };

  return (
    <div className="home-wrapper">
      <TopNavBar />

      {/* HERO */}
 <section className="hero" style={{ backgroundImage: `url(${heroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="hero-overlay">
    <h1>
      <strong>
        Discover parts, connect with partners, stay ahead of the market
      </strong>
    </h1>
  </div>
 <div className="search-bar-wrapper">
      <form className="search-box" onSubmit={handleDummySearch}>
        <input
          type="text"
          placeholder="Write here parts number, keywords, description..."
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
    <path 
      fill="#08213D" 
      d="M0,0 Q720,100 1440,0 V100 H0 Z"
    />
  </svg>
</section>

      {/* DASHBOARD */}
      <section className="dashboard">
        <div className="welcome">
          <h2>Welcome back <span className="highlight">Martin !</span></h2>
          <p>Let’s see what happened in the market since your last connection</p>
        </div>

        <div className="cards">
          <div className="card">
            <h3>My market insights</h3>
            <div className="dashboard-card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate('/market', { state: { mode: 'seller', sellerView: 'counteroffer' } })}
            >
              {/* Example KPI Stat */}
              <div className="label-home">Buyers waiting for your feedback</div>
              <div className="stat-value-home">10</div>
            </div>
            <div className="dashboard-card"
            style={{ cursor: "pointer" }}
             onClick={() => navigate('/market', { state: { mode: 'buyer', buyerView: 'part' } })}>
              {/* Example KPI Stat */}
              <div className="label-home">New offers from your suppliers</div>
              <div className="stat-value-home">15</div>
            </div>
            <button onClick={handleAlertsClick}>My market alerts <span className="badge">4</span></button>
          <AlertsSidebar open={showAlerts} onClose={() => setShowAlerts(false)} alerts={alertsData} />
          </div>

         <div className="card">
  <h3>My network</h3>
  
  <div className="event-carousel">
   <div className="event-slides" id="eventSlides">
  <div className="event-slide">
  <img src={lebourget} alt="Le Bourget" className="event-image-home" />

  <div className="event-info-home">
    <strong>Le Bourget</strong><br />
    Paris<br />
    26 June, 2026
   
  </div>
<div className="carousel-dot-controls">
  {[0, 1, 2].map((index) => (
    <button
      key={index}
      className={`dot-button ${currentSlide === index ? 'active' : ''}`}
      onClick={() => scrollToSlide(index)}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
</div>

  <div className="event-slide">
    <img src={farnboroughairshow} alt="Farnborough" className="event-image-home" />
    <div className="event-info-home">
      <strong>Farnborough</strong><br />
      UK<br />
      22 July, 2027
          
    </div>
<div className="carousel-dot-controls">
  {[0, 1, 2].map((index) => (
    <button
      key={index}
      className={`dot-button ${currentSlide === index ? 'active' : ''}`}
      onClick={() => scrollToSlide(index)}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>
  </div>

  <div className="event-slide">
    <img src={dubaiairshow} alt="Dubai Airshow" className="event-image-home" />
    <div className="event-info-home">
      <strong>Dubai Airshow</strong><br />
      UAE<br />
      12 Nov, 2025
       
    </div>
    <div className="carousel-dot-controls">
  {[0, 1, 2].map((index) => (
    <button
      key={index}
      className={`dot-button ${currentSlide === index ? 'active' : ''}`}
      onClick={() => scrollToSlide(index)}
      aria-label={`Go to slide ${index + 1}`}
    />
  ))}
</div>

  </div>
  
</div>

  </div>
  
 
  <button onClick={() => navigate('/messages')}>Messages to read <span className="badge">4</span></button>
</div>

          <div className="card">
             
             <div className="news-panel">
    <h3>Exclusive news by Provider</h3>
    <div className="news-panel-list">
      {news.map((item, idx) => (
        <div className="news-panel-item" key={idx}>
          {item.title}
        </div>
      ))}
    </div>
  </div>

          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="tiles">
        <div className="tile" ><img src={airplane} alt="List a new part" /><button style={{ background: "transparent" }} onClick={() => navigate('/create-item')}>List a new part</button></div>
        <div className="tile"><img src={handshake} alt="Offers Received" /><button style={{ background: "transparent" }} onClick={() => navigate('/market', { state: { mode: 'seller', sellerView: 'counteroffer' } })}>Offers Received</button></div>
        <div className="tile"><img src={container} alt="Follow Deliveries" /><button style={{ background: "transparent" }}>Follow Deliveries</button></div>
        <div className="info">
          <h3>Explore the marketplace</h3>
          <p>Explore Airzon’s marketplace with more than 10,000 listed items and 2,000 members</p>
          <a href="/airzon-demo/market">→ Visit the marketplace</a>
        </div>
      </section>

      {/* INFO SECTIONS */}
      <section className="info-panels">
        <div className="info">
          <h3>Connect with your network and stay informed</h3>
          <p>Because the aviation industry is a people business above all, Airzon enables you to meet and connect with your network around the world as well as stay informed about the latest trends</p>
          <a href="#">→ Check new events</a>
        </div>
        <div className="tile"><img src={events} alt="Join an event" /><span>Join an event</span></div>
        <div className="tile"><img src={newss} alt="Check the news" /><span>Check the news</span></div>
      </section>

      <section className="info-panels">
        <div className="tile"><img src={analysis} alt="Portfolio" /><span>Check my portfolio insights</span></div>
        <div className="tile"><img src={erp} alt="ERP" /><span>Refresh links to my ERPs</span></div>
        <div className="info">
          <h3>Get insights to improve your business</h3>
          <p>Airzon philosophy is to promote a safe and transparent market, this is why we provide you with market Insights tailored-made for you linked to your own ERPs</p>
          <a href="#">→ Go to my Insights </a>
        </div>
      </section>

     <Footer/>
    </div>
  );
};

export default HomePage;