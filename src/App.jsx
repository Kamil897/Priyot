import React, { lazy, Suspense, useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PreLoader from './components/PreLoader/PreLoader';
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import('./pages/Home'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage/NotFoundPage'));
const AnimalsHero = lazy(() => import('./components/AnimalsHero/AnimalsHero'));
const ShelterHero = lazy(() => import('./components/ShelterHero/ShelterHero'));
const Society = lazy(() => import('./components/Society/Society'));
const Tech = lazy(() => import('./components/Tech/Tech'));
const Culture = lazy(() => import('./components/Culture/Culture'));
const Register = lazy(() => import('./pages/Register'));
const Log = lazy(() => import('./pages/Log'));
const Personal = lazy(() => import('./pages/Personal'));
const EditProfile = lazy(() => import('./components/EditProfile/Edit'));
const TicTacToe = lazy(() => import('./components/TicTacToe/TicTacToe'));
const Snake = lazy(() => import('./components/Snake/Snake'));
const FlappyBird = lazy(() => import('./components/FlappyBird/FlappyBird'));
const Games = lazy(() => import('./components/Games/Games'));
const Tir = lazy(() => import('./components/Tir/Tir'));
const Magaz = lazy(() => import('./pages/magaz'));

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isNotFoundPage = !["/", "/Shelter", "/Register", "/Login", "/MainPage", "/Animals", "/Society", "/Tech", "/Culture", "/TicTacToe", "/Snake", "/flappybird", "/Games", "/Tetris", "/Tir", "/Shop"].includes(location.pathname);

  return (
    <>
      {loading && <PreLoader />}
      {!isNotFoundPage && <Header />}
      <Suspense fallback={<PreLoader />}>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/Shelter" element={<ShelterHero />} />
          <Route path="/Animals" element={<AnimalsHero />} />
          <Route path="/Society" element={<Society />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Log />} />
          <Route path="/MainPage" element={<Personal />} />
          <Route path="/edit" element={<EditProfile />} />
          <Route path="/Tech" element={<Tech />} />
          <Route path="/Culture" element={<Culture />} />
          <Route path="/TicTacToe" element={<TicTacToe />} />
          <Route path="/Snake" element={<Snake />} />
          <Route path="/flappybird" element={<FlappyBird />} />
          <Route path="/Games" element={<Games />} />
          <Route path="/Tir" element={<Tir />} />
          <Route path="/Shop" element={<Magaz />} />
        </Routes>
      </Suspense>
      {!isNotFoundPage && <Footer />}
      <Analytics />
    </>
  );
};

export default App;
