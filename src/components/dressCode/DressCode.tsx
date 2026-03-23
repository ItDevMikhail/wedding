import "./dressCode.scss";

export const DressCode = () => (
  <section className="dresscode bg-[#fdfaf7]">
    <h2 className="font-serif text-3xl sm:text-4xl text-gray-800">
      Продолжение праздника!
    </h2>

    <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
      Празднование продолжается после{" "}
      <span className="text-[#d1bfa7] font-semibold">23:00</span>, до{" "}
      <span className="text-[#d1bfa7] font-semibold">18:00</span> следующего
      дня.
    </p>
    <p className=" text-gray-600 max-w-2xl mx-auto text-sm italic">
      Это необязательная часть программы — оставайтесь по желанию и настроению!
    </p>

    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
      <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-sm px-5 py-5">
        <div className="text-xs uppercase tracking-widest text-gray-500">
          После 23:00
        </div>
        <div className="mt-2 font-serif text-2xl text-gray-800">
          After Party
        </div>
        <div className="mt-2 text-md text-gray-600">
          <p>Переходим в дом и продолжаем тусить.</p>
          <p className="italic text-sm w-4/5 mx-auto text-gray-500">
            А кто не выдержит — спальных мест хватит на всех!{" "}
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-sm px-5 py-5">
        <div className="text-xs uppercase tracking-widest text-gray-500">
          2-й день
        </div>
        <div className="mt-2 font-serif text-2xl text-gray-800">До 18:00</div>
        <div className="mt-2 text-md text-gray-600">
          Просыпаемся:
          <p>• Теплый супчик</p>
          <p>• Минералочка</p>
          <p>• Шашлык </p>
        </div>
      </div>
    </div>

    <p className="mt-7 text-gray-500 text-sm max-w-2xl mx-auto">
      Все подробности и мелкие детали мы с радостью расскажем вам чуть позже.
      Пишите, звоните если есть вопросы!
    </p>
  </section>
);
