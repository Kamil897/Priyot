import React, { useState } from 'react';
import './TreeOfKindness.scss'; // Import the SCSS file

const TreeOfKindness = () => {
  const [donations, setDonations] = useState([]);
  const [donationCounter, setDonationCounter] = useState(0);

  const addDonation = (donorName, amount) => {
    setDonations([
      ...donations,
      { id: donationCounter, donorName, amount },
    ]);
     setDonationCounter(donationCounter + 1);
  };

  return (
    <div className="tree-container">
      <div className="tree">
        {donations.map((donation, index) => {
          const angle = -45 + index * 20;
          const xOffset = index % 2 === 0 ? -1 : 1;
          return (
            <div
              key={donation.id}
              className="branch"
              style={{
                transform: `rotate(${angle * xOffset}deg)`,
                top: `${80 - index * 10}%`,
              }}
            >
              <div className="fruit">
                🍎 {donation.donorName}: ${donation.amount}
              </div>
            </div>
          );
        })}
      </div>
      <div className="controls">
        <button onClick={() => addDonation('User1', 100)}>
          Add Donation (User1, $100)
        </button>
        <button onClick={() => addDonation('User2', 200)}>
          Add Donation (User2, $200)
        </button>
        <button onClick={() => addDonation('User3', 300)}>
          Add Donation (User3, $300)
        </button>
      </div>
    </div>
  );
};

export default TreeOfKindness;