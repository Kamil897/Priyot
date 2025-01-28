// import React from 'react';
// import s from './NotFoundPage.module.scss'; 

// const NotFoundPage = () => {
//   return (
//    <div className={s.all}>

//     <div className={s.not_found}>
//       <div className={s.head}></div>
//       <div className={s.meta}></div>
//       <div className={s.meta}></div>
//       <div className={s.meta}></div>
//       <div className={s.message}>
//         <span>404</span>
//         <p>Got lost? How.....? Why.....? Ahhhh....</p>
//       </div>
//     </div>
//    </div>

//   );
// };

// export default NotFoundPage;
import React from "react";
import s from './NotFoundPage.module.scss';  

const NotFoundPage = () => {
  return (
    <div className={s.body}>
      <div className={s.head}>
        <div className={s.meta}></div>
        <div className={s.meta}></div>
        <div className={s.meta}></div>
      </div>
      <div className={s.m}>
      </div>
    </div>
  );
};

export default NotFoundPage;