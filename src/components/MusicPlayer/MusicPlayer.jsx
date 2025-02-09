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
  }
];

const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MusicPlayer = ({ isFixed = false }) => {
  const location = useLocation();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [barWidth, setBarWidth] = useState("0%");
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(tracks[currentTrackIndex].source);
    const audio = audioRef.current;

    const updateMetadata = () => setDuration(formatTime(audio.duration));
    const updateProgress = () => {
      setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      setCurrentTime(formatTime(audio.currentTime));
    };
    const handleTrackEnd = () => {
      nextTrack();
    };

    audio.addEventListener("loadedmetadata", updateMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleTrackEnd);

    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.pause();
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrackIndex]);

  const playPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  return (
    <div className={`player-music ${isFixed ? "player--fixed" : ""}`}>
      <div className="player-cover">
        <img src={tracks[currentTrackIndex].cover} alt={tracks[currentTrackIndex].name} className="player-cover__img" />
      </div>
      <div className="album-info">
        {isFixed ? (
          <p className="album-info__playing-now">Сейчас играет: {tracks[currentTrackIndex].name} - {tracks[currentTrackIndex].artist}</p>
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
            const percentage = (e.clientX - rect.left) / rect.width;
            if (audioRef.current) {
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
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="player-controls__icon"
            >
              <path d="M7 5v14M17 5v14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="player-controls__icon"
            >
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>

        <button className="player-controls__item" onClick={nextTrack}>
          <img src="./Shape.png" alt="Next" className="player-controls__icon" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
