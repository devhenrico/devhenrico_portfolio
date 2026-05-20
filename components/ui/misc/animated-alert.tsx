'use client';

import { motion, AnimatePresence } from 'motion/react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/primitives/alert';
import { IconCheck, IconX } from '@tabler/icons-react';

interface AnimatedAlertProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
  isVisible: boolean;
  onClose?: () => void;
}

export const AnimatedAlert = ({
  title,
  description,
  variant = 'default',
  isVisible,
  onClose,
}: AnimatedAlertProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-4 left-1/2 z-60 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 md:right-8 md:bottom-24 md:left-auto md:translate-x-0"
        >
          <Alert
            className={`flex items-center rounded-2xl pr-10 shadow-lg ${
              variant === 'success'
                ? 'border-white/10 bg-neutral-900 text-white'
                : variant === 'destructive'
                  ? 'border-white/10 bg-neutral-900 text-white'
                  : 'border-white/10 bg-neutral-900 text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full p-1.5 ${
                  variant === 'success'
                    ? 'bg-cyan-500/20 text-cyan-500'
                    : variant === 'destructive'
                      ? 'bg-red-500/20 text-red-500'
                      : 'bg-neutral-500/20 text-neutral-500'
                }`}
              >
                {variant === 'success' ? (
                  <IconCheck size={16} />
                ) : variant === 'destructive' ? (
                  <IconX size={16} />
                ) : (
                  <IconCheck size={16} />
                )}
              </div>
              <div className="flex-1">
                <AlertTitle className="text-base font-semibold">
                  {title}
                </AlertTitle>
                <AlertDescription className="mt-1 text-sm text-neutral-400">
                  {description}
                </AlertDescription>
              </div>
            </div>
            {onClose && (
              <button
                type="button"
                aria-label="Fechar alerta"
                onClick={onClose}
                className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors duration-300 hover:bg-white/10 hover:text-white"
              >
                <IconX className="h-4 w-4" />
              </button>
            )}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
