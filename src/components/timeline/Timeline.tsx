import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const events = [
  { time: "15:00", title: "Сбор гостей", desc: "Welcome-зона и легкий фуршет" },
  { time: "16:00", title: "Церемония", desc: "Самый важный момент дня" },
  { time: "17:30", title: "Банкет", desc: "Ужин, танцы и поздравления" },
  { time: "22:00", title: "Торт и финал", desc: "Красивое завершение вечера" },
];

export const Timeline = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      className="relative py-24 max-w-4xl mx-auto px-4 overflow-hidden"
    >
      <h2 className="text-4xl font-serif text-center mb-24 text-gray-800">
        Программа дня
      </h2>

      <div className="relative">
        {/* Линия строго по центру (на десктопе) */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2" />
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#d1bfa7] z-10 -translate-x-1/2"
        />

        <div className="space-y-20">
          {events.map((event, i) => (
            <div
              key={i}
              className={`relative flex items-center justify-between md:justify-normal ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* Пустое пространство для симметрии на десктопе */}
              <div className="hidden md:block md:w-1/2" />

              {/* Точка на линии */}
              <div className="absolute left-4 md:left-1/2 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#d1bfa7] shadow-sm z-20 -translate-x-1/2" />

              {/* Карточка контента */}
              <motion.div
                className={`w-full pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div
                  className={`text-left ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                >
                  <span className="text-[#d1bfa7] font-semibold text-xs tracking-widest uppercase block mb-2">
                    {event.time}
                  </span>
                  <h3 className="text-2xl font-serif text-gray-800 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed max-w-sm inline-block">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
