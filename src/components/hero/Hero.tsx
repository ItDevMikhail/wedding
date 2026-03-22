import { useScroll, useTransform, motion } from "framer-motion";

export const Hero = () => {
  const { scrollY } = useScroll();
  // Фото зумится при скролле, текст улетает быстрее
  const yText = useTransform(scrollY, [0, 500], [0, 200]);
  const scaleImage = useTransform(scrollY, [0, 500], [1, 1.3]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ scale: scaleImage }}
        className="absolute inset-0 z-0 bg-[url('/public/images/heroImg.jpg')] bg-cover bg-center"
      />
      <div className="absolute inset-0 bg-black/30 z-10" />

      <motion.div
        style={{ y: yText }}
        className="relative z-20 text-center text-white"
      >
        <h1 className="text-6xl md:text-8xl font-serif">Миша & Оля</h1>
        <p className="mt-4 tracking-[0.3em] uppercase">14 Сентрябрь 2026</p>
        <p className="mt-8 tracking-[0.3em] uppercase">
          Приглашаем вас разделить с нами этот особенный день - поменять место
        </p>
      </motion.div>
    </section>
  );
};
