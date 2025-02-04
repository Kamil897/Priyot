import s from './AboutUs.module.scss';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className={s.aboutUs}>
      <h2 className={s.title}>О нас</h2>
      <p className={s.description}>
        Мы – команда неравнодушных людей, которая стремится помочь бездомным животным в Ташкенте. 
        Наш сайт создан, чтобы объединить усилия тех, кто готов помочь: будь то волонтерство, 
        материальная поддержка или поиск нового дома для животных.

        Наша цель – сделать мир лучше для братьев наших меньших, предоставляя информацию о приютах, 
        проводимых мероприятиях и способах участия. Вместе мы можем спасти больше жизней и подарить 
        животным шанс на счастливую жизнь!
      </p>
      <Link to='/Tree' className={s.button}>
        Поддержать
      </Link>
    </div>
  );
};

export default AboutUs;
