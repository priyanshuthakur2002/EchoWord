"use client";
import { useRef, useState, useEffect } from "react";
import styles from "./Modal.module.css";

export default function Modal({ setShowModal, url }) {
  const audioRef = useRef(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleAudioEnd);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleAudioEnd);
    };
  }, []);

  const handlePlay = () => {
    const audio = audioRef.current;
    audio.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    const audio = audioRef.current;
    audio.pause();
    setIsPlaying(false);
  };

  const handleDownload = () => {
    try {
      const link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      alert("Failed to download...");
    }
  };

  const handleClose = () => {
    handlePause();
    setShowModal(false);
  };

  const updateCurrentTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const updateDuration = () => {
    setDuration(audioRef.current.duration);
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <h2 className={styles.modalHeader}>Download Audio</h2>
        <div className={styles.modalBody}>
          <div className={styles.audioControls}>
            {isPlaying ? (
              <button className={styles.modalButton} onClick={handlePause}>
                Pause
              </button>
            ) : (
              <button className={styles.modalButton} onClick={handlePlay}>
                Play
              </button>
            )}
            <button className={styles.modalButton} onClick={handleDownload}>
              Download
            </button>
          </div>
          <div className={styles.timeline}>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={(e) => (audioRef.current.currentTime = e.target.value)}
              className={styles.progress}
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
      </div>
    </div>
  );
}
