import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Screens/SideBar';
import Profile from './Screens/Profile';
import History from './Screens/History';
import DebtManagement from './Screens/DebtManagement';
import { useGoogleLogin } from '@react-oauth/google'; // Removed unnecessary imports
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Corrected useState syntax

  const login = useGoogleLogin({
    onSuccess: tokenResponse => { 
      console.log(tokenResponse);
      setIsLoggedIn(true);
    },
  });

  return (
    <>
      {isLoggedIn ? (
        <Router>
          <div className="container">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/history" element={<History />} />
                <Route path="/debtManagement" element={<DebtManagement />} />
              </Routes>
            </div>
          </div>
        </Router>
      ) : (
        <div className='loginPage'>
          <button className="loginbtn" onClick={login}>Sign in with Google 🚀</button>
        </div>
      )}
    </>
  );
}

export default App;
