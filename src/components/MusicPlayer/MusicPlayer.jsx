import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; 
import "./MusicPlayer.css";

const tracks = [
  {
    name: "Stan",
    artist: "Eminem, Dido",
    cover: "/images/Stan.jpg",
    source: "/music/Stan.mp3",
    url: "https://youtu.be/nGcM8afe0F4",
    favorited: false,
  },
  {
    name: "Everybody Knows",
    artist: "Sigrid",
    cover: "/images/Liga.jpg",
    source: "/music/Everybody_Knows.mp3",
    url: "https://youtu.be/zrV5of2p-oc",
    favorited: false,
  },
  {
    name: "She Said Shes From The Islands",
    artist: "Tomo Frozy",
    cover: "/images/Island.jpg",
    source: "/music/She_Said_Shes_From_The_Islands.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  }
];

const MusicPlayer = ({ isFixed = false }) => {
  const location = useLocation(); 
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");

  const audioRef = useRef(new Audio(tracks[currentTrackIndex].source));

  useEffect(() => {
    // Обновляем источник трека
    audioRef.current.src = tracks[currentTrackIndex].source;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play();
    }

    const updateProgress = () => {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setBarWidth(`${progress}%`);

      const curMinutes = Math.floor(audioRef.current.currentTime / 60);
      const curSeconds = Math.floor(audioRef.current.currentTime % 60);
      const durMinutes = Math.floor(audioRef.current.duration / 60);
      const durSeconds = Math.floor(audioRef.current.duration % 60);

      setCurrentTime(`${curMinutes < 10 ? "0" : ""}${curMinutes}:${curSeconds < 10 ? "0" : ""}${curSeconds}`);
      setDuration(`${durMinutes < 10 ? "0" : ""}${durMinutes}:${durSeconds < 10 ? "0" : ""}${durSeconds}`);
    };

    const handleTrackEnd = () => {
      nextTrack();
      setIsPlaying(true);
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    audioRef.current.addEventListener("ended", handleTrackEnd);

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrackIndex, isPlaying]);

  const playPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!audioRef.current.paused);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setBarWidth("0%");
    setCurrentTime("00:00");
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setBarWidth("0%");
    setCurrentTime("00:00");
  };

  return (
    <div className={`player-music ${isFixed ? "player--fixed" : ""}`}>
      <div className="player-cover">
        <img src={tracks[currentTrackIndex].cover} alt={tracks[currentTrackIndex].name} className="player-cover__img" />
      </div>

      <div className="album-info">
        {isFixed ? (
          <p className="album-info__playing-now">
            Сейчас играет: {tracks[currentTrackIndex].name} - {tracks[currentTrackIndex].artist}
          </p>
        ) : (
          <>
            <h2 className="album-info__name">{tracks[currentTrackIndex].name}</h2>
            <p className="album-info__track">{tracks[currentTrackIndex].artist}</p>
          </>
        )}
      </div>

      <div className={`progress ${isFixed ? "progress_none" : ""}`}>
        <div
          className="progress__bar"
          onClick={(e) => {
            const rect = e.target.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const percentage = offsetX / rect.width;
            audioRef.current.currentTime = percentage * audioRef.current.duration;
          }}
        >
          <div className="progress__current" style={{ width: barWidth }}></div>
        </div>
        <div className="progress__time">
          <span>{currentTime}</span> / <span>{duration}</span>
        </div>
      </div>

      <div className="player-controls">
        <button className="player-controls__item" onClick={prevTrack}>
          <img src="./Shape2-removebg-preview.png" alt="Previous" className="player-controls__icon" />
        </button>
        <button className="player-controls__item -xl" onClick={playPause}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="player-controls__item" onClick={nextTrack}>
          <img src="./Shape.png" alt="Next" className="player-controls__icon" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
