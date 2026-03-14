"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import styles from "./ScrollGallery.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    caption: "si sinematik ✨",
    image: "gal1.jpeg",
    rotation: -2,
    initRotation: -8,
  },
  {
    caption: "si imut 🥰",
    image: "gal2.jpeg",
    rotation: 4,
    initRotation: 10,
  },
  {
    caption: "mommy 🙈",
    video: "gal3.mp4", // Placeholder video URL
    rotation: -3,
    initRotation: -9,
  },
  {
    caption: "raull 🦖",
    image: "gal4.jpeg",
    rotation: 5,
    initRotation: 12,
  },
  {
    caption: "fans MU 🟥",
    image: "gal5.jpeg",
    rotation: -4,
    initRotation: -10,
  },
  {
    caption: "Us, always 💕",
    image: "gal6.jpeg",
    rotation: 2,
    initRotation: 6,
  },
];

export default function ScrollGallery() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useGSAP(
    () => {
      // Pin the whole section and create a scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${CARDS.length * 800}`, // Scroll length dynamically based on cards count
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate cards stacking one by one
      CARDS.forEach((card, index) => {
        const el = cardRefs.current[index];
        if (!el) return;

        // Clear any leftover inline opacity from previous hot reloads
        gsap.set(el, { clearProps: "opacity" });

        if (index === 0) {
          // The first card is already visible
          gsap.set(el, { rotation: card.rotation, opacity: 1 });
        } else {
          // Following cards start far below the view
          gsap.set(el, {
            y: "150vh",
            rotation: card.initRotation,
            opacity: 1
          });

            // Bring them up into the stack via the timeline
            // Using index - 1 for timing so the second card starts immediately
            tl.to(el, {
              y: 0,
              rotation: card.rotation,
              duration: 1,
              ease: "power2.out",
            }, (index - 1) * 0.8); // second card starts at 0, third at 0.8, etc.
          }
        });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className={styles.section}>
      <div className={styles.header}>
        <p className={styles.overline}>✦ Moments We Cherish ✦</p>
        <h2 className={styles.heading}>The Memories</h2>
        <p className={styles.sub}>
          A collection of the little things that made us, us.
        </p>
      </div>

      <div className={styles.cardsWrapper}>
        {CARDS.map((card, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className={styles.card}
            style={{ zIndex: i + 1 }}
          >
            <div className={styles.polaroid}>
              <div className={styles.photoFrame}>
                <div className={styles.photo}>
                  {card.video ? (
                    <video
                      src={card.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={`/${card.image}`}
                      alt={card.caption}
                      fill
                      style={{ objectFit: "cover", objectPosition: card.image === "gal6.jpeg" ? "center 80%" : "center" }}
                    />
                  )}
                </div>
              </div>
              <p className={styles.caption}>{card.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
