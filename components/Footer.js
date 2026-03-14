"use client";

import { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Footer.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const heartRef = useRef(null);
  const contentRef = useRef(null);
  const gifRef = useRef(null);
  const [gifVisible, setGifVisible] = useState(false);
  const posRef = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      // Entrance animation
      gsap.fromTo(
        contentRef.current.querySelectorAll("[data-anim]"),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.18,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Heart pulse
      gsap.to(heartRef.current, {
        scale: 1.18,
        duration: 0.7,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    },
    { scope: contentRef }
  );

  const handleMouseMove = useCallback((e) => {
    const el = gifRef.current;
    if (!el) return;
    const x = e.clientX;
    const y = e.clientY;
    posRef.current = { x, y };
    // Position the GIF offset slightly so it doesn't block the cursor
    el.style.left = `${x + 18}px`;
    el.style.top = `${y - 60}px`;
  }, []);

  const handleMouseEnter = useCallback((e) => {
    setGifVisible(true);
    handleMouseMove(e);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setGifVisible(false);
  }, []);

  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Cursor-tracking GIF — fixed to viewport */}
      <img
        ref={gifRef}
        src="/arap.gif"
        alt=""
        aria-hidden="true"
        className={styles.cursorGif}
        style={{
          opacity: gifVisible ? 1 : 0,
          pointerEvents: "none",
        }}
      />

      {/* Petal decorations */}
      <div className={styles.petals} aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.petal} style={{ "--i": i }} />
        ))}
      </div>

      <div
        className={styles.content}
        ref={contentRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={heartRef} className={styles.heartWrap} data-anim>
          <svg width="48" height="44" viewBox="0 0 48 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24 40C24 40 4 26 4 14C4 8.477 8.477 4 14 4C17.313 4 20.262 5.616 22.238 8.102L24 10.4L25.762 8.102C27.738 5.616 30.687 4 34 4C39.523 4 44 8.477 44 14C44 26 24 40 24 40Z"
              fill="url(#heartGrad)"
            />
            <defs>
              <linearGradient id="heartGrad" x1="4" y1="4" x2="44" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F2A7BB" />
                <stop offset="1" stopColor="#E080A4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <blockquote className={styles.quote} data-anim>
          &ldquo;Tinta pemilu dua hari juga hilang, tapi tintaku padamu tidak akan pernah hilang.&rdquo;
        </blockquote>
        <cite className={styles.author} data-anim>— yb</cite>
      </div>
    </footer>
  );
}
