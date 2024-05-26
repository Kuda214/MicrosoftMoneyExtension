import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import dayjs from 'dayjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DebtManagement = () => {
  const [debts, setDebts] = useState([]);
  const [totalDebt, setTotalDebt] = useState(0);
  const [totalMonthlyPayments, setTotalMonthlyPayments] = useState(0);
  const [creditScore, setCreditScore] = useState(0);

  const userId = "3FA85F64-5717-4562-B3FC-2C963F66AFA6";
  useEffect(() => {
    fetch(`http://localhost:5129/api/Debt/${userId}`) 
      .then(response => response.json())
      .then(data => {
        setDebts(data);
        console.log(data); 
      })
      .catch(error => console.error('Error fetching the debts:', error));
  }, []);


  useEffect(() => {
    getTotalDebt();
    getTotalMonthlyPayments();
    //getCreditScore();
  })



  const getTotalDebt = () => {
    fetch(`http://localhost:5129/totaldebt/${userId}`) 
    .then(response => response.json())
    .then(data => {
      setTotalDebt(data);
      console.log(data); 
    })
    .catch(error => console.error('Error fetching the total debt:', error));
  };

  const getTotalMonthlyPayments = () => {
    fetch(`http://localhost:5129/api/Debt/totalpayments/${userId}`) 
    .then(response => response.json())
    .then(data => {
      setTotalMonthlyPayments(data);
      console.log(data); 
    })
    .catch(error => console.error('Error fetching the total payments:', error));
  };

  const debtTypes = debts.map(debt => debt.type);
  const debtBalances = debts.map(debt => debt.balance);
  const monthlyPayments = debts.map(debt => debt.monthlyPayment);

  const barData = {
    labels: debtTypes,
    datasets: [
      {
        label: 'Debt Balance',
        data: debtBalances,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Monthly Payment',
        data: monthlyPayments,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const doughnutData = {
    labels: debtTypes,
    datasets: [
      {
        data: debtBalances,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
      },
    ],
  };

  const getAdvice = () => {
    return debts.map(debt => {
      const lastPaymentDate = dayjs(debt.lastPaymentDate);
      const daysSinceLastPayment = dayjs().diff(lastPaymentDate, 'day');
      let advice = `For your ${debt.type} debt, ensure you are making your monthly payments of R${debt.monthlyPayment.toLocaleString()}.`;

      if (debt.missedPayments > 0) {
        advice += ` You have missed ${debt.missedPayments} payment(s). Missed payments can negatively impact your credit score and incur additional fees.`;
      }

      if (daysSinceLastPayment > 30) {
        advice += ` It's been ${daysSinceLastPayment} days since your last payment. It's important to stay up to date to avoid penalties.`;
      }

      return (
        <div key={debt.id} style={{ margin: '10px 0' }}>
          <h4>{debt.type} Advice:</h4>
          <p>{advice}</p>
        </div>
      );
    });
  };

  return (
    <div className='content'>
      <h1>Debt Management and Reduction</h1>
      <h2>Total Debt: R{totalDebt.toLocaleString()}</h2>
      <h2>Total Monthly Payments: R{totalMonthlyPayments.toLocaleString()}</h2>
      <table border="1" className="grid">
        <thead>
          <tr>
            <th>Type</th>
            <th>Balance</th>
            <th>Interest Rate (%)</th>
            <th>Monthly Payment</th>
            <th>Last Payment Date</th>
            <th>Missed Payments</th>
          </tr>
        </thead>
        <tbody>
          {debts.map(debt => (
            <tr key={debt.id}>
              <td>{debt.type}</td>
              <td>R{debt.balance.toLocaleString()}</td>
              <td>{debt.interestRate}</td>
              <td>R{debt.monthlyPayment.toLocaleString()}</td>
              <td>{debt.lastPaymentDate}</td>
              <td>{debt.missedPayments}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: '30%', margin: '0 auto' }}>
        <h3>Debt Balance Distribution</h3>
        <Doughnut data={doughnutData} />
      </div>
      <div style={{ width: '45%', margin: '0 auto' }}>
        <h3>Debt Balances and Monthly Payments</h3>
        <Bar data={barData} />
      </div>
      <div>
        <h3>Personalized Advice</h3>
        {getAdvice()}
      </div>
    </div>
  );
};

export default DebtManagement;
