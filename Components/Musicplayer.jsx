import React, { useState, useRef, useEffect } from "react";
import musicList from "../assets/music";
import "./Music.css";
import {
  FaPlay,
  FaPause,
  FaStepBackward,
  FaStepForward,
  FaRandom,
} from "react-icons/fa";

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [shuffleQueue, setShuffleQueue] = useState([]);
  const [history, setHistory] = useState([]); // Stores played songs for 'Previous' functionality

  const audioRef = useRef(null);
  const currentSong = musicList[currentSongIndex];

  useEffect(() => {
    if (isPlaying) audioRef.current.play();
  }, [currentSongIndex]);

  // Play/Pause the current song
  const playPauseHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle "Next" button
  const handleNextSong = () => {
    setHistory((prevHistory) => [...prevHistory, currentSongIndex]); // Store current song in history
    if (isShuffle && shuffleQueue.length > 0) {
      const [nextIndex, ...rest] = shuffleQueue;
      setCurrentSongIndex(nextIndex);
      setShuffleQueue(rest);
    } else {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % musicList.length);
    }
  };

  // Handle "Previous" button (plays from history)
  const handlePreviousSong = () => {
    setHistory((prevHistory) => {
      if (prevHistory.length > 0) {
        const lastSongIndex = prevHistory.pop(); // Get the last song played
        setCurrentSongIndex(lastSongIndex); // Set it as the current song
      }
      return [...prevHistory];
    });
  };

  // Toggle Shuffle and generate a shuffled queue
  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
    if (!isShuffle) {
      const shuffledSongs = musicList
        .map((_, i) => i)
        .sort(() => Math.random() - 0.5)
        .filter((index) => index !== currentSongIndex); // Remove current song from shuffled list
      setShuffleQueue(shuffledSongs);
    }
  };

  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);

  const handleDurationChange = () => setDuration(audioRef.current.duration);

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };
  console.log(currentSongIndex);
  console.log(shuffleQueue);
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="container">
      <div className="box">
        <div className="image-container">
          <img src={currentSong.images} alt="song-image" />
        </div>

        <div className="song-info">
          <h2>{currentSong.name}</h2>
          <p>{currentSong.artist}</p>
        </div>

        <audio
          ref={audioRef}
          src={currentSong.song}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleDurationChange}
          onEnded={handleNextSong}
        />

        <input
          type="range"
          min="0"
          max="100"
          value={duration ? (currentTime / duration) * 100 : 0}
          onChange={handleSeek}
        />

        <div className="time">
          <span>{formatTime(currentTime)}</span> /{" "}
          <span>{formatTime(duration)}</span>
        </div>

        <div className="controls">
          <button onClick={handlePreviousSong}>
            <FaStepBackward />
          </button>
          <button onClick={playPauseHandler}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleNextSong}>
            <FaStepForward />
          </button>
          <button
            onClick={handleShuffle}
            className={isShuffle ? "active-shuffle" : ""}
          >
            <FaRandom />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
