import React, { useState, useEffect } from 'react';
import styles from './WeatherWidget.module.scss';

const weatherDescriptions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy', 'Windy', 'Partly Cloudy'];

const getOrGenerateForecast = (region) => {
  const savedForecast = localStorage.getItem(`weather_${region}`);
  if (savedForecast) {
    return JSON.parse(savedForecast);
  }
  return generateForecast(region);
};

const generateForecast = (region, days = 7) => {
  const today = new Date();
  const forecast = [];

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    forecast.push({
      date: date.toISOString().split('T')[0],
      temp: Math.floor(Math.random() * (12 - (-7) + 1)) - 7,
      description: weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)],
    });
  }

  localStorage.setItem(`weather_${region}`, JSON.stringify(forecast));
  return forecast;
};

const WeatherWidget = () => {
  const [region, setRegion] = useState('Tashkent');
  const [forecast, setForecast] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const generatedForecast = getOrGenerateForecast(region);
    setForecast(generatedForecast);
    setPage(0);
  }, [region]);

  const getDayOfWeek = (dateString) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
  };

  const itemsPerPage = 3;
  const startIndex = page * itemsPerPage;
  const currentItems = forecast.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, Math.ceil(forecast.length / itemsPerPage) - 1));
  };

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  if (!forecast.length) {
    return <div className={styles.error}>No data available for {region}.</div>;
  }

  return (
    <div className={styles.widget}>
      <h2 className={styles.city}>{region}</h2>

      <div className={styles.forecast}>
        {currentItems.map((day, index) => (
          <div key={index} className={styles.day}>
            <p className={styles.date}>
              {day.date} ({getDayOfWeek(day.date)})
            </p>
            <p className={styles.temp}>{day.temp}°C</p>
            <p className={styles.description}>{day.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.pagination}>
        <button
          onClick={handlePrev}
          disabled={startIndex === 0}
          className={styles.prevButton}
        >
          Назад
        </button>
        <button
          onClick={handleNext}
          disabled={startIndex + itemsPerPage >= forecast.length}
          className={styles.nextButton}
        >
          Далее
        </button>
      </div>

      <div className={styles.controls}>
        <button onClick={() => setRegion('Moscow')}>Москва</button>
        <button onClick={() => setRegion('Tashkent')}>Ташкент</button>
        <button onClick={() => setRegion('New York')}>Нью Йорк</button>
      </div>
    </div>
  );
};

export default WeatherWidget;
