"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import styles from "./Hero.module.css";
import { useLoading } from "@/context/LoadingContext";

export default function Hero() {
  const { isReady } = useLoading();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const photosRef = useRef([]);

  // --- Particle Canvas ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrameId;
    let mouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const colors = [
      "rgba(242,167,187,0.45)",
      "rgba(247,214,223,0.5)",
      "rgba(255,200,215,0.35)",
      "rgba(232,197,176,0.3)",
      "rgba(255,240,245,0.6)",
    ];

    const particles = Array.from({ length: 65 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 14 + 4,
      color: colors[i % colors.length],
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      ox: 0,
      oy: 0,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const dx = (mouse.x - p.x) * 0.012;
        const dy = (mouse.y - p.y) * 0.012;
        p.ox += (dx - p.ox) * 0.04;
        p.oy += (dy - p.oy) * 0.04;
        p.x += p.vx + p.ox * 0.3;
        p.y += p.vy + p.oy * 0.3;
        if (p.x < -p.r) p.x = canvas.width + p.r;
        if (p.x > canvas.width + p.r) p.x = -p.r;
        if (p.y < -p.r) p.y = canvas.height + p.r;
        if (p.y > canvas.height + p.r) p.y = -p.r;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      animFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // --- GSAP Text Reveal ---
  useGSAP(
    () => {
      if (!isReady) return; // Wait for loading screen to finish

      const titleEl = titleRef.current;
      const words = titleEl.querySelectorAll("." + styles.word);
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        words,
        { opacity: 0, y: 48, rotateX: -20 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
        }
      )
        .fromTo(
          photosRef.current,
          { opacity: 0, scale: 0.5, y: 60, rotation: (i) => [15, -15, 20][i] },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotation: (i) => [-12, 8, 9][i],
            duration: 1.4,
            stagger: 0.15,
            ease: "back.out(1.4)",
          },
          "-=0.7"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          "-=0.5"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );

      // bounce scroll arrow
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        delay: 2.5,
      });
    },
    { scope: containerRef, dependencies: [isReady] }
  );

  const titleWords = ["For", "You,", "My", "Emesh"];

  return (
    <section className={styles.hero} ref={containerRef}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.glow} />
      <div className={styles.content}>
        <p className={styles.overline}>✦ White Day ✦</p>
        <div className={styles.titleWrapper}>
          <div
            ref={(el) => (photosRef.current[0] = el)}
            className={`${styles.floatingPhoto} ${styles.photo1}`}
          >
            <Image src="/hero1.jpeg" alt="Memory 1" fill style={{ objectFit: "cover", borderRadius: "14px" }} />
          </div>
          <div
            ref={(el) => (photosRef.current[1] = el)}
            className={`${styles.floatingPhoto} ${styles.photo2}`}
          >
            <Image src="/hero2.jpeg" alt="Memory 2" fill style={{ objectFit: "cover", borderRadius: "14px" }} />
          </div>
          <div
            ref={(el) => (photosRef.current[2] = el)}
            className={`${styles.floatingPhoto} ${styles.photo3}`}
          >
            <Image src="/hero3.jpeg" alt="Memory 3" fill style={{ objectFit: "cover", borderRadius: "14px" }} />
          </div>
          <h1 ref={titleRef} className={styles.title}>
            {titleWords.map((word, i) => (
              <span key={i} className={styles.wordWrap}>
                <span className={styles.word}>{word}</span>
              </span>
            ))}
          </h1>
        </div>
        <p ref={subtitleRef} className={styles.subtitle}>
          A little corner of the internet,<br />
          made entirely for you.
        </p>
      </div>
      <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
        <span className={styles.scrollText}>Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1">
            <path d="M6 9a6 6 0 0 1 12 0v6a6 6 0 0 1-12 0z"/>
            <path strokeLinecap="round" d="M12 7v4"/>
          </g>
        </svg>
      </div>
    </section>
  );
}
