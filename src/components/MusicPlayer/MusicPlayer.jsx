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
    name: "She Said Shes From The Islands",
    artist: "Tomo Frozy",
    cover: "/images/Island.jpg",
    source: "/music/She_Said_Shes_From_The_Islands.mp3",
  },
  {
    name: "Headlock (Immis Radio Mix)",
    artist: "Imogen Heap",
    cover: "/images/Imogen_Heap.jpg",
    source: "/music/Imogen-Heap.mp3",
  },
  {
    name: "Je Reve",
    artist: "La Meprise",
    cover: "/images/Je_Reve.jpg",
    source: "/music/Je_Reve.mp3",
  },
  {
    name: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    cover: "/images/LadyGaga_BrunoMars_.jpg",
    source: "/music/Lady_Gaga_Bruno_Mars.mp3",
  },
  {
    name: "Like Him (feat. Lola Young)",
    artist: "Tyler, The Creator CHROMAKOPIA",
    cover: "/images/Tyler.jpg",
    source: "/music/Tyler.mp3",
  },
  {
    name: "Fly me to the moon Squid game",
    artist: "Joo Won",
    cover: "/images/Squid.jpg",
    source: "/music/Squid_game.mp3",
  },
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

  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = tracks[currentTrackIndex].source;
    audio.load();

    const updateMetadata = () => setDuration(formatTime(audio.duration));
    const updateProgress = () => {
      setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      setCurrentTime(formatTime(audio.currentTime));
    };
    const handleTrackEnd = () => nextTrack();
    const handleError = () => console.error("Ошибка загрузки аудиофайла:", tracks[currentTrackIndex].source);

    audio.addEventListener("loadedmetadata", updateMetadata);
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleTrackEnd);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("loadedmetadata", updateMetadata);
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleTrackEnd);
      audio.removeEventListener("error", handleError);
      audio.pause();
    };
  }, [currentTrackIndex]);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);

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
        <div className="progress__bar" onClick={(e) => {
          const rect = e.target.getBoundingClientRect();
          const percentage = (e.clientX - rect.left) / rect.width;
          audioRef.current.currentTime = percentage * audioRef.current.duration;
        }}>
          <div className="progress__current" style={{ width: barWidth }}></div>
        </div>
        <div className="progress__time">
          <span>{currentTime}</span> / <span>{duration}</span>
        </div>
      </div>
      <div className="player-controls">
        <button className="player-controls__item" onClick={prevTrack}>
          <img src="/images/Shape2.png" alt="Previous" className="player-controls__icon" />
        </button>
        <button className="player-controls__item -xl" onClick={playPause}>
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button className="player-controls__item" onClick={nextTrack}>
          <img src="/images/Shape.png" alt="Next" className="player-controls__icon" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
