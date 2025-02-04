import React, { useState, useEffect, useRef } from 'react';
// import './Doom.scss';

const Doom = () => {
  const canvasRef = useRef(null);
  const [player, setPlayer] = useState({ x: 100, y: 100, angle: 0, health: 100 });
  const [keys, setKeys] = useState({});
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([
    { x: 300, y: 300, health: 50, direction: 1 },
    { x: 500, y: 500, health: 50, direction: -1 },
  ]);
  const [isShooting, setIsShooting] = useState(false);

  const TILE_SIZE = 64;
  const FOV = Math.PI / 3;
  const NUM_RAYS = 300;
  const MAX_DEPTH = 600;
  const CANVAS_WIDTH = window.innerWidth;
  const CANVAS_HEIGHT = window.innerHeight;
  const SPEED = 3;
  const ROTATION_SPEED = 0.05;
  const BULLET_SPEED = 10;

  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  const handleKeyDown = (e) => {
    setKeys((prev) => ({ ...prev, [e.key]: true }));
    if (e.key === ' ') shootBullet();
  };

  const handleKeyUp = (e) => {
    setKeys((prev) => ({ ...prev, [e.key]: false }));
  };

  const movePlayer = () => {
    setPlayer((prev) => {
      let { x, y, angle } = prev;

      if (keys['ArrowUp']) {
        const newX = x + Math.cos(angle) * SPEED;
        const newY = y + Math.sin(angle) * SPEED;
        if (map[Math.floor(newY / TILE_SIZE)][Math.floor(newX / TILE_SIZE)] === 0) {
          x = newX;
          y = newY;
        }
      }
      if (keys['ArrowDown']) {
        const newX = x - Math.cos(angle) * SPEED;
        const newY = y - Math.sin(angle) * SPEED;
        if (map[Math.floor(newY / TILE_SIZE)][Math.floor(newX / TILE_SIZE)] === 0) {
          x = newX;
          y = newY;
        }
      }
      if (keys['ArrowLeft']) angle -= ROTATION_SPEED;
      if (keys['ArrowRight']) angle += ROTATION_SPEED;

      return { ...prev, x, y, angle };
    });
  };

  const moveEnemies = () => {
    setEnemies((prevEnemies) =>
      prevEnemies.map((enemy) => {
        const direction = Math.random() > 0.5 ? 1 : -1;
        const newX = enemy.x + direction * 2;
        const newY = enemy.y + direction * 2;

        if (
          map[Math.floor(newY / TILE_SIZE)][Math.floor(newX / TILE_SIZE)] === 0 &&
          Math.hypot(player.x - newX, player.y - newY) > 50
        ) {
          return { ...enemy, x: newX, y: newY };
        }
        return enemy;
      })
    );
  };

  const shootBullet = () => {
    if (!isShooting) {
      setIsShooting(true);
      setBullets((prev) => [
        ...prev,
        { x: player.x, y: player.y, angle: player.angle },
      ]);
      setTimeout(() => setIsShooting(false), 200);
    }
  };

  const updateBullets = () => {
    setBullets((prevBullets) =>
      prevBullets
        .map((bullet) => {
          const newX = bullet.x + Math.cos(bullet.angle) * BULLET_SPEED;
          const newY = bullet.y + Math.sin(bullet.angle) * BULLET_SPEED;
          return { ...bullet, x: newX, y: newY };
        })
        .filter(
          (bullet) =>
            map[Math.floor(bullet.y / TILE_SIZE)][Math.floor(bullet.x / TILE_SIZE)] === 0
        )
    );
  };

  const checkCollisions = () => {
    setEnemies((prevEnemies) =>
      prevEnemies.filter((enemy) => {
        const hit = bullets.some(
          (bullet) => Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y) < 20
        );
        if (hit) {
          return false;
        }
        return true;
      })
    );
  };

  const castRays = (ctx) => {
    const { x: px, y: py, angle } = player;
    const rayAngleStep = FOV / NUM_RAYS;
    let rayAngle = angle - FOV / 2;

    for (let i = 0; i < NUM_RAYS; i++) {
      let distanceToWall = 0;
      let hitWall = false;

      const dx = Math.cos(rayAngle);
      const dy = Math.sin(rayAngle);

      while (!hitWall && distanceToWall < MAX_DEPTH) {
        distanceToWall += 1;
        const testX = Math.floor((px + dx * distanceToWall) / TILE_SIZE);
        const testY = Math.floor((py + dy * distanceToWall) / TILE_SIZE);

        if (map[testY]?.[testX] === 1) {
          hitWall = true;
        }
      }

      const lineHeight = Math.min(CANVAS_HEIGHT / distanceToWall, CANVAS_HEIGHT / 2);
      const shade = Math.max(0, 255 - distanceToWall * 0.5);
      ctx.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
      ctx.fillRect(
        i * (CANVAS_WIDTH / NUM_RAYS),
        CANVAS_HEIGHT / 2 - lineHeight / 2,
        CANVAS_WIDTH / NUM_RAYS,
        lineHeight
      );

      rayAngle += rayAngleStep;
    }
  };

  const drawScene = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

    castRays(ctx);

    enemies.forEach((enemy) => {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(enemy.x, enemy.y, 20, 0, Math.PI * 2);
      ctx.fill();
    });

    bullets.forEach((bullet) => {
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = 'gray';
    ctx.fillRect(CANVAS_WIDTH / 2 - 10, CANVAS_HEIGHT / 2 - 2, 20, 4); // Crosshair

    ctx.fillStyle = 'black';
    ctx.fillRect(CANVAS_WIDTH / 2 - 50, CANVAS_HEIGHT - 100, 100, 50); // Gun
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      movePlayer();
      moveEnemies();
      updateBullets();
      checkCollisions();
      drawScene();
    }, 1000 / 60);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      document.body.style.overflow = 'auto';
    };
  }, [player, keys, bullets, enemies]);

  return <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />;
};

export default Doom;
