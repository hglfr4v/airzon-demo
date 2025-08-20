import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import MarketPage from './pages/MarketPage';
import EventsPage from './pages/EventsPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import MyCartPage from './pages/MyCartPage';
import MyInventoryPage from './pages/MyInventoryPage';
import RegisterPage from './pages/RegisterPage';
import NewItemPage from './pages/NewItemPage';
import ItemDetails from './pages/ItemDetails';
import CreateEvent from './pages/CreateEvent';
import JoinEvent from './pages/JoinEvent';
import CreateItem from './pages/CreateItem';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router basename="/airzon-demo">
      <Routes>
        <Route path="/" element={isAuthenticated ? (<HomePage logout={logout} />) : (<Navigate to="/login" />)}/>
        <Route path="/login" element={isAuthenticated ? (<Navigate to="/" />) : (<LoginPage login={login} />)}/>
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/market" element={<MarketPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/mycart" element={<MyCartPage />} />
        <Route path="/mycart" element={<MyCartPage />} />
        <Route path="/mycart" element={<MyCartPage />} />
        <Route path="/inventory" element={<MyInventoryPage />} />
        <Route path="/register" element={<RegisterPage />}/>
        <Route path="/new-item" element={<NewItemPage />}/>
        <Route path="/market/item/:id" element={<ItemDetails />} />
        <Route path='create-event' element={<CreateEvent />} />
        <Route path="/join-event/:eventId" element={<JoinEvent />} />
        <Route path="/create-item/" element={<CreateItem />} />




      </Routes>
    </Router>
  );

}



export default App;