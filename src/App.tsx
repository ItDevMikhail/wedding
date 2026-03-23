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
  Transfer,
} from "@/components";
import "@/styles/main.scss";

function App() {
  return (
    <div className="relative min-h-screen app-shell">
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
            <Transfer/>
            <RsvpForm />
          </main>
          <footer
            style={{ textAlign: "center", opacity: 0.5 }}
          >
            <section className="bg-white">
            <p>© 2026 • Го тусить</p>
            </section>
          </footer>
      </div>
    </div>
  );
}

export default App;
