import React from "react";
import Shop from "../components/Shop/Shop";
import { useUser } from "../Context/UserContext";
import s from './magaz.module.scss'

const prefixes = [
  { 
    id: 1, 
    name: "Сухой корм для кошек", 
    description: "Полноценный сбалансированный корм для взрослых кошек.", 
    image: "https://petzoo.uz/images/ab__webp/thumbnails/240/290/detailed/4/ImageRequest-75_jpg.webp",
    price: 1200 
  },
  { 
    id: 2, 
    name: "Сухой корм для собак", 
    description: "Высококачественный корм для собак всех пород.", 
    image: "https://api.zapovednik96.ru/upload/iblock/7c0/7c003b7dc5f4c9b095e3027060846256.jpg",
    price: 1500 
  },
  { 
    id: 3, 
    name: "Мяч для собак", 
    image: "https://basket-13.wbbasket.ru/vol2010/part201068/201068688/images/big/1.webp",
    description: "Прочная резиновая игрушка для игр с питомцем.", 
    price: 500 
  },
  { 
    id: 4, 
    name: "Мышка-игрушка для кошек", 
    description: "Интерактивная игрушка для развлечения кошек.", 
    image: "https://basket-12.wbbasket.ru/vol1898/part189844/189844130/images/big/1.webp",
    price: 300 
  },
  { 
    id: 5, 
    name: "Наполнитель для кошачьего туалета", 
    description: "Гигиенический наполнитель с высокой впитывающей способностью.",
    image: "https://petzoo.uz/images/ab__webp/thumbnails/240/290/detailed/7/perfect_carbon_600-725_rcf1-7m_jpg.webp", 
    price: 800 
  },
  { 
    id: 6, 
    name: "Поводок для собак", 
    description: "Удобный поводок с мягкой ручкой для прогулок.",
    image: "https://frankfurt.apollo.olxcdn.com/v1/files/y5h98hwu2jzm1-UZ/image;s=1000x700", 
    price: 1000 
  },
  { 
    id: 7, 
    name: "Лежанка для кошек", 
    description: "Мягкое и уютное место для отдыха вашего питомца.", 
    image: "https://petzoo.uz/images/thumbnails/570/570/detailed/6/originals_PHO_PRO_CLIP_PHO_PRO_CLIP_44448-1__SALL__AWK__V1.jpg",
    price: 2500 
  },
  { 
    id: 8, 
    name: "Игрушка-перетяжка для собак", 
    description: "Прочная игрушка для активных игр и тренировок.",
    image: "https://ir.ozone.ru/s3/multimedia-o/wc1000/6309605532.jpg", 
    price: 700 
  },
  { 
    id: 9, 
    name: "Шарик с перьями для кошек", 
    description: "Веселая игрушка, которая стимулирует охотничий инстинкт.", 
    image: "https://charley.uz/thumb/2/Dmx1ngQRlAmyNowRSumC5Q/r/d/1120960.jpg",
    price: 400 
  },
  { 
    id: 10, 
    name: "Лакомства для собак", 
    description: "Натуральные лакомства для поощрения и радости.",
    image: "https://petzoo.uz/images/thumbnails/570/570/detailed/6/originals_PHO_PRO_CLIP_PHO_PRO_CLIP_31322-1__SALL__AWK__V1__1_.jpg",    
    price: 600 
  },
  {
    id: 11,
    name: "Интерактивный мяч с пищалкой",
    description: "Забавная игрушка, которая издает звук при игре.",
    image: "https://ir.ozone.ru/s3/multimedia-1-r/wc1000/7144139583.jpg",
    price: 750
  },
  {
    id: 12,
    name: "Лазерная указка для кошек",
    description: "Веселая и активная игра с лазерной точкой.",
    image: "https://avatars.mds.yandex.net/i?id=80918d15f6453128721378ac9037b54e_l-10599899-images-thumbs&n=13",
    price: 450
  }
];



const Magaz = () => {
  const { user } = useUser();

  return (
    <div className={s.toys_title}>
      <header className={s.header_toys}>
        <h1>Магазин игрушек</h1>
      </header>
      <h2>У вас есть {user.points} евро</h2>
      <div className={s.prefix_list}>
        {prefixes.map((prefix) => (
          <Shop key={prefix.id} prefix={prefix} />
        ))}
      </div>
    </div>
  );
};

export default Magaz;
