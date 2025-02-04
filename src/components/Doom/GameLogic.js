let enemyId = 0;

export function spawnEnemy() {
  return {
    id: enemyId++,
    x: Math.random() * 90, // случайная позиция на поле
    y: Math.random() * 90,
  };
}

export function checkCollisions(playerPosition, enemies) {
  for (let enemy of enemies) {
    const distance = Math.sqrt(
      Math.pow(playerPosition.x - enemy.x, 2) + Math.pow(playerPosition.y - enemy.y, 2)
    );
    if (distance < 5) { // допустимое расстояние для столкновения
      return enemy;
    }
  }
  return null;
}


// GameLogic.js (или в другом месте, где у вас логика игры)
export const checkBulletCollisions = (bullets, enemies) => {
  return bullets.filter((bullet) => {
      return enemies.some((enemy) => {
          // Проверка, если пуля попала в врага
          return (
              bullet.position.x > enemy.x &&
              bullet.position.x < enemy.x + enemy.width &&
              bullet.position.y > enemy.y &&
              bullet.position.y < enemy.y + enemy.height
          );
      });
  });
};
