import Hero from "@/components/Hero";
import Admiration from "@/components/Admiration";
import ScrollGallery from "@/components/ScrollGallery";
import Reminders from "@/components/Reminders";
import SpotifyVault from "@/components/SpotifyVault";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import BackgroundMusic from "@/components/BackgroundMusic";
import styles from "./page.module.css";
import { ReactLenis } from "lenis/react";
import { LoadingProvider } from "@/context/LoadingContext";

export default function Home() {
  return (
    <LoadingProvider>
      <ReactLenis root>
        <main className={styles.main}>
          <LoadingScreen />
          <BackgroundMusic />
          <Hero />
          <Admiration />
          <ScrollGallery />
          <Reminders />
          <SpotifyVault />
          <Footer />
        </main>
      </ReactLenis>
    </LoadingProvider>
  );
}
