import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Screens/SideBar';
import Profile from './Screens/Profile';
import History from './Screens/History';
import Transact from './Screens/Transact';

function App() {
  return (
    <Router>
      <div className="container">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/transact" element={<Transact />} />
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
