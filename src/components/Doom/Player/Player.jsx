import React from "react";
import "./Player.scss";

function Player({ position, weapon  }) {
  return (
    <div
      className="player"
      style={{
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: "70px",
        height: "55px",
        transition: "left 0.1s, top 0.1s",  // Плавное движение
      }}
    >
          <div className="weapon"
              style={{
                  position: "absolute",
                  bottom: "5px", // Размещение оружия внизу игрока
                  left: "50%", // Центрируем оружие относительно игрока
                  transform: "translateX(-50%)", // Центрируем оружие
                  width: weapon === "pistol" ? "20px" : "0", // Размеры оружия
                  height: weapon === "pistol" ? "30px" : "0", // Можно добавить другие виды оружия
                  backgroundColor: "gray", // Цвет оружия
              }}
          ></div>
      <img src="/doom.png" alt="Player" className="player-image" />
    </div>
    
  );
}

export default Player;
