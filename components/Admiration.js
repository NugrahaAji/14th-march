"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Admiration.module.css";

gsap.registerPlugin(ScrollTrigger);

const letterLines = [
  {
    type: "salutation",
    text: "Cayangku,",
  },
  {
    type: "paragraph",
    text: "Aku bukan orang yang bisa romantis-romantisan, hope it's not gonna ruined this day and I hope you like it."
  },
  {
    type: "paragraph",
    text: "Ga kerasa ya kita udah sejauh ini, dari yang awalnya cuma iseng isengan chat, sampe sekarang jadi orang yang paling penting di hidup aku.",
  },
  {
    type: "paragraph",
    text: "Aku bersyukur banget punya kamu, kamu make the ordinary feel sacred and the difficult feel lighter.",
  },
  {
    type: "paragraph",
    text: "On this White Day, I want you to know, everything you are, every small kindness, every care, every burst of joy is seen, and treasured, and loved.",
  },
  {
    type: "highlight",
    text: "Thank you for being exactly who you are.",
  },
  {
    type: "closing",
    text: "With all the love in the world,\nAji.",
  },
];

export default function Admiration() {
  const sectionRef = useRef(null);
  const linesRef = useRef([]);
  const photoRef = useRef(null);

  useGSAP(
    () => {
      linesRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0.05, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "top 55%",
              scrub: 1.6,
            },
          }
        );
      });

      // Animate the side photo
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, x: 100, rotation: 12 },
          {
            opacity: 1,
            x: 0,
            rotation: 4,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      }

      // divider line draw
      const path = sectionRef.current.querySelector("." + styles.dividerPath);
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: path,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section className={styles.section} ref={sectionRef}>
      <div
        ref={photoRef}
        className={styles.sidePhoto}
      >
        <Image src="/adm1.jpeg" alt="Us" fill style={{ objectFit: "cover" }} />
      </div>

      <div className={styles.inner}>
        <div className={styles.topDecor}>
          <svg viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className={styles.dividerPath}
              d="M0 15 Q50 2 100 15 Q150 28 200 15"
              stroke="var(--color-primary)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div className={styles.letter}>
          {letterLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => (linesRef.current[i] = el)}
              className={`${styles.line} ${styles[line.type] || ""}`}
            >
              {line.type === "highlight" ? (
                <blockquote className={styles.blockquote}>{line.text}</blockquote>
              ) : (
                <p style={{ whiteSpace: "pre-line" }}>{line.text}</p>
              )}
            </div>
          ))}
        </div>

        <div className={styles.bottomDecor}>
          <svg viewBox="0 0 200 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 15 Q50 28 100 15 Q150 2 200 15"
              stroke="var(--color-primary)"
              strokeWidth="1"
              fill="none"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
