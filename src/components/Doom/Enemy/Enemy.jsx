import React from "react";
import "./Enemy.scss";

function Enemy({ position }) {
  return (
    <div
      className="enemy"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      <img src="/enemy.jpg" alt="Enemy" className="enemy-image" />
    </div>
  );
}

export default Enemy;
