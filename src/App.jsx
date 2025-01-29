import React from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import AnimalsHero from './components/AnimalsHero/AnimalsHero';
import PreLoader from './components/PreLoader/PreLoader';
import ShelterHero from './components/ShelterHero/ShelterHero';
import Society from './components/Society/Society';
import Tech from './components/Tech/Tech';
import Culture from './components/Culture/Culture';
import Register from './pages/Register';
import Log from './pages/Log';
import Personal from './pages/Personal';
import EditProfile from './components/EditProfile/Edit';
import TicTacToe from './components/TicTacToe/TicTacToe.jsx';
import Snake from './components/Snake/Snake.jsx';
import FlappyBird from './components/FlappyBird/FlappyBird.jsx';
import Games from './components/Games/Games.jsx';
import Tir from './components/Tir/Tir.jsx';
import Magaz from './pages/magaz.jsx';
import { Analytics } from "@vercel/analytics/react";
// import Platworm from './components/Platworm/Platworm.jsx';

const App = () => {
  const location = useLocation();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  const isNotFoundPage = location.pathname !== '/' &&
                         location.pathname !== '/Shelter' &&
                         location.pathname !== '/Register' &&
                         location.pathname !== '/Login' &&
                         location.pathname !== '/MainPage' &&
                         location.pathname !== '/Animals' &&
                         location.pathname !== '/Society' &&
                         location.pathname !== '/Tech' &&
                         location.pathname !== '/Culture' &&
                         location.pathname !== '/TicTacToe' &&
                         location.pathname !== '/Snake' &&
                         location.pathname !== '/flappybird' &&
                         location.pathname !== '/Games' &&
                         location.pathname !== '/Tetris' &&
                         location.pathname !== '/Tir' &&
                        //  location.pathname !== '/Plarworm' &&
                         location.pathname !== '/Shop' ;

  return (
    <>
      {loading && <PreLoader />}

      {!isNotFoundPage && <Header />}

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
        {/* <Route path="/Platworm" element={<Platworm />} /> */}
        <Route path="/Shop" element={<Magaz />} />
      </Routes>

      {!isNotFoundPage && <Footer />}
      <Analytics />
      </>
  );
};

export default App;
