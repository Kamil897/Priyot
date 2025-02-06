import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom"; // Импортируем useLocation
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
  },
  {
    name: "Promise to Myself",
    artist: "Matt Heath",
    cover: "/images/Myself.jpg",
    source: "/music/Matt_Heath.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Just The Two Of Us ",
    artist: "Grover Washington, Jr.",
    cover: "/images/Grover_Washington.jpg",
    source: "/music/Grover_Washington.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Headlock (Immis Radio Mix)",
    artist: "Imogen Heap",
    cover: "/images/Imogen_Heap.jpg",
    source: "/music/Imogen-Heap.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Je Reve",
    artist: "La Meprise",
    cover: "/images/Je_Reve.jpg",
    source: "/music/Je_Reve.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    cover: "/images/LadyGaga_BrunoMars_.jpg",
    source: "/music/Lady_Gaga_Bruno_Mars.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Одно и тоже",
    artist: "iowa",
    cover: "/images/odno.jpg",
    source: "/music/odno_i_toje.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "90",
    artist: "Pompeya",
    cover: "/images/Hotel.jpg",
    source: "/music/Pompeya.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Like Him (feat. Lola Young)",
    artist: "Tyler, The Creator CHROMAKOPIA",
    cover: "/images/Tyler.jpg",
    source: "/music/Tyler.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
  },
  {
    name: "Fly me to the moon Squid game",
    artist: "Joo Won",
    cover: "/images/Squid.jpg",
    source: "/music/Squid_game.mp3",
    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
    favorited: false,
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
  const audioRef = useRef(new Audio(tracks[currentTrackIndex].source));

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = tracks[currentTrackIndex].source;
    audio.preload = "auto";
    audio.load();

    const updateMetadata = () => setDuration(formatTime(audio.duration));
    const updateProgress = () => {
      setBarWidth(`${(audio.currentTime / audio.duration) * 100}%`);
      setCurrentTime(formatTime(audio.currentTime));
    };
    const handleTrackEnd = () => {
      nextTrack();
      setIsPlaying(true);
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
          {isPlaying ? "⏸️" : "▶️"}
        </button>
        <button className="player-controls__item" onClick={nextTrack}>
          <img src="./Shape.png" alt="Next" className="player-controls__icon" />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;

