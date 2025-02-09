import React, { useState, useEffect } from 'react';
import s from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';


const Header = () => {
  const [active, setActive] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('loggedInUsername');
    if (username) {
      const user = JSON.parse(localStorage.getItem(username));
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUsername');
    setUserData(null);
    navigate('/login');
  };

  const toggleBurger = () => {
    setActive(!active);
  };

  const CloseMenu = () => {
  setActive(false);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add(s.dark);
      document.body.classList.remove(s.light);
    } else {
      document.body.classList.add(s.light);
      document.body.classList.remove(s.dark);
    }
  }, [isDarkMode]);

  return (
    <>
      <header className={s.header}>
        <div className={s.container__main}>
          <nav className={s.nav}>
            <div className={s.logo}>
              <Link onClick={CloseMenu} to={'/'} className={s.h1__logo}>
                Приюты Узбекистана
              </Link>
            </div>

            <div className={`${s.links} ${active ? s.active : ''}`} onClick={CloseMenu}>
              <Link to='/Shop'>Магазин игрушек</Link>

              <Link onClick={CloseMenu} className={s.dropdown} to={'/Animals'}>
                Новости Узбекистана
              <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.5306 6.53063L8.53063 11.5306C8.46095 11.6005 8.37816 11.656 8.28699 11.6939C8.19583 11.7317 8.09809 11.7512 7.99938 11.7512C7.90067 11.7512 7.80293 11.7317 7.71176 11.6939C7.6206 11.656 7.53781 11.6005 7.46813 11.5306L2.46813 6.53063C2.32723 6.38973 2.24808 6.19864 2.24808 5.99938C2.24808 5.80012 2.32723 5.60902 2.46813 5.46813C2.60902 5.32723 2.80012 5.24808 2.99938 5.24808C3.19864 5.24808 3.38973 5.32723 3.53063 5.46813L8 9.9375L12.4694 5.4675C12.6103 5.32661 12.8014 5.24745 13.0006 5.24745C13.1999 5.24745 13.391 5.32661 13.5319 5.4675C13.6728 5.6084 13.7519 5.7995 13.7519 5.99875C13.7519 6.19801 13.6728 6.38911 13.5319 6.53L13.5306 6.53063Z"
                    fill="white"
                  />
              </svg>

              <div>
                   <Link onClick={CloseMenu} to={'/Animals'}>Все Новости</Link>
                   <Link onClick={CloseMenu} to={'/Society'}>Новости</Link>
                   <Link onClick={CloseMenu} to={'/Tech'}>Проблемы</Link> 
                   <Link onClick={CloseMenu} to={'/Culture'}>Защита</Link> 
              </div>
              </Link>

              <Link className={s.teach} onClick={CloseMenu} to={'/Shelter'}>Приюты</Link>
              {!userData ? (
                <>
                  <Link onClick={CloseMenu} to={'/register'}>
                    <button className={s.reg}><img src="/user.png" alt="profile" /></button>
                  </Link>
                </>
              ) : (
                <div className={s.userSection}>
                  <Link className={s.main} onClick={CloseMenu} to={'/MainPage'}>
                    <img
                      src={userData.avatar || '/profileimg.png'} 
                      alt="Avatar"
                      className={s.avatar}
                    />
                  </Link>
                </div>
              )}
            </div>
            
            <div
              onClick={toggleBurger}
              className={`${s.burger} ${active ? s.active : ''}`}>
              <span></span>
              <span></span>
            </div>

            <div className={s.changeTheme}>
  <button onClick={toggleTheme} className={s.button}>
    {isDarkMode ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={s.icon}
      >
        <path d="M21.257 10.962c.474.62.474 1.457 0 2.076C19.764 14.987 16.182 19 12 19c-4.182 0-7.764-4.013-9.257-5.962a1.692 1.692 0 0 1 0-2.076C4.236 9.013 7.818 5 12 5c4.182 0 7.764 4.013 9.257 5.962z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={s.icon}
      >
        <path d="M2 10s3.5 4 10 4 10-4 10-4" />
        <path d="M4 11.645L2 14" />
        <path d="M22 14l-1.996-2.352" />
        <path d="M8.914 13.68L8 16.5" />
        <path d="M15.063 13.688L16 16.5" />
      </svg>
    )}
  </button>
</div>

          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;