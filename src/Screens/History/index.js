import React, { useState } from 'react';
import './styles.css';
import data from '../../dt/data.json'; 

const History = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);
  const recordsPerPage = 8;
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 + 1 }, (_, i) => 2022 + i);

  const filteredData = data.filter(record => record.year === selectedYear);

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
    setCurrentPage(1); 
  };

  const toggleExpandRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className='content'>
      <h2>History</h2>
      <hr />
      <div className="dropdown-container">
        <label htmlFor="year-select">Select Year: </label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <table className="grid">
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Budget</th>
            <th>Goal Met</th>
            <th>View Transactions</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((record, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>{record.year}</td>
                <td>{record.month}</td>
                <td>{record.budget}</td>
                <td>
                  <span className={`goal-indicator ${record.goalMet ? 'green' : 'red'}`}> {record.goalMet}</span>
                </td>
                <td>
                  <button className="view-transactions" onClick={() => toggleExpandRow(index)}>
                    {expandedRow === index ? 'Hide Transactions' : 'View Transactions'}
                  </button>
                </td>
              </tr>
              {expandedRow === index && (
                <tr>
                  <td colSpan="5">
                    <table className="transactions-grid">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Category</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.transactions.map((transaction, i) => (
                          <tr key={i}>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage >= Math.ceil(filteredData.length / recordsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default History;
