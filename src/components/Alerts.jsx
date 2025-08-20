import React from "react";
import "../airzon.css";

const AlertsSidebar = ({ open, onClose, alerts }) => (
  <div className={`alerts-sidebar${open ? " open" : ""}`}>
    <div className="alerts-sidebar-header">
      <span>Alerts</span>
      <button className="alerts-sidebar-close" onClick={onClose}>✕</button>
    </div>
<div className="alerts-sidebar-content-scroll">
       <div className="alerts-section">
      <div className="alerts-title">My market alerts</div>
      <div className="alerts-list">
        {alerts.market.map((item, i) => (
          <div className="alert-card" key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </div>
    </div>

    <div className="alerts-section">
      <div className="alerts-title">My inventory alerts</div>
      <div className="alerts-list">
        {alerts.inventory.map((item, i) => (
          <div className="alert-card" key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </div>
    </div>

    <div className="alerts-section">
      <div className="alerts-title">News alerts</div>
      <div className="alerts-list">
        {alerts.news.map((item, i) => (
          <div className="alert-card" key={i}>{item}</div>
        ))}
      </div>
    </div>
    </div>
    <button className="edit-alerts-btn">Edit Alerts</button>
  </div>
);

export default AlertsSidebar;