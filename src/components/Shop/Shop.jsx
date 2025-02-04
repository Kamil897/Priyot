import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import s from "./Shop.module.scss";

const Shop = ({ prefix }) => {
  const { user, spendPoints } = useUser();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
    setCardNumber("");
    setError("");
  };

  const handleConfirmPurchase = () => {
    if (!/^\\d{16}$/.test(cardNumber)) {
      setError("Введите корректный номер карты из 16 цифр.");
      return;
    }

    if (spendPoints(prefix.price)) {
      alert(`Покупка "${prefix.name}" успешно завершена!`);
      setIsFormVisible(false);
    } else {
      alert("Недостаточно баллов для покупки.");
    }
  };

  return (
    <div className={s.prefixCard}>
      <div className={s.cardHeader}>
        <img src={prefix.image} alt="img" className={s.cardPhoto} />
        <h3>{prefix.name}</h3>
        <p>{prefix.description}</p>
      </div>
      <div className={s.cardBody}>
        <p>
          Цена: <span className={s.price}>{prefix.price} €</span>
        </p>
        <button
          onClick={toggleForm}
          disabled={user.points < prefix.price}
          className={s.buyButton}
        >
          {isFormVisible ? "Скрыть форму" : "Купить"}
        </button>
      </div>

      {isFormVisible && (
        <div className={s.purchaseForm}>
          <h4>Подтверждение покупки</h4>
          <p>
            Вы покупаете: <strong>{prefix.name}</strong>
          </p>
          <p>Цена: {prefix.price} €</p>
          <input
            type="text"
            placeholder="Введите номер карты"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={16}
            className={s.input}
          />
          {error && <p className={s.error}>{error}</p>}
          <div className={s.buttonGroup}>
            <button className={s.confirmButton} onClick={handleConfirmPurchase}>
              Подтвердить
            </button>
            <button className={s.cancelButton} onClick={toggleForm}>
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
