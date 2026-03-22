export const Hero = () => {
  const heroBg = `${import.meta.env.BASE_URL}images/heroImg.JPG`;

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 [transform:translateZ(0)]"
      />
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="absolute top-12 left-0 right-0 z-20 flex flex-col items-center gap-5 px-5 pt-8 md:top-16 md:pt-12">
        <span
          className="h-px w-14 bg-gradient-to-r from-transparent via-white/75 to-transparent md:w-20"
          aria-hidden
        />
        <p className="font-serif text-xl font-light italic leading-snug text-white/95 sm:text-2xl md:max-w-xl md:text-[1.65rem] md:leading-relaxed text-center [text-shadow:0_1px_2px_rgba(0,0,0,0.45),0_6px_28px_rgba(0,0,0,0.35)]">
          Приглашаем вас разделить с нами этот особенный день
        </p>
        <span
          className="h-px w-14 bg-gradient-to-r from-transparent via-white/75 to-transparent md:w-20"
          aria-hidden
        />
      </div>

      <div className="relative z-20 text-center text-white [transform:translateZ(0)]">
        <h1 className="font-serif text-6xl font-semibold tracking-tight md:text-8xl [text-shadow:0_2px_24px_rgba(0,0,0,0.35)]">
          Миша & Оля
        </h1>
        <p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.35em] text-white/90 md:text-sm">
          14 Сентрября 2026
        </p>
      </div>
    </section>
  );
};
