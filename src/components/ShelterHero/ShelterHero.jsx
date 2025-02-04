import React from 'react';
import s from './ShelterHero.module.scss';
import ShelterCard from '../ShelterCard/ShelterCard';

const ShelterHero = () => {
  return (
    <section className={s.teacher}>
      <div className={s.container__main}>
        <div className={s.teacher__wrapper}>
        
          <div className={s.teacher__cards}>
              <ShelterCard/>
          </div>
        </div>
      </div>
      <section className={s.volunteer} id="volunteer">
        <h2>Стать волонтером</h2>
        <p>Хотите помочь приютам? Присоединяйтесь к нашей команде волонтеров!</p>
        <a className={s.submit_button} href="https://docs.google.com/forms/d/e/1FAIpQLSfiM36EBnX6GWD_S8Vx6I2LJEJwrgMi6-81jEyKMBg2Kr9LwQ/viewform?usp=header" target="_blank" rel="noopener noreferrer">Подать заявку</a>
      </section>
    </section>
  );
};

export default ShelterHero;
