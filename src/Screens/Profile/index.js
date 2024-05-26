import React, { useEffect } from 'react';
import './styles.css'
import { Doughnut } from 'react-chartjs-2';

const Profile = () => {

    const [creditScore, setCreditScore] = React.useState(0);
    const userId = "3FA85F64-5717-4562-B3FC-2C963F66AFA6";


    const user = {
        name: 'Kudakwashe Chivunga',
        age: 22,
        occupation: 'Software Engineer',
        investmentPortfolio: 'None',
        spendingBehavior : 'Good',
        timeRegistered: '8 months' ,
        id : '"3FA85F64-5717-4562-B3FC-2C963F66AFA6'
 
    };

    useEffect (() => {
        getCreditScore();
    })

    const getCreditScore = () => {
        fetch(`http://localhost:5129/api/Debt/creditscore/${userId}`) 
        .then(response => response.json())
        .then(data => {
          setCreditScore(data-178);
          console.log(data); 
        })
        .catch(error => {
            console.error('Error:', error);
        })
      }
      
        const doughnutData = {
            labels:  ['Credit Score', 'Remaining Score'],
            datasets: [
                {
                  label: 'Credit Score',
                  data: [creditScore, 850 - creditScore],
                  backgroundColor: ['#36a2eb', '#ffcd56'],
                },
              ],
          };
    
    return (
        <div className='contentt'>
            <h2>Profile</h2>
            <hr />
            <div className="profile-details">
                <div className="profile-image">
                    <img  className="profile-image" src={require("../../imgs/img.jpg")} alt="Profile" />
                </div>
                <br/>
                <div className="profile-info">
                    <h3>{user.name}</h3>
                    <p>Age: {user.age}</p>
                    <p>Occupation: {user.occupation}</p>
                    <p>Investment Portfolio: {user.investmentPortfolio}</p>
                    <div className="spending-behavior">
                        <p>Spending Behavior: {user.spendingBehavior}</p>
                        <div className="behavior-indicator" style={{ backgroundColor: user.spendingBehavior === 'Good' ? 'green' : 'red' }}></div>
                    </div>
                    <p>Credit Score: {creditScore}</p>
                    <div style={{ width: '20%', margin: '0 auto' }}>
                        <h3>Debt Balance Distribution</h3>
                        <Doughnut data={doughnutData} />
                    </div>
                    </div>
            </div>
        </div>
    );
}



export default Profile;
