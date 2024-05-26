import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import './styles.css'; // Import CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="title">Microsoft Money</h2>
      <ul>
        <li><NavLink exact to="/" activeClassName="active">Profile</NavLink></li>
        <li><NavLink exact to="/history" activeClassName="active">History</NavLink></li>
        <li><NavLink exact to="/debtManagement" activeClassName="active">Intelligent Debt Management </NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;
