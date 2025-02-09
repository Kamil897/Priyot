import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import s from "./HomeHero.module.scss";
import Slider from "../Slider/Slider.jsx";
import Clouds from "../Clouds/Clouds.jsx";

const HomeHero = () => {
  const mapRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [brokenIndex, setBrokenIndex] = useState(null);

  const handleMouse = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  const handleBallClick = (index) => {
    setBrokenIndex(index);
    setTimeout(() => setBrokenIndex(null), 2000); // Восстановление через 2 секунды
  };

  useEffect(() => {
    if (!mapRef.current) {
      const mapContainer = document.getElementById("map");
      mapContainer.style.width = "100%";
      mapContainer.style.height = "0";
      mapContainer.style.paddingBottom = "50%";
      mapContainer.style.position = "relative";

      mapRef.current = L.map("map", {
        attributionControl: false,
      }).setView([41.311081, 69.240562], 10);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(mapRef.current);

      L.control
        .attribution({
          prefix:
            "<img src='https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg' alt='Флаг Узбекистана' style='height: 12px; vertical-align: middle;'> Узбекистан",
        })
        .addTo(mapRef.current);

      // Определяем границы отображения
      const squareBounds = [
        [41.280, 69.200],
        [41.350, 69.300],
      ];

      // Данные о приютах
      const shelters = [
        {
          coords: [41.112, 69.047],
          popup: "Приют \"Хаёт\" (Кибрайский район, Ташкентская область)",
        },
        {
          coords: [41.292515, 69.19834],
          popup: "Приют для собак \"Четыре лапы\" (Янгиюльский район, Ташкентская область)",
        },
        {
          coords: [41.299, 69.24],
          popup: "Приют для собак \"Дай Шанс\" (Ташкент)",
        },
        {
          coords: [41.307, 69.252],
          popup: "Приют \"Гавчег\" (Ташкент)",
        },
        {
          coords: [41.3275, 69.2565],
          popup: "Приют \"Джангох\" (Шайхантахурский район, Ташкент)",
        },
        {
          coords: [40.906, 69.559],
          popup: "Садовые участки (Ахангаранский район)",
        },
        {
          coords: [41.391, 69.404],
          popup: "Зафарабад (Кибрайский район)",
        },
        {
          coords: [40.963, 69.646],
          popup: "Хоз-во Х.Кадырова (Пскентский район)",
        },
      ];

      // Создаём кастомную иконку для маркеров
      const customIcon = L.divIcon({
        html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="10" r="3"/>
            <path d="M12 2a8 8 0 0 0-8 8c0 1.892.402 3.13 1.5 4.5L12 22l6.5-7.5c1.098-1.37 1.5-2.608 1.5-4.5a8 8 0 0 0-8-8z"/>
          </svg>
        `,
        className: "custom-marker",
        iconSize: [36, 36],
        iconAnchor: [18, 36],
        popupAnchor: [0, -36],
      });

      // Добавляем маркеры на карту
      shelters.forEach((shelter) => {
        const [lat, lng] = shelter.coords;
        if (
          lat >= squareBounds[0][0] &&
          lat <= squareBounds[1][0] &&
          lng >= squareBounds[0][1] &&
          lng <= squareBounds[1][1]
        ) {
          L.marker(shelter.coords, { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup(shelter.popup)
            .openPopup();
        }
      });
    }
  }, []);

  const cardData = [
    {
      title: "Доступность 24/7",
      description: "Наш информационный сайт всегда открыт для вас! Вы можете найти полезную информацию о приютах Узбекистана, получить ответы на вопросы и узнать, как помочь, в любое время."
    },
    {
      title: "Актуальные данные",
      description: "Мы предоставляем точную и свежую информацию о работе приютов, условиях проживания, а также возможностях волонтёрства и поддержки."
    },
    {
      title: "Поддержка и безопасность",
      description: "Наша цель – создать ресурс, где каждый сможет найти нужные сведения и почувствовать заботу. Мы следим за тем, чтобы все материалы были проверенными, а общение – доброжелательным и полезным."
    }
  ];


  return (
    <>
      <section className={s.welcome_section}>
        <Clouds />
      </section>

      <section className={s.aboutus}>
        <h2 className={s.title}>О нас</h2>

        <p className={s.description}>
        <b>Мы</b> – команда неравнодушных людей, которая стремится помочь бездомным животным в Ташкенте. 
        Наш сайт создан, чтобы объединить усилия тех, кто готов помочь: будь то волонтерство, 
        материальная поддержка или поиск нового дома для животных.
        <br />
        <br />
        <b> Наша цель</b> – сделать мир лучше для братьев наших меньших, предоставляя информацию о приютах, 
        проводимых мероприятиях и способах участия. Вместе мы можем спасти больше жизней и подарить 
        животным шанс на счастливую жизнь!
        </p>
      </section>

      <section className={s.services} id="section-Как вы можете помочь">
        <Slider />
      </section>

      <section className={s.why_us} id="section-Полезная информация">
        <h1 className={s.why_us_title}>Полезная информация</h1>
        <div className={s.content}>
          <div className={s.item}>
            <h2 className={s.item_title}>
              В большинстве приютов проводится вакцинация и стерилизация животных перед передачей новым хозяевам.
            </h2>
          </div>
          <div className={s.item}>
            <h2 className={s.item_title}>
              Приюты предоставляют помощь в адаптации животного в новом доме.
            </h2>
          </div>
          <div className={s.item}>
            <h2 className={s.item_title}>
              Регулярно проводятся образовательные мероприятия для всех желающих узнать больше о правильном уходе за
              животными.
            </h2>
          </div>
        </div>
      </section>

      <section className={s.our_users}>
      <h1 className={s.ourUsersTitle} id="section-Почему выбирают нас">
        Почему выбирают нас?
      </h1>
      <div className={s.cardContainer}>
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`${s.cardUsers} ${
              brokenIndex === index ? s.broken : ""
            }`}
            onMouseMove={handleMouse}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={() => handleBallClick(index)}
          >
            <h2 className={s.cardTitle}>{card.title}</h2>
            <p className={s.cardDescription}>{card.description}</p>
          </div>
        ))}
        {isHovering && (
          <div
            onClick={() => handleBallClick(cursorPos.index)}
            className={s.customCursor}
            style={{ top: `${cursorPos.y}px`, left: `${cursorPos.x}px` }}
          />
        )}
      </div>
    </section>

      <section id="sectionmap">
        <div id="map" style={{ height: "400px" }}></div>
      </section>
    </>
  );
};

export default HomeHero;
