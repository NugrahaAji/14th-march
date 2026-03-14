"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./Reminders.module.css";

gsap.registerPlugin(ScrollTrigger);

const REMINDERS = [
  {
    title: "Pretty - JVKE",
    text: "Kamu tuh pernah ngambek karna aku ga post pake lagu ini.",
    emoji: "☕"
  },
  {
    title: "ah game gampang ini",
    text: "singkat padat 'kebantai'",
    emoji: "🐈"
  },
  {
    title: "Soangggg",
    text: "Nah ini nih, yang suka ngerebut kamu kalo malem-malem",
    emoji: "🦢"
  },
  {
    title: "A simple 'how was your day?'",
    text: "The little moments of care that make everything feel right.",
    emoji: "💌"
  }
];

export default function Reminders() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const track = trackRef.current;

      const getScrollAmount = () => {
        let trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.container}>
      <div ref={trackRef} className={styles.track}>

        {/* Slide 0: Title Entry */}
        <div className={styles.panel}>
          <div className={styles.introWrapper}>
            <h2 className={styles.scrapbookTitle}>Things That<br/>Remind Me<br/>Of You.</h2>
            <p className={styles.swipeText}>Scroll to explore</p>
          </div>
        </div>

        {/* Slide 1: Coffee */}
        <div className={`${styles.panel} ${styles.layout1}`}>
          <div className={`${styles.bubble} ${styles.b1}`}>
            <span>{REMINDERS[0].text}</span>
          </div>
          <div className={`${styles.polaroid} ${styles.p1}`}>
            <div className={styles.polaroidPhoto}>
              <Image src="/pretty.jpg" alt={REMINDERS[0].title} fill style={{ objectFit: "cover", borderRadius: "inherit" }} />
            </div>
            <div className={styles.polaroidCaption}>{REMINDERS[0].title}</div>
          </div>
          <div className={`${styles.sticker} ${styles.s1}`}>✨</div>
        </div>

        {/* Slide 2: Late night drives */}
        <div className={`${styles.panel} ${styles.layout3}`}>
          <div className={styles.note3}>That night...</div>
          <div className={`${styles.bubble} ${styles.b3}`}>
            <span>{REMINDERS[1].text}</span>
          </div>
          <div className={`${styles.polaroid} ${styles.p3}`}>
            <div className={styles.polaroidPhoto}>
              <Image src="/tic.jpg" alt={REMINDERS[1].title} fill style={{ objectFit: "cover", borderRadius: "inherit" }} />
            </div>
            <div className={styles.polaroidCaption}>{REMINDERS[1].title}</div>
          </div>
          <div className={`${styles.sticker} ${styles.s3}`}>🌃</div>
        </div>

        {/* Slide 3: Sunflowers */}
        <div className={`${styles.panel} ${styles.layout4}`}>
          <div className={`${styles.polaroid} ${styles.p4_1}`}>
            <div className={styles.polaroidPhoto}>
              <Image src="/soang.webp" alt={REMINDERS[2].title} fill style={{ objectFit: "cover", borderRadius: "inherit" }} />
            </div>
            <div className={styles.polaroidCaption}>{REMINDERS[2].title}</div>
          </div>
          <div className={`${styles.bubble} ${styles.b4}`}>
            <span>{REMINDERS[2].text}</span>
          </div>
          <div className={`${styles.sticker} ${styles.s4}`}>🌞</div>
        </div>

        {/* Slide 4: How was your day */}
        <div className={`${styles.panel} ${styles.layout5}`}>
          <div className={`${styles.bubble} ${styles.b5}`}>
            <span>{REMINDERS[3].title}</span>
          </div>
          <div className={`${styles.polaroid} ${styles.p5}`}>
            <div className={styles.polaroidPhoto}>
              <Image src="/hero1.jpeg" alt={REMINDERS[3].title} fill style={{ objectFit: "cover", borderRadius: "inherit" }} />
            </div>
            <div className={styles.polaroidCaption}>Always you.</div>
          </div>
          <div className={styles.letter5}>
            <div className={styles.letterTitle}>Sayang aku,</div>
            <div className={styles.letterText}>{REMINDERS[3].text}</div>
          </div>
        </div>

      </div>
    </section>
  );
}
