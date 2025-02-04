import React from "react";
import s from "../Society/Society.module.scss";

const newsData = [
    {
        id: 1,
        title: "Общественная проблема бездомных животных",
        content:
        "В Узбекистане бездомные животные, в основном кошки и собаки, представляют собой одну из острых социальных и экологических проблем. В крупных городах, таких как Ташкент, Самарканд и Фергана, можно увидеть множество бродячих животных. Они сталкиваются с голодом, холодом, болезнями, а иногда и с жестоким обращением. Причинами такой ситуации являются: Отказ от домашних животных. Многие владельцы оставляют своих питомцев на улице, если те становятся обузой. Быстрое размножение. Отсутствие контроля за размножением животных приводит к увеличению их численности. Недостаток приютов. В большинстве регионов нет системных центров, которые бы могли приютить, вылечить и найти хозяев для животных.",
    },
    {
        id: 2,
        title: "Приюты для животных: текущая ситуация",
        content:
          "Приюты для животных в Узбекистане находятся на стадии становления. Пока их немного, и большинство из них организовано на добровольной основе. Вот основные особенности работы приютов: Частные приюты и инициативы. Частные приюты стали основным местом, где бездомные животные получают временное убежище. Наиболее известные приюты в стране: «Хаёт» (Ташкент): один из первых приютов, созданный волонтёрами. Здесь содержатся десятки кошек и собак, которым обеспечивают уход, лечение и помощь в пристройстве. «Доброе сердце»: организация, занимающаяся спасением животных из сложных ситуаций, таких как травмы или отравления. Местные инициативы. В регионах есть небольшие частные приюты, которые работают за счёт пожертвований и усилий местных волонтёров.",
    },
    {
        id: 3,
        title: "Проблемы, с которыми сталкиваются приюты",
        content:
          "Несмотря на положительные инициативы, приюты в Узбекистане сталкиваются с рядом трудностей: Недостаток финансирования. Частные приюты в основном зависят от пожертвований, которых часто не хватает для удовлетворения всех нужд животных. Малое количество мест. Большинство приютов может принять только ограниченное число животных. Это приводит к тому, что многим животным не удаётся получить помощь. Отсутствие государственной поддержки. Хотя власти начинают уделять внимание этой проблеме, пока приюты не получают систематической финансовой или материальной помощи. Бюрократия. Оформление документов для открытия приюта или проведения благотворительных акций может быть сложным и долгим процессом.",
    },
];

const Tech = () => {
  return (
    <div className={s.newsPage}>
      <h1 className={s.title}>Приюты - Проблемы</h1>
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

export default Tech;
