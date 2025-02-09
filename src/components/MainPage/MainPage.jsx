import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import s from "./MainPage.module.scss";
import WeatherWidget from "../WeatherWidget/WeatherWidget";

const MainPage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("loggedInUsername");
    if (!username) {
      navigate("/login");
    } else {
      try {
        const user = JSON.parse(localStorage.getItem(username));
        if (user) {
          setUserData(user);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Ошибка при чтении данных пользователя:", error);
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUsername");
    navigate("/login");
  };

  return (
    <div className={s.container}>
      <div className={s.profileSection}>
        {userData ? (
          <>
            <div className={s.profile}>
              <img
                className={userData.avatar ? s.pfp : s.defaultPfp}
                src={userData.avatar || "profileimg.png"}
                alt="Profile"
                onError={(e) => { e.target.src = "profileimg.png"; }}
              />
              <h2 className={s.username}>
                {userData.firstName} {userData.lastName}
              </h2>
            </div>
            <div className={s.info}>
              <p>
                <b>Имя:</b> {userData.firstName}
              </p>
              <p>
                <b>Фамилия:</b> {userData.lastName}
              </p>
              <p>
                <b>Возраст:</b> {userData.age ? `${userData.age} лет` : "Не указан"}
              </p>
              <p>
                <b>Хобби:</b> {userData.hobby || "Не указано"}
              </p>
              <p>
                <b>Образование/Работа:</b> {userData.education || "Не указано"}
              </p>
            </div>
            <div className={s.actions}>
              <button className={s.btn} onClick={handleLogout}>
                Выйти
              </button>
              <button className={s.btn} onClick={() => navigate("/edit")}>
                Редактировать
              </button>
              <button className={s.btn} onClick={() => navigate("/Games")}>
                Игры
              </button>
            </div>
          </>
        ) : (
          <div className={s.loader}>
            <p>Загрузка данных...</p>
          </div>
        )}
      </div>
      
      <div className={s.other}>
        <div className={s.playerSection}>
          <MusicPlayer isFixed={false} />
        </div>

        <div className={s.weatherSection}>
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
