import React from 'react';
import './styles.css'

const Profile = () => {
    const user = {
        name: 'John Doe',
        age: 30,
        occupation: 'Software Engineer',
        // Add more user details as needed
      };
    
  return (
    <div className='content'>
      <h2>Profile</h2>
      <hr /> 
      <div className="profile-details">
        <div className="profile-image">
          <img src="https://github.com/Kuda214/MicrosoftMoneyExtension/blob/main/public/img.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
          <p>Occupation: {user.occupation}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;