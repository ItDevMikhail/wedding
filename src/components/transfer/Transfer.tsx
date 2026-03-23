export const Transfer = () => {
  const bg = `${import.meta.env.BASE_URL}images/transferBg.webp`;
  return (
    <section>
      <div
        className="relative bg-cover bg-center bg-no-repeat rounded-2xl overflow-hidden max-w-4xl m-auto"
        style={{
          backgroundImage: `url(${bg})`,
          minHeight: "450px",
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="relative z-10 flex items-center justify-center min-h-[330px]">
          <div className="text-center">
            <h2 className="font-serif text-3xl mb-10 text-white">
              Операция "Перехват"
            </h2>
            <p className="text-white/90 italic text-lg">
              Также будет организован трансфер со ст. м. "Уручье" и ст. м.
              "Могилевская"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
