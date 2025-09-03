import React from "react";
import TopNavBar from "../components/TopNavBar";
import Footer from "../components/Footer";
import { FaCamera } from "react-icons/fa";
import "../airzon.css";

const ProfilePage = () => {
    return (
   <>
    <TopNavBar />
    <div className="profile-wrapper">
     <div className="profile-header">
  <h1 className="profile-title">Your profile</h1>
  <button className="logout-btn">Logout</button>
</div>

      <div className="profile-grid">
        {/* Left: General info */}
        <section className="profile-card">
           <div className="profile-card-header">General Information</div>
          <div className="profile-photo-area">
            <span className="profile-photo-circle">
              <FaCamera size={42} />
            </span>
          </div>
          <div className="profile-info">
            <div>
              <strong>Name:</strong> Martin Rodhe
            </div>
            <div>
              <strong>Position:</strong> Head of Procurement
            </div>
            <div>
              <strong>Company:</strong> Giraffe Technical Services
            </div>
            <div>
              <strong>Email:</strong> Martin.Rodhe@GiraffeTechnicalServices.com
            </div>
            <div>
              <strong>Client of Anchor Partner:</strong> Yes
            </div>
          </div>
          <button className="profile-modify-btn">Modify</button>
        </section>

        {/* Center: Interests */}
        <section className="profile-card">
          <div className="profile-card-header">Your interests</div>
          <div className="profile-interests-grid">
            <span>Aircraft parts trading</span>
            <span>Hydraulics & Pneumatics</span>
            <span>Your main supplier new offers</span>
            <span>Wide-Body Aircraft</span>
            <span>Africa & Middle East</span>
          </div>
          <button className="profile-modify-btn">Modify</button>
        </section>

        {/* Right: Settings */}
         <div className="profile-side-col">
        <section className="profile-card profile-card-narrow">
          <div className="profile-card-header">Settings</div>
          <ul className="profile-settings-list">
            <li>Language preferences</li>
            <li>FAQ</li>
            <li>Access to Web trainings</li>
            <li>Night view</li>
          </ul>
        </section>

        {/* Right: Airzon solution */}
        <section className="profile-card profile-card-narrow">
          <div className="profile-card-header">Airzon Solutions</div>
          <div className="profile-solution-box">
            Exclusive Solution for Anchor Partner clients
          </div>
        </section>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
};

export default ProfilePage;