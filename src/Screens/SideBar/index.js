import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink instead of Link
import './styles.css'; // Import CSS file

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="title">Microsoft Money</h2>
      <ul>
        <li><NavLink exact to="/profile" activeClassName="active">Profile</NavLink></li>
        <li><NavLink exact to="/history" activeClassName="active">History</NavLink></li>
        <li><NavLink exact to="/transact" activeClassName="active">Transact</NavLink></li>
      </ul>
    </div>
  );
}

export default Sidebar;
