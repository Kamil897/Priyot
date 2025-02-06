import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./MusicPlayer.css";

const tracks = [
  {
    name: "Stan",
    artist: "Eminem, Dido",
    cover: process.env.PUBLIC_URL +  "/images/Stan.jpg",
    source: process.env.PUBLIC_URL +  "/music/Stan.mp3",
  },
  {
    name: "She Said Shes From The Islands",
    artist: "Tomo Frozy",
    cover: process.env.PUBLIC_URL +  "/images/Island.jpg",
    source: process.env.PUBLIC_URL +  "/music/She_Said_Shes_From_The_Islands.mp3",
  },
  {
    name: "Promise to Myself",
    artist: "Matt Heath",
    cover: process.env.PUBLIC_URL +  "/images/Myself.jpg",
    source: process.env.PUBLIC_URL +  "/music/Matt_Heath.mp3",
  },
  {
    name: "Just The Two Of Us ",
    artist: "Grover Washington, Jr.",
    cover: process.env.PUBLIC_URL +  "/images/Grover_Washington.jpg",
    source: process.env.PUBLIC_URL +  "/music/Grover_Washington.mp3",

  },
  {
    name: "Headlock (Immis Radio Mix)",
    artist: "Imogen Heap",
    cover: process.env.PUBLIC_URL +  "/images/Imogen_Heap.jpg",
    source: process.env.PUBLIC_URL +  "/music/Imogen-Heap.mp3",
  },
  {
    name: "Je Reve",
    artist: "La Meprise",
    cover: process.env.PUBLIC_URL +  "/images/Je_Reve.jpg",
    source: process.env.PUBLIC_URL +  "/music/Je_Reve.mp3",
  },
  {
    name: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    cover: process.env.PUBLIC_URL +  "/images/LadyGaga_BrunoMars_.jpg",
    source: process.env.PUBLIC_URL +  "/music/Lady_Gaga_Bruno_Mars.mp3",
  },
  {
    name: "Одно и тоже",
    artist: "iowa",
    cover: process.env.PUBLIC_URL +  "/images/odno.jpg",
    source: process.env.PUBLIC_URL +  "/music/odno_i_toje.mp3",
  },
  {
    name: "90",
    artist: "Pompeya",
    cover: process.env.PUBLIC_URL +  "/images/Hotel.jpg",
    source: process.env.PUBLIC_URL +  "/music/Pompeya.mp3",
  },
  {
    name: "Like Him (feat. Lola Young)",
    artist: "Tyler, The Creator CHROMAKOPIA",
    cover: process.env.PUBLIC_URL +  "/images/Tyler.jpg",
    source: process.env.PUBLIC_URL +  "/music/Tyler.mp3",
  },
  {
    name: "Fly me to the moon Squid game",
    artist: "Joo Won",
    cover: process.env.PUBLIC_URL +  "/images/Squid.jpg",
    source: process.env.PUBLIC_URL +  "/music/Squid_game.mp3",
  },
];


const formatTime = (time) => {
  if (isNaN(time)) return "00:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const MusicPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const audioRef = useRef(new Audio(tracks[currentTrackIndex].source));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = tracks[currentTrackIndex].source;

    const updateMetadata = () => {
      setDuration(formatTime(audio.duration));
    };

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
      setCurrentTime(formatTime(audio.currentTime));
    };

    const handleTrackEnd = () => {
      nextTrack();
    };

    audio.addEventListener("loadedmetadata", updateMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleTrackEnd);

    return () => {
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [currentTrackIndex]);

  const playPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .catch((error) => console.error("Ошибка воспроизведения:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex - 1 < 0 ? tracks.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const seek = (event) => {
    const rect = event.target.getBoundingClientRect();
    const percentage = (event.clientX - rect.left) / rect.width;
    const audio = audioRef.current;
    audio.currentTime = percentage * audio.duration;
  };

  return (
    <div className="music-player">
      <audio ref={audioRef} />

      <div className="player-cover">
        <img
          src={tracks[currentTrackIndex].cover}
          alt={tracks[currentTrackIndex].name}
          className="player-cover__img"
        />
      </div>

      <div className="album-info">
        <h2 className="album-info__name">{tracks[currentTrackIndex].name}</h2>
        <p className="album-info__artist">{tracks[currentTrackIndex].artist}</p>
      </div>

      <div className="progress-bar" onClick={seek}>
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="time-info">
        <span>{currentTime}</span> / <span>{duration}</span>
      </div>

      <div className="player-controls">
        <button className="player-controls__item" onClick={prevTrack}>
            <img src="./Shape2-removebg-preview.png" alt="Previous" className="player-controls__icon" />
          </button>
          <button onClick={playPause}>{isPlaying ? "⏸️" : "▶️"}</button>
      </div>
    </div>
  );
};

export default MusicPlayer;

