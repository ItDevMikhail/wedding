import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = new Date(targetDate) - new Date();
      if (difference <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-12 bg-white text-center">
      <h2 className="font-serif text-2xl mb-8">До торжества осталось:</h2>
      <div className="flex justify-center gap-4 sm:gap-8">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div key={label} className="flex flex-col">
            <span className="text-3xl sm:text-5xl font-light text-[#d1bfa7]">{value}</span>
            <span className="text-[10px] uppercase tracking-widest text-gray-400">
              {label === 'days' ? 'дней' : label === 'hours' ? 'часов' : label === 'minutes' ? 'минут' : 'секунд'}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
