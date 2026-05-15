'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconArrowRight, IconSend, IconX } from '@tabler/icons-react';
import emailjs from '@emailjs/browser';
import { Label } from '@/components/ui/primitives/label';
import { Input } from '@/components/ui/primitives/input';
import { AnimatedAlert } from '@/components/ui/misc/animated-alert';
import { cn } from '@/lib/utils';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/primitives/alert-dialog';
import confetti from 'canvas-confetti';
import type { SectionProps } from '@/types';

const COOLDOWN_DURATIONS = [2 * 60 * 1000, 5 * 60 * 1000, 10 * 60 * 1000];
const RESET_DURATION = 60 * 60 * 1000;

const loadCooldownState = () => {
  if (typeof window === 'undefined')
    return { attempts: 0, cooldownEnd: 0, countdown: 0 };

  const storedData = localStorage.getItem('contactCooldown');
  if (!storedData) return { attempts: 0, cooldownEnd: 0, countdown: 0 };

  const { lastSendTime, attempts, cooldownEnd } = JSON.parse(storedData);
  const now = Date.now();

  if (now - lastSendTime > RESET_DURATION) {
    localStorage.removeItem('contactCooldown');
    return { attempts: 0, cooldownEnd: 0, countdown: 0 };
  } else if (cooldownEnd > now) {
    return {
      attempts,
      cooldownEnd,
      countdown: Math.ceil((cooldownEnd - now) / 1000),
    };
  } else {
    return { attempts, cooldownEnd: 0, countdown: 0 };
  }
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex w-full flex-col space-y-2', className)}>
      {children}
    </div>
  );
};

const TextareaInput = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #3b82f6,
          transparent 80%
        )
      `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="group/input rounded-xl p-0.5 transition duration-300"
    >
      <textarea
        className={cn(
          'shadow-input dark:placeholder-text-neutral-600 flex h-10 w-full rounded-md border-none bg-gray-50 px-3 py-2 text-sm text-black transition duration-400 group-hover/input:shadow-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-800 dark:text-white dark:shadow-[0px_0px_1px_1px_#404040] dark:focus-visible:ring-neutral-600',
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});

TextareaInput.displayName = 'TextareaInput';

export const ContactForm = ({ itemVariants }: SectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<{
    isVisible: boolean;
    title: string;
    description: string;
    variant: 'default' | 'destructive' | 'success';
  }>({
    isVisible: false,
    title: '',
    description: '',
    variant: 'default',
  });

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(
    () => loadCooldownState().cooldownEnd,
  );
  const [attemptCount, setAttemptCount] = useState(
    () => loadCooldownState().attempts,
  );
  const [countdown, setCountdown] = useState(
    () => loadCooldownState().countdown,
  );

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cooldownTime > 0 && countdown > 0) {
      return;
    }
    setShowConfirmDialog(true);
  };

  const sendEmail = () => {
    setShowConfirmDialog(false);
    setLoading(true);

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_y3wm8nt';
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_b0daahr';
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'XabdOeH4ulaupnrdS';

    if (form.current) {
      const formData = new FormData(form.current);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const message = formData.get('message') as string;

      const templateParams = {
        name: name,
        email: email,
        title: 'Contato do portfólio',
        time: new Date().toLocaleString(),
        message: `${message}\n\nE-mail do remetente: ${email}`,
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey).then(
        (result) => {
          console.log(result.text);
          setLoading(false);
          setAlertState({
            isVisible: true,
            title: 'Sucesso!',
            description: 'Sua mensagem foi enviada com sucesso.',
            variant: 'success',
          });
          form.current?.reset();

          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#06b6d4', '#3b82f6', '#ffffff'],
          });

          const now = Date.now();
          const newAttemptCount = attemptCount + 1;
          const cooldownIndex = Math.min(
            newAttemptCount - 1,
            COOLDOWN_DURATIONS.length - 1,
          );
          const newCooldownEnd = now + COOLDOWN_DURATIONS[cooldownIndex];

          localStorage.setItem(
            'contactCooldown',
            JSON.stringify({
              lastSendTime: now,
              attempts: newAttemptCount,
              cooldownEnd: newCooldownEnd,
            }),
          );

          setAttemptCount(newAttemptCount);
          setCooldownTime(newCooldownEnd);
          setCountdown(Math.ceil(COOLDOWN_DURATIONS[cooldownIndex] / 1000));

          setTimeout(
            () => setAlertState((prev) => ({ ...prev, isVisible: false })),
            5000,
          );
        },
        (error) => {
          console.log(error.text);
          setLoading(false);
          setAlertState({
            isVisible: true,
            title: 'Erro',
            description: 'Algo deu errado. Tente novamente.',
            variant: 'destructive',
          });
          setTimeout(
            () => setAlertState((prev) => ({ ...prev, isVisible: false })),
            5000,
          );
        },
      );
    }
  };

  return (
    <>
      <AnimatedAlert
        title={alertState.title}
        description={alertState.description}
        variant={alertState.variant}
        isVisible={alertState.isVisible}
        onClose={() => setAlertState((prev) => ({ ...prev, isVisible: false }))}
      />

      {/* Contact Form - Theme aware */}
      <motion.div
        ref={containerRef}
        variants={itemVariants}
        className="group relative rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/20 md:p-8 lg:col-span-1"
      >
        <div className="relative">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/20">
              <IconSend className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              Enviar uma mensagem
            </h3>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="space-y-5">
            <LabelInputContainer>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-500"
              >
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome"
                type="text"
                required
                className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-500"
              >
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="seu@email.com"
                type="email"
                required
                className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="message"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-500"
              >
                Mensagem
              </Label>
              <TextareaInput
                id="message"
                name="message"
                placeholder="Sua mensagem..."
                className="min-h-30 resize-none rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
                required
              />
            </LabelInputContainer>

            <button
              type="submit"
              disabled={loading || (countdown > 0 && cooldownTime > 0)}
              className="group relative z-20 mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-white pr-2 pl-8 font-semibold text-black transition-all duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex-1 text-center">
                {loading
                  ? 'Enviando...'
                  : countdown > 0 && cooldownTime > 0
                    ? `Aguarde ${formatTime(countdown)}`
                    : 'Enviar mensagem'}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-neutral-800">
                <IconArrowRight className="h-4 w-4" />
              </span>
            </button>
          </form>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="rounded-2xl border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
          <button
            type="button"
            aria-label="Fechar modal"
            onClick={() => setShowConfirmDialog(false)}
            className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-neutral-500 transition-colors duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <IconX className="h-4 w-4" />
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-neutral-900 dark:text-white">
              Confirmar envio da mensagem
            </AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
                <p>Tem certeza que deseja enviar esta mensagem?</p>
                {attemptCount < 3 && (
                  <div className="mt-3 rounded-xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-500/20 dark:bg-amber-500/10">
                    <p className="text-sm font-medium text-amber-700 dark:text-amber-400">
                      Aviso anti-spam:
                    </p>
                    <p className="mt-1 text-sm text-amber-600 dark:text-amber-300/80">
                      Depois de enviar, você precisará aguardar{' '}
                      <span className="font-semibold">
                        {attemptCount === 0
                          ? '2 minutos'
                          : attemptCount === 1
                            ? '5 minutos'
                            : '10 minutos'}
                      </span>{' '}
                      antes de enviar outra mensagem.
                    </p>
                  </div>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-full border-neutral-200 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={sendEmail}
              className="group rounded-full bg-neutral-900 pr-1.5 pl-5 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
            >
              Enviar mensagem
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-white transition-colors duration-300 group-hover:bg-neutral-800">
                <IconArrowRight className="h-4 w-4" />
              </span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
