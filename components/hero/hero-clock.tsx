'use client';

import { useState, useEffect } from 'react';
import { IconClock } from '@tabler/icons-react';
import { motion } from 'motion/react';

export const HeroClock = () => {
  const [currentTime, setCurrentTime] = useState({
    weekday: '',
    dateTime: '',
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const weekday = now.toLocaleDateString('pt-BR', {
        weekday: 'long',
      });
      const date = now.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      const time = now.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        hourCycle: 'h23',
      });

      setCurrentTime({
        weekday: weekday.charAt(0).toUpperCase() + weekday.slice(1),
        dateTime: `${date} às ${time}`,
      });
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-4 left-1/2 z-20 max-w-[calc(100%-1rem)] -translate-x-1/2">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-2.5 py-1.5 text-center whitespace-nowrap text-white/90 backdrop-blur-md sm:gap-2 sm:px-3"
      >
        <div className="flex items-center justify-center gap-1.5">
          <IconClock className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          <span className="font-mono text-[11px] font-medium tabular-nums sm:text-sm">
            {currentTime.weekday || 'Carregando...'}
          </span>
        </div>
        <div className="font-mono text-[11px] font-medium text-white/80 tabular-nums sm:text-sm sm:text-white/90">
          {currentTime.dateTime}
        </div>
      </motion.div>
    </div>
  );
};
