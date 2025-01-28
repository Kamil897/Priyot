import s from './AnimalsText.module.scss'

const NewsText = ({
   p, 
   ImgSrc,
}) => {
  return (
         <div className={s.news}>
            <div className={s.newstext}>
               <p>{p}</p>
            </div>
            
            <div className={s.newslogo}>
               <img src={ImgSrc} alt="" />
            </div>
         </div>
  )
}

export default NewsText
