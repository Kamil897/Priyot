import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import s from "./Shop.module.scss";

const Shop = ({ prefix }) => {
  const { user, spendPoints } = useUser();

  const handleConfirmPurchase = () => {
    if (spendPoints(prefix.price)) {
      alert(`Покупка "${prefix.name}" успешно завершена!`);
      setIsFormVisible(false);
    } else {
      alert("Недостаточно баллов для покупки.");
    }
  };

  return (
    <div className={s.prefixCard}>
        <img src={prefix.image} alt="img" className={s.cardPhoto} />
      <div className={s.cardHeader}>
        <h3>{prefix.name}</h3>
        <p>{prefix.description}</p>
      </div>
      <div className={s.cardBody}>
        <p>
          Цена: <span className={s.price}>{prefix.price} €</span>
        </p>
        <button
          onClick={handleConfirmPurchase}
          disabled={user.points < prefix.price}
          className={s.buyButton}
        >
          Купить
        </button>
      </div>
    </div>
  );
};

export default Shop;
