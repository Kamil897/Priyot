import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./MusicPlayer.css";

const tracks = [
  {
    name: "Stan",
    artist: "Eminem, Dido",
    cover: "/images/Stan.jpg",
    source: "/music/Stan.mp3",
  },
  {
    name: "Like Him (feat. Lola Young)",
    artist: "Tyler, The Creator CHROMAKOPIA",
    cover: "/images/Tyler.jpg",
    source: "/music/Tyler.mp3",
  },
];

const MusicPlayer = ({ isFixed = false }) => {
  const location = useLocation();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const audioRef = useRef(new Audio());

  const currentTrack = tracks[currentTrackIndex];

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
  };

  const updateProgress = () => {
    if (!audioRef.current.duration) return;

    const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setBarWidth(`${progress}%`);

    const curMinutes = Math.floor(audioRef.current.currentTime / 60);
    const curSeconds = Math.floor(audioRef.current.currentTime % 60);
    const durMinutes = Math.floor(audioRef.current.duration / 60);
    const durSeconds = Math.floor(audioRef.current.duration % 60);

    setCurrentTime(
      `${curMinutes < 10 ? "0" : ""}${curMinutes}:${curSeconds < 10 ? "0" : ""}${curSeconds}`
    );
    setDuration(
      `${durMinutes < 10 ? "0" : ""}${durMinutes}:${durSeconds < 10 ? "0" : ""}${durSeconds}`
    );
  };

  useEffect(() => {
    const audio = audioRef.current;
    audio.pause();
    audio.src = currentTrack.source;
    audio.load();

    if (isPlaying) {
      audio.play();
    }

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", nextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", nextTrack);
    };
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className={`player-music ${isFixed ? "player--fixed" : ""}`}>
      <div className="player-cover">
        <img
          src={currentTrack.cover}
          alt={currentTrack.name}
          className="player-cover__img"
          onError={(e) => (e.target.src = "/images/default-cover.jpg")}
        />
      </div>

      <div className="album-info">
        {isFixed ? (
          <p className="album-info__playing-now">
            Сейчас играет: {currentTrack.name} - {currentTrack.artist}
          </p>
        ) : (
          <>
            <h2 className="album-info__name">{currentTrack.name}</h2>
            <p className="album-info__track">{currentTrack.artist}</p>
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
            if (audioRef.current.duration) {
              audioRef.current.currentTime = percentage * audioRef.current.duration;
            }
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
