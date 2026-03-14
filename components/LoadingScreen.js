"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./LoadingScreen.module.css";
import { useLoading } from "@/context/LoadingContext";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const { setIsReady } = useLoading();
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    // Lock scrolling while loading screen is active
    document.body.style.overflow = "hidden";

    // Setup the looping text timeline
    const tl = gsap.timeline({ repeat: -1 });

    const woiiWords = text1Ref.current.querySelectorAll("." + styles.word);
    const combinedWords = text2Ref.current.querySelectorAll("." + styles.word);

    // Initial resets
    gsap.set(text1Ref.current, { opacity: 1 });
    gsap.set(text2Ref.current, { opacity: 1 });
    gsap.set([woiiWords, combinedWords], { opacity: 0, y: 48, rotateX: -20 });

    tl.to(woiiWords, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: "power3.out",
    })
      .to(woiiWords, {
        opacity: 0,
        y: -48,
        rotateX: 20,
        duration: 0.4, // Shortened from 0.8
        stagger: 0.08,
        ease: "power2.in",
        delay: 0.1 // Drastically reduced from 0.5 to make it snap away fast
      })
      .to(combinedWords, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.9, // Shortened from 1.1
        stagger: 0.3,
        ease: "power3.out",
      })
      .to(combinedWords, {
        opacity: 0,
        y: -48,
        rotateX: 20,
        duration: 0.6, // Shortened from 0.8
        stagger: 0.08,
        ease: "power2.in",
        delay: 1.2 /* Give "emeshh" extra time to be read */
      });

    // Remove loading screen after ~3.5 seconds
    const timer = setTimeout(() => {
      // Pause looping text animation
      tl.kill();

      // Hide the texts first
      gsap.to([text1Ref.current, text2Ref.current], { opacity: 0, duration: 0.3 });

      // Signal other components that hero animations can start immediately
      // as the splash screen begins sliding out
      setIsReady(true);

      // Slide the entire container up to reveal site
      gsap.to(containerRef.current, {
        yPercent: -100,
        duration: 1,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.style.overflow = ""; // Restore scroll
          setIsLoading(false);
        }
      });
    }, 3500);

    return () => {
      clearTimeout(timer);
      tl.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.textContainer}>
        <h1 ref={text1Ref} className={styles.textWoii}>
          {["Woii"].map((word, i) => (
            <span key={i} className={styles.wordWrap}>
              <span className={styles.word}>{word}</span>
            </span>
          ))}
        </h1>
        <h1 ref={text2Ref} className={styles.textCombined}>
          <span className={styles.textWoii} style={{ position: "relative", opacity: 1, display: "flex", gap: "0.15em" }}>
            {["Woii"].map((word, i) => (
              <span key={`w2-${i}`} className={styles.wordWrap}>
                <span className={styles.word}>{word}</span>
              </span>
            ))}
          </span>
          <span style={{ width: "0.25em" }} /> {/* Space */}
          <span className={styles.textEmeshh} style={{ display: "flex", gap: "0.15em" }}>
            {["emeshh..."].map((word, i) => (
              <span key={`e-${i}`} className={styles.wordWrap}>
                <span className={styles.word}>{word}</span>
              </span>
            ))}
          </span>
        </h1>
      </div>
    </div>
  );
}
