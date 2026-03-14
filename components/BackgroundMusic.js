"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./BackgroundMusic.module.css";
import { useLoading } from "@/context/LoadingContext";

export default function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef(null);
  const { isReady } = useLoading();
  const hasAttemptedAutoplay = useRef(false);

  useEffect(() => {
    setIsMounted(true);

    const handleFirstInteraction = (e) => {
      // If it's a keydown event, only proceed if it's the spacebar or enter key
      if (e.type === "keydown" && e.code !== "Space" && e.code !== "Enter") {
        return;
      }

      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((e) => {
          console.warn("Autoplay was blocked by the browser. Waiting for manual interaction.");
          setIsPlaying(false);
        });
      }

      // Remove listeners once interacting
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    // Keep basic interaction listeners as a fallback, including touchstart
    // and keydown (which is now filtered to Space inside the handler)
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("scroll", handleFirstInteraction, { once: true });
    document.addEventListener("keydown", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("scroll", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isPlaying]);

  // Attempt to play precisely when the loading screen finishes sliding out
  useEffect(() => {
    if (isReady && audioRef.current && !hasAttemptedAutoplay.current) {
      hasAttemptedAutoplay.current = true;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((e) => {
          console.warn("Autoplay blocked after loading screen. Waiting for interaction.");
        });
    }
  }, [isReady]);

  const togglePlay = (e) => {
    e.stopPropagation(); // Stop click from bubbling up to document interaction listener
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  if (!isMounted) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src="/pretty.mp3"
        autoPlay
        loop
        preload="auto"
        className={styles.hiddenPlayer}
      />

      <button
        className={`${styles.musicToggle} ${isPlaying ? styles.playing : ''}`}
        onClick={togglePlay}
        aria-label="Toggle background music"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
        <div className={styles.soundWaves}>
          <span className={styles.wave}></span>
          <span className={styles.wave}></span>
          <span className={styles.wave}></span>
        </div>
      </button>
    </>
  );
}
