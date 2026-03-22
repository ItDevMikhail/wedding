export const Location = () => {
  // Зайди в Яндекс Карты -> Поделиться -> Забрать код (iframe)
  // Замени src ниже на свою ссылку из конструктора карт
  const mapSrc = "https://yandex.ru";

  return (
    <section className="py-20">
      <h2 className="font-serif text-3xl text-center mb-10">
        Место проведения
      </h2>
      <div className="max-w-4xl mx-auto h-[400px] rounded-2xl overflow-hidden shadow-lg border-4 border-white">

          <iframe
            src="https://yandex.by/map-widget/v1/?ll=27.720350%2C53.846289&mode=poi&poi%5Bpoint%5D=27.768498%2C53.821247&poi%5Buri%5D=ymapsbm1%3A%2F%2Forg%3Foid%3D156175192653&z=12.59"
            width="100%"
            height="100%"
            frameBorder="0"
          />
      </div>
      <p className="mt-6 text-center text-gray-500 italic">
        8 км от МКАД, д. Прилесье, Горная ул., 18 (усадьба "Легенда")
      </p>
    </section>
  );
};
