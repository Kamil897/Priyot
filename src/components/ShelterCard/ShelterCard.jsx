import React from 'react'
import s from './ShelterCard.module.scss'
import { Link } from 'react-router-dom'

const ShelterCard = () => {
  return (
    <>
        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://www.instagram.com/miliy_dom_tashkent/?hl=ru">  
            <img className={s.teacher__img} src="/house1.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>
          </Link>

          <div className={s.teacher__card__text}>
              <h3>Приют "Милый дом"</h3>
              <h4>Адрес: ул. Бабура, 69/3</h4>
              <h4>Телефон: Не указан</h4>
              <p className={s.card__text}>Этот приют занимается спасением кошек и собак, предоставляет медицинскую помощь и помогает найти новых хозяев.</p>
          </div>
        </div>

        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://vk.com/pawsofhope">  
            <img className={s.teacher__img} src="/house2.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>          
          </Link>

          <div className={s.teacher__card__text}>
              <h3> Центр помощи животным "Лапки Надежды" </h3>
              <h4>Адрес: Янгиюльский р-н, мсг Халкабад </h4>
              <h4>Телефон: +998 (90) 035-83-77</h4>
              <p className={s.card__text}> В центре работают волонтеры, которые активно помогают бездомным животным и проводят мероприятия по их социализации. </p>
          </div>
        </div>

        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://t.me/mehrvaoqibatuz">  
            <img className={s.teacher__img} src="/house3.png" alt=""/>
            <div className={s.teacher__btn__div}> 
            </div>          
          </Link>

          <div className={s.teacher__card__text}>
              <h3> Организация "Зоозащита Ташкента" </h3>
              <h4>Адрес:  Чиланзарский район, ул. Чапаната, 28А </h4>
              <h4>Телефон: +998 (94) 618-91-73</h4>
              <p className={s.card__text}> Здесь оказывают помощь животным, попавшим в сложные ситуации, проводят вакцинацию и стерилизацию. </p>
          </div>
        </div>

        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://instagram.com/gavcheg_tashkent">  
            <img className={s.teacher__img} src="/house4.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>          
          </Link>

          <div className={s.teacher__card__text}>
              <h3>Приют "Гавчег"</h3>
              <h4>Адрес: Ахангаранский район, садовые участки</h4>
              <h4>Телефон:+998 (95) 196-80-80</h4>
              <p className={s.card__text}> Этот приют активно сотрудничает с местными жителями для поиска новых домов для животных. </p>
          </div>
        </div>
        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://www.yellowpages.uz/kompaniya/dobrye-ruki">  
            <img className={s.teacher__img} src="/house5.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>          
          </Link>
          
          <div className={s.teacher__card__text}>
              <h3> Благотворительный фонд "В добрые руки" </h3>
              <h4>Адрес: Шайхантахурский район, м-в ДЖАНГОХ, ул. СЕБЗАР, 2</h4>
              <h4>Телефон: +998 (90) 045-53-31</h4>
              <p className={s.card__text}> Фонд занимается поддержкой и развитием приютов, а также проведением акций для привлечения внимания к проблемам бездомных животных. </p>
          </div>
        </div>
        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://hayotislife.uz/">  
            <img className={s.teacher__img} src="/house6.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>          
          </Link>

          <div className={s.teacher__card__text}>
              <h3>Приют для животных "Хаёт"</h3>
              <h4>Адрес: Зафарабад, Кибрайского района в 25 км от Ташкента</h4>
              <h4>Телефон:+998 (90) 357-44-77</h4>
              <p className={s.card__text}>Приют содержит более 3000 собак и активно ищет волонтёров и поддержку.</p>
          </div>
        </div>
        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://t.me/fourpaws_tashkent">  
            <img className={s.teacher__img} src="/house7.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>          
          </Link>

          <div className={s.teacher__card__text}>
              <h3>Приют для собак "Четыре лапы"</h3>
              <h4>Адрес: Пскентский р-н, хоз-во Х.Кадырова</h4>
              <h4>Телефон:+998 (95) 196-80-80</h4>
              <p className={s.card__text}> Работает круглосуточно и приветствует помощь от волонтёров и неравнодушных людей.</p>
          </div>
        </div>
        <div className={s.teacher__card}>
          <Link className={s.teacher__img__div} to="https://t.me/s/dayshans">  
            <img className={s.teacher__img} src="/house8.png" alt="" />
            <div className={s.teacher__btn__div}> 
            </div>         
          </Link>
          
          <div className={s.teacher__card__text}>
              <h3>Приют для собак "Дай Шанс"</h3>
              <h4>Адрес: Пскентский р-н, хоз-во Х.Кадырова</h4>
              <h4>Телефон:+998 (90) 908-38-12</h4>
              <p className={s.card__text}> Работает круглосуточно и приветствует помощь от волонтёров и неравнодушных людей.</p>
          </div>
        </div>
    </>
  )
}

export default ShelterCard
