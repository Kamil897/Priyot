
import React from 'react';
import s from './Games.module.scss';
import { Link } from 'react-router-dom';

const games = [
  { id: 1, name: 'Flappy Bird', description: 'Забытая игра.', link: '/flappybird' },
  { id: 2, name: 'Snake', description: 'Змейка.', link: '/Snake' },
  { id: 3, name: 'Tic Tac', description: 'Крестики-Нолики.', link: '/TicTacToe' },
  { id: 4, name: 'Тир?', description: 'Убей шайтанов', link: '/Tir' },
  { id: 5, name: 'Пинг-понг', description: 'Скоро в игре', link: null },
  { id: 6, name: 'Tetris', description: 'Скоро в игре.', link: null },
  { id: 7, name: 'Packman', description: 'Скоро в игре.', link: null },
  { id: 8, name: 'Doom', description: 'Скоро в игре.', link: null },
];

const Games = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>Игры</h1>
      <div className={s.gamesGrid}>
        {games.map((game) => (
          <div key={game.id} className={s.gameCard}>
            <h2 className={s.gameTitle}>{game.name}</h2>
            <p className={s.gameDescription}>{game.description}</p>
            {game.link ? (
              <Link to={game.link} className={s.playLink}>
                <button className={s.playButton}>Играть</button>
              </Link>
            ) : (
              <button className={s.disabledButton} disabled>Скоро</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
