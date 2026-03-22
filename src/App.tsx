import { motion, AnimatePresence } from "framer-motion";
import {
  Timeline,
  DressCode,
  Hero,
  RsvpForm,
  Location,
  Countdown,
  ParallaxSection,
  BackgroundBlobs,
  FlowerFall,
} from "@/components";
import "@/styles/main.scss";

function App() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative min-h-screen"
      >
        <div className="app-wrapper">
          <BackgroundBlobs />
          <FlowerFall />
          <Hero />
          <Countdown targetDate="2026-09-14T15:00:00" />
          <main>
            <ParallaxSection offset={100}>
              <Timeline />
            </ParallaxSection>
            {/* <p>Добавить календарик</p>
        <p>Добавить точку трансфера</p>
        <p>Добавить без детей, дрескод любой</p>
        <p>Добавить про два дня и галочку будете ли вы на 2-й день</p>
        <p>Добавить анимашки картинки</p> */}
            <ParallaxSection offset={-50}>
              <DressCode />
            </ParallaxSection>
            <Location />
            <RsvpForm />
          </main>
          <footer
            style={{ padding: "40px", textAlign: "center", opacity: 0.5 }}
          >
            <p>© 2026 • Го тусить</p>
          </footer>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
