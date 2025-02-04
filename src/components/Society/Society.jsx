import React from "react";
import s from "./Society.module.scss";

const newsData = [
  {
    id: 1,
    title: "Открытие новых приютов в регионах",
    content:
      "Согласно последним сообщениям, в рамках программы улучшения условий для бездомных животных в 2024 году было объявлено о создании новых приютов в каждом регионе Узбекистана. Первые такие центры уже начали свою работу в Ташкенте, Самарканде и Ферганской области. Эти приюты предоставляют временное убежище для кошек и собак, проводят их вакцинацию, стерилизацию и лечение.В Ташкенте открылся первый муниципальный приют, финансируемый из бюджета города. Здесь планируется размещение до 500 животных одновременно.",
  },
  {
    id: 2,
    title: "Волонтёрские приюты усиливают свою деятельность",
    content:
      "Частные приюты, созданные волонтёрами, продолжают активно работать: Приют «Хаёт» (Ташкент): за последний год увеличил количество спасённых животных. Волонтёры сообщили, что с начала года они нашли новых хозяев для более 200 собак и кошек. «Доброе сердце» (Самарканд): приют провёл первую благотворительную акцию, в ходе которой собрали корм и лекарства на сумму более 10 млн сумов.",
  },
  {
    id: 3,
    title: "Программа «Построй дом для друга»",
    content:
      "В конце 2024 года была запущена инициатива «Построй дом для друга», которая позволяет жителям Узбекистана участвовать в строительстве и оборудовании приютов. Люди могут вносить пожертвования, которые идут на строительство вольеров, обустройство зон для выгула и покупку медицинского оборудования.",
  },
];

const Society = () => {
  return (
    <div className={s.newsPage}>
      <h1 className={s.title}>Приюты - Новости</h1>
      <div className={s.newsList}>
        {newsData.map((news) => (
          <div key={news.id} className={s.newsItem}>
            <h2 className={s.newsTitle}>{news.title}</h2>
            <p className={s.newsContent}>{news.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Society;
