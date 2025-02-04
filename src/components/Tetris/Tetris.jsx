import React, { useState, useEffect, useRef } from 'react';
import './Tetris.scss';

const Tetris = () => {
  const canvasRef = useRef(null);
  const [unitSize, setUnitSize] = useState(20);
  const [grid, setGrid] = useState([]);
  const [currentPiece, setCurrentPiece] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const ROWS = 20;
  const COLS = 10;

  const shapes = {
    I: [
      [1, 1, 1, 1],
    ],
    O: [
      [1, 1],
      [1, 1],
    ],
    T: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    L: [
      [1, 0],
      [1, 0],
      [1, 1],
    ],
    Z: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  };

  const randomShape = () => {
    const keys = Object.keys(shapes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return shapes[randomKey];
  };

  const createGrid = () => {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  };

  const calculateBounds = () => {
    const bodyWidth = document.documentElement.clientWidth;
    const bodyHeight = document.documentElement.clientHeight;

    const newUnitW = (bodyWidth - (bodyWidth % 80)) / 16;
    const newUnitH = (bodyHeight - (bodyHeight % 100)) / 20;
    const newUnitMin = Math.max(Math.min(newUnitW, newUnitH), 20);

    setUnitSize(newUnitMin);

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = bodyWidth;
      canvas.height = bodyHeight;
    }
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgb(19, 21, 25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid
      grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            ctx.fillStyle = 'rgb(28, 30, 34)';
            ctx.fillRect(
              colIndex * unitSize,
              rowIndex * unitSize,
              unitSize,
              unitSize
            );
          }
        });
      });

      // Draw current piece
      if (currentPiece) {
        const { shape, x, y } = currentPiece;
        shape.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            if (cell) {
              ctx.fillStyle = 'rgb(255, 165, 0)';
              ctx.fillRect(
                (x + colIndex) * unitSize,
                (y + rowIndex) * unitSize,
                unitSize,
                unitSize
              );
            }
          });
        });
      }
    }
  };

  const movePiece = (dx, dy) => {
    if (!currentPiece) return;

    const { shape, x, y } = currentPiece;
    const newX = x + dx;
    const newY = y + dy;

    // Check collision
    const isValid = shape.every((row, rowIndex) => {
      return row.every((cell, colIndex) => {
        if (!cell) return true;
        const newRow = newY + rowIndex;
        const newCol = newX + colIndex;
        return (
          newRow >= 0 &&
          newRow < ROWS &&
          newCol >= 0 &&
          newCol < COLS &&
          grid[newRow][newCol] === 0
        );
      });
    });

    if (isValid) {
      setCurrentPiece({ ...currentPiece, x: newX, y: newY });
    } else if (dy > 0) {
      // Lock piece in place if moving down fails
      const newGrid = grid.map((row) => row.slice());
      shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          if (cell) {
            const newRow = y + rowIndex;
            const newCol = x + colIndex;
            newGrid[newRow][newCol] = 1;
          }
        });
      });
      setGrid(newGrid);
      spawnPiece();
    }
  };

  const spawnPiece = () => {
    const newPiece = {
      shape: randomShape(),
      x: Math.floor(COLS / 2) - 1,
      y: 0,
    };
    setCurrentPiece(newPiece);
  };

  const handleKeyDown = (e) => {
    if (gameOver) return;

    switch (e.key) {
      case 'ArrowLeft':
        movePiece(-1, 0);
        break;
      case 'ArrowRight':
        movePiece(1, 0);
        break;
      case 'ArrowDown':
        movePiece(0, 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    calculateBounds();
    setGrid(createGrid());
    spawnPiece();
    window.addEventListener('resize', calculateBounds);
    window.addEventListener('keydown', handleKeyDown);

    const interval = setInterval(() => {
      movePiece(0, 1);
    }, 500);

    return () => {
      window.removeEventListener('resize', calculateBounds);
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    draw();
  }, [grid, currentPiece, unitSize]);

  return (
    <div className="Tetris">
      {gameOver && <div className="GameOver">Game Over</div>}
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      ></canvas>
    </div>
  );
};

export default Tetris;
