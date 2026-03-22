import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export const FlowerFall = () => {
  const reduceMotion = usePrefersReducedMotion();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (reduceMotion || !init) return null;

  return (
    <Particles
      id="tsparticles"
      style={{ pointerEvents: "none" }}
      options={{
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble", // Или "push" для появления новых
            },
          },
          modes: {
            bubble: { size: 15, opacity: 0.5, color: "#d1bfa7" },
          },
        },
        fullScreen: { enable: true, zIndex: 100 }, // Лепестки за контентом, но над блобами
        particles: {
          number: { value: 20, density: { enable: true } },
          color: { value: "#fce4ec" }, // Нежно-розовый
          // shape: {
          // type: "circle", // Можно заменить на "image" и дать ссылку на SVG лепестка
          // },
          shape: {
            type: "image",
            options: {
              image: [
                {
                  // Светло-розовый лепесток
                  src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzcsMTcgUTU4LDAgNzIsMzQgUTg2LDY4IDUyLDkyIFExOCwxMTYgMTEsNzQgUTQsMzIgMzcsMTcgWiIgZmlsbD0iI2ZjZTRlYyIgLz48L3N2Zz4=",
                  width: 100,
                  height: 100,
                },
                {
                  // Розовый потемнее
                  src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzcsMTcgUTU4LDAgNzIsMzQgUTg2LDY4IDUyLDkyIFExOCwxMTYgMTEsNzQgUTQsMzIgMzcsMTcgWiIgZmlsbD0iI2Y4YmJkMCIgLz48L3N2Zz4=",
                  width: 100,
                  height: 100,
                },
                {
                  // СВЕТЛО-ОЛИВКОВЫЙ ЛИСТИК (#A3B18A)
                  src: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzcsMTcgUTU4LDAgNzIsMzQgUTg2LDY4IDUyLDkyIFExOCwxMTYgMTEsNzQgUTQsMzIgMzcsMTcgWiIgZmlsbD0iI0EzQjE4QSIgLz48L3N2Zz4=",
                  width: 100,
                  height: 100,
                },
              ],
            },
          },
          opacity: { value: { min: 0.2, max: 0.4 } },
          size: { value: { min: 8, max: 15 } },
          move: {
            enable: true,
            direction: "bottom", // Падают вниз
            speed: 1,
            straight: false, // Покачиваются
            outModes: "out",
          },
          wobble: {
            // Эффект кружения в воздухе
            enable: true,
            distance: 10,
            speed: 10,
          },
          rotate: {
            value: { min: 0, max: 360 },
            animation: { enable: true, speed: 5, sync: false },
          },
          roll: {
            enable: true,
            speed: 5,
          },
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: { value: 24 },
                size: { value: { min: 4, max: 10 } },
                move: { speed: 1 },
              },
            },
          },
        ],
      }}
    />
  );
};
