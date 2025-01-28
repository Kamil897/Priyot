// App.jsx
import { useState } from 'react';
import styles from './Animation.module.scss';

const Animation = () => {
  const [characters, setCharacters] = useState([{ id: 0, name: 'Character 1' }]);

  const handlePayment = async () => {
    // Simulating a payment process with a mock API
    const paymentSuccessful = await processPayment();

    if (paymentSuccessful) {
      const newCharacterId = characters.length;
      const newCharacterName = `Character ${newCharacterId + 1}`;
      setCharacters([...characters, { id: newCharacterId, name: newCharacterName }]);
    } else {
      alert('Payment failed. Please try again.');
    }
  };

  const processPayment = async () => {
    // Mock payment logic: replace with a real payment gateway
    return new Promise((resolve) => {
      setTimeout(() => {
        const success = Math.random() > 0.2; // 80% success rate
        resolve(success);
      }, 2000); // Simulate 2-second payment processing
    });
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.bg} ${styles.img}`}></div>
      <div className={`${styles.clouds} ${styles.img}`}></div>
      <div className={`${styles.cloudsFront} ${styles.img}`}></div>
      <div className={`${styles.beach} ${styles.img}`}></div>
      {characters.map((char) => (
        <div
            key={char.id}
            className={`${styles.char} ${styles.img}`}
            style={{ left: `${55 + char.id * 120}px` }}
        >
          <span className={styles.charName}>{char.name}</span>
        </div>
      ))}
      <button className={styles.addButton} onClick={handlePayment}>
        Pay to Add Character
      </button>
    </div>
  );
};

export default Animation;