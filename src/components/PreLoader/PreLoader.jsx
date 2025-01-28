import React, { useState, useEffect } from 'react';
import s from './PreLoader.module.scss';

const PreLoader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (!hasVisited) {
      setIsVisible(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    document.body.classList.add("no-scroll");

    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`${s.loadingContainer} custom-loading-container`}>
      <div className={`${s.spinnerWrapper} custom-spinner-wrapper`}>
        <div className={`${s.spinner} custom-spinner`}>
          <div className={`${s.innerCircle} custom-inner-circle`}></div>
        </div>
      </div>
      <p className={`${s.loadingText} custom-loading-text`}>Загрузка...</p>
    </div>
  );
};

export default PreLoader;
