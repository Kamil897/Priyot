// Bullet.jsx
import React from "react";

function Bullet({ position }) {
    return (
        <div
            className="bullet"
            style={{
                position: "absolute",
                left: `${position.x}%`,
                top: `${position.y}%`,
                width: "5px", // Размер пули
                height: "10px", // Высота пули
                backgroundColor: "red", // Цвет пули
                borderRadius: "50%", // Округлость пули
                transform: `translate(-50%, -50%)`, // Центрируем пулю относительно её позиции
            }}
        ></div>
    );
}

export default Bullet;
