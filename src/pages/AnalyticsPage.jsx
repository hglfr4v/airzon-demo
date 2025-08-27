import React, {useState} from 'react';
import TopNavBar from '../components/TopNavBar';
import Footer from '../components/Footer';
//import SalesChart from '../components/SalesChart';
//import StackedBarChart from '../components/StackedBarChart';
//import NewsCards from '../components/NewsCards';
//import KPIGrid from '../components/KPIGrid';
//import AnalyticsChart from '../components/AnalyticsChart';
import '../airzon.css';
import {
  FaChartBar,
  FaBoxes,
  FaSearch,
  FaNewspaper,
  FaStore,
  FaSlidersH,
  FaSyncAlt,
  FaTachometerAlt,
  FaDownload,
  FaMoneyBillWave, 
  FaFileAlt, 
  FaCogs, 
  FaClock, 
  FaInbox, 
  FaBoxOpen
} from 'react-icons/fa';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart
} from 'recharts';


const AnalyticsPage = () => {

  // At top of component
const [searchTerm, setSearchTerm] = useState("");

function handleSidebarSearch(e) {
  e.preventDefault();
  // Handle your search here
}
    const kpis = [
  { label: 'Total Sales', value: 'USD 2.4M', icon: <FaMoneyBillWave /> },
  { label: 'Quotes Issued', value: '1,325', icon: <FaFileAlt /> },
  { label: 'Parts Sold', value: '880', icon: <FaCogs /> },
  { label: 'Avg. Response Time', value: '2.1h', icon: <FaClock /> },
  { label: 'Open Inquiries', value: '46', icon: <FaInbox /> },
  { label: 'Orders Pending', value: '19', icon: <FaBoxOpen /> }
];
const data2 = [
  { month: 'Jan', expected: 5.0, market: 5.2 },
  { month: 'Feb', expected: 5.2, market: 5.4 },
  { month: 'Mar', expected: 5.4, market: 5.6 },
  { month: 'Apr', expected: 5.6, market: 5.5 },
  { month: 'May', expected: 5.5, market: 5.4 },
  { month: 'Jun', expected: 5.4, market: 5.3 },
  { month: 'Jul', expected: 5.3, market: 5.35 },
  { month: 'Aug', expected: 5.35, market: 5.4 },
  { month: 'Sep', expected: 5.45, market: 5.5 },
  { month: 'Oct', expected: 5.5, market: 5.45 },
  { month: 'Nov', expected: 5.5, market: 5.5 },
  { month: 'Dec', expected: 5.55, market: 5.2 },
];
const data = [
  { category: 'Engines', Europe: 400, Asia: 300, USA: 300 },
  { category: 'Landing Gear', Europe: 300, Asia: 200, USA: 250 },
  { category: 'Avionics', Europe: 200, Asia: 180, USA: 240 },
  { category: 'Cabin', Europe: 278, Asia: 250, USA: 210 },
];

const news = [
  { title: "Easyjet signs SAF deal with Enilive in Italy" },
  { title: "Aerlytix & Airfinance Global become partners" },
  { title: "HTF sees aviation market to $85bn in 2032" },
  { title: "ITA to be acquired by Lufthansa" },
  { title: "Aerlytix & Airfinance Global become partners" },
  { title: "HTF sees aviation market to $85bn in 2032" },
  { title: "ITA to be acquired by Lufthansa" }
];

const data3 = [
  { month: 'Jan', giraffe: 1, market: 3 },
  { month: 'Feb', giraffe: 3, market: 4 },
  { month: 'Mar', giraffe: 4, market: 6 },
  { month: 'Apr', giraffe: 5, market: 6 },
  { month: 'May', giraffe: 6, market: 7 },
  { month: 'Jun', giraffe: 6, market: 8 },
  { month: 'Jul', giraffe: 5, market: 8 },
  { month: 'Aug', giraffe: 5, market: 7 },
  { month: 'Sep', giraffe: 4, market: 6 },
  { month: 'Oct', giraffe: 4, market: 5 },
  { month: 'Nov', giraffe: 4, market: 5 },
  { month: 'Dec', giraffe: 5, market: 6 },
];
  return (
    <div className="analytics-wrapper">
      <TopNavBar />
      <div className="dashboard-main">
        {/* SIDEBAR GOES HERE */}
        <aside className="sidebar">
           
   <div className="sidebar-search-bar-wrapper">
  <form className="search-box" onSubmit={handleSidebarSearch}>
    <input
      type="text"
      placeholder="Write here parts number, keywords, description..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      aria-label="Sidebar search"
    />
    <button type="submit" className="search-btn" aria-label="Search">
      <FaSearch size={18} />
    </button>
  </form>
</div>
  
          <nav className="sidebar-section">
  <div className="sidebar-title"><FaChartBar /> My insights</div>
  <div className="sidebar-link active"> My dashboard</div>
  <div className="sidebar-link"> Sales insights</div>
  <div className="sidebar-link"> Inventory insights</div>
</nav>

<nav className="sidebar-section">
  <div className="sidebar-title"><FaNewspaper /> My market</div>
  <div className="sidebar-link"> News</div>
  <div className="sidebar-link"> Airzon market insights</div>
</nav>

<nav className="sidebar-section">
  <div className="sidebar-title"><FaSlidersH /> Customization</div>
  <div className="sidebar-link">Personalize dashboard</div>
  <div className="sidebar-link"> Refresh my ERPs</div>
</nav>

<button className="sidebar-download"><FaDownload /> Download</button>
        </aside>

        {/* MAIN CONTENT */}
        <div className="dashboard-content">
          <h1>My dashboard</h1>
        <div className="dashboard-row-top">
  {/* MAIN CARDS ROW */}
  <div className="main-cards-row">
    <div className="analytics-dashboard-card-news">
      <div className="label">My total sales YTD</div>
      <div className="stat-value">USD 2.4m</div>
      <div className="stat-note">+25% in a month</div>
    </div>
    <div className="analytics-dashboard-card-news">
      <div className="label">My total quotes issued YTD</div>
      <div className="stat-value">1,325</div>
      <div className="stat-note">+15% in a month</div>
    </div>
    <div className="analytics-dashboard-card-news">
      <div className="label">My total parts sold YTD</div>
      <div className="stat-value">800</div>
      <div className="stat-note">+17% in a month</div>
    </div>
    <div className="analytics-dashboard-card-news">
      <div className="label">Clients avg. response time</div>
      <div className="stat-value">23.1hr</div>
      <div className="stat-note">-10% in a month</div>
    </div>
    <div className="analytics-dashboard-card-news">
      <div className="label">Status of my sales target</div>
      <div className="stat-value">67%</div>
      <div className="stat-note">+10% in a month</div>
    </div>
  </div>

  {/* KPI ROW */}
  <div className="kpi-row">
    {kpis.map((kpi, index) => (
      <div className="kpi-card visual" key={index}>
        <div className="kpi-icon">{kpi.icon}</div>
        <div className="kpi-value">{kpi.value}</div>
        <div className="kpi-label">{kpi.label}</div>
      </div>
    ))}
  </div>
</div>
          <div className="dashboard-row">
            <div className="analytics-dashboard-card dashboard-card-wide">
              <h3 className='subtitle'>My sales this year</h3>
<div style={{ width: '100%', height: '90%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
        data={data3}
        margin={{ right: 30 }}>
          <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#fff" tick={{ fill: "#fff" }} />
          <YAxis stroke="#fff" tick={{ fill: "#fff" }} />
          <Tooltip 
            contentStyle={{ background: "#223366", border: "none", color: "#fff" }} 
            itemStyle={{ color: "#fff" }} 
            labelStyle={{ color: "#fff" }} 
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar dataKey="giraffe" fill="#4682e9" name="Giraffe Technical Services" />
          <Line type="monotone" dataKey="market" stroke="orange" name="Market" />
        </BarChart>
      </ResponsiveContainer>
    </div>
            </div>
            <div className="analytics-dashboard-card dashboard-card-tall">
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
          <div className="dashboard-row">
            <div className="analytics-dashboard-card dashboard-card-wide">
              <h3 className='subtitle'>My sales this year</h3>
               <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer>
        <LineChart data={data2}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#fff" tick={{ fill: "#fff" }}/>
          <YAxis domain={[5.0, 5.6]} stroke="#fff" tick={{ fill: "#fff" }}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="expected" stroke="#yellow" name="Expected Price" />
          <Line type="monotone" dataKey="market" stroke="orange" name="Market Avg" />
        </LineChart>
      </ResponsiveContainer>
    </div>
            </div>
          <div className="kpi-col">
    <div className="analytics-dashboard-card kpi-card">
      <div className="label-analytics">My total parts purchased</div>
      <div className="stat-value kpi-large">300</div>
      <div className="stat-growth">+ 1% in a month</div>
    </div>
    <div className="analytics-dashboard-card kpi-card">
      <div className="label-analytics">My main supplier</div>
      <div className="stat-value kpi-large">Joahn Meyers</div>
      <div className="stat-link kpi-link">Chat now</div>
    </div>
  </div>
          </div>
           <div className="dashboard-row">
              <div className="analytics-dashboard-card dashboard-card-wide">
                <h3 className='subtitle'>Parts acquired per geography</h3>
    <div style={{ width: '100%', height: '400px' }}>
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid stroke="#fff" strokeDasharray="3 3" />
        <XAxis dataKey="category"stroke="#fff" tick={{ fill: "#fff" }} />
        <YAxis stroke="#fff" tick={{ fill: "#fff" }}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="Europe" stackId="a" fill="#4682e9" />
        <Bar dataKey="Asia" stackId="a" fill="#f5c242" />
        <Bar dataKey="USA" stackId="a" fill="#e95555" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  </div>

            
           
        </div>
      </div>
       
    </div>
    <Footer/>
      </div>
  );
};

export default AnalyticsPage;