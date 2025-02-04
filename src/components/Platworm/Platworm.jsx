import React, { useEffect, useRef, useState } from "react";
import "./Platworm.css";

const Platworm = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [menuVisible, setMenuVisible] = useState(true);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return; // Проверяем, что canvas существует
    const ctx = canvas.getContext("2d");

    // Загрузка изображений
    const platformImage = new Image();
    platformImage.src = "/platform.png";
    const peopleImage = new Image();
    peopleImage.src = "/people.png";
    const monsterImage = new Image();
    monsterImage.src = "/monster.png";

    let platform = { x: 200, y: 450, width: 100, height: 20 };
    let people = { x: 160, y: 200, width: 40, height: 40, dx: 3, dy: 3 };
    let monsters = [];
    let moveLeft = false;
    let moveRight = false;

    const initializeMonsters = () => {
      const startX = 5;
      const startY = 5;
      const rows = 3;
      const cols = 9;
      monsters = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - row; col++) {
          const x = startX + col * 55 + row * 27.5;
          const y = startY + row * 55;
          monsters.push({ x, y, width: 50, height: 50 });
        }
      }
    };

    const drawImage = (image, x, y, width, height) => {
      if (image.complete) {
        ctx.drawImage(image, x, y, width, height);
      }
    };

    const checkCollision = (rect1, rect2) => {
      return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
      );
    };

    const gameLoop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Рисуем персонажа, платформу и монстров
      drawImage(peopleImage, people.x, people.y, people.width, people.height);
      drawImage(
        platformImage,
        platform.x,
        platform.y,
        platform.width,
        platform.height
      );

      monsters.forEach((monster, index) => {
        drawImage(
          monsterImage,
          monster.x,
          monster.y,
          monster.width,
          monster.height
        );
        if (checkCollision(people, monster)) {
          monsters.splice(index, 1);
          people.dy *= -1;
        }
      });

      if (people.y > platform.y + 20) {
        setGameOver(true);
        return;
      }

      if (people.x < 0 || people.x + people.width > canvas.width) {
        people.dx *= -1;
      }

      if (people.y < 0 || checkCollision(people, platform)) {
        people.dy *= -1;
      }

      if (monsters.length === 0) {
        setWin(true);
        setGameOver(true);
        return;
      }

      if (moveLeft && platform.x > 0) {
        platform.x -= 5;
      }
      if (moveRight && platform.x < canvas.width - platform.width) {
        platform.x += 5;
      }

      people.x += people.dx;
      people.y += people.dy;

      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      }
    };

    const startGame = () => {
      setMenuVisible(false);
      setGameOver(false);
      setWin(false);
      people = { x: 160, y: 200, width: 40, height: 40, dx: 3, dy: 3 };
      platform = { x: 200, y: 450, width: 100, height: 20 };
      initializeMonsters();
      requestAnimationFrame(gameLoop);
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") moveLeft = true;
      if (e.key === "ArrowRight") moveRight = true;
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") moveLeft = false;
      if (e.key === "ArrowRight") moveRight = false;
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    initializeMonsters();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  return (
    <div className="game-container">
      {menuVisible || gameOver ? (
        <div className="menu">
          {gameOver && <h1>{win ? "You Win!" : "Game Over"}</h1>}
          <button onClick={() => startGame()}>Play {gameOver ? "Again" : ""}</button>
        </div>
      ) : (
        <canvas ref={canvasRef} width={500} height={500}></canvas>
      )}
    </div>
  );
};

export default Platworm;
