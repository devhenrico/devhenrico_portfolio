'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IconArrowRight, IconSend } from '@tabler/icons-react';
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
const EMPTY_COOLDOWN = { attempts: 0, cooldownEnd: 0, countdown: 0 };
const SEND_ERROR = 'Não foi possível enviar sua mensagem. Tente novamente.';

const loadCooldownState = () => {
  try {
    const storedData = localStorage.getItem('contactCooldown');
    if (!storedData) return EMPTY_COOLDOWN;

    const { lastSendTime, attempts, cooldownEnd } = JSON.parse(storedData);
    const now = Date.now();
    if (
      !Number.isFinite(lastSendTime) ||
      !Number.isFinite(cooldownEnd) ||
      !Number.isSafeInteger(attempts) ||
      attempts < 0 ||
      now - lastSendTime > RESET_DURATION
    ) {
      return EMPTY_COOLDOWN;
    }

    return {
      attempts,
      cooldownEnd,
      countdown: Math.max(0, Math.ceil((cooldownEnd - now) / 1000)),
    };
  } catch {
    return EMPTY_COOLDOWN;
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
  const formHeading = useRef<HTMLHeadingElement>(null);
  const submitButton = useRef<HTMLButtonElement>(null);
  const sending = useRef(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [cooldown, setCooldown] = useState(EMPTY_COOLDOWN);
  const { attempts, countdown } = cooldown;
  const waitDuration =
    COOLDOWN_DURATIONS[Math.min(attempts, COOLDOWN_DURATIONS.length - 1)];

  useEffect(() => {
    const timer = setTimeout(() => setCooldown(loadCooldownState()), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCooldown((current) => ({
          ...current,
          countdown: Math.max(
            0,
            Math.ceil((current.cooldownEnd - Date.now()) / 1000),
          ),
        }));
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
    if (sending.current || countdown > 0) return;
    setConfirmationEmail(
      String(new FormData(e.currentTarget).get('email') ?? ''),
    );
    setSendError(false);
    setShowSuccess(false);
    setShowConfirmDialog(true);
  };

  const sendEmail = async () => {
    if (!form.current || sending.current) return;
    const formData = new FormData(form.current);
    const name = String(formData.get('name') ?? '');
    const email = String(formData.get('email') ?? '');
    const message = String(formData.get('message') ?? '');

    sending.current = true;
    setLoading(true);
    setSendError(false);

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_y3wm8nt';
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_b0daahr';
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'XabdOeH4ulaupnrdS';

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name,
          email,
          title: 'Contato do portfólio',
          time: new Date().toLocaleString(),
          message: `${message}\n\nE-mail do remetente: ${email}`,
        },
        publicKey,
      );
    } catch {
      setSendError(true);
      return;
    } finally {
      sending.current = false;
      setLoading(false);
    }

    const lastSendTime = Date.now();
    const cooldownEnd = lastSendTime + waitDuration;
    const nextAttempts = attempts + 1;
    setCooldown({
      attempts: nextAttempts,
      cooldownEnd,
      countdown: waitDuration / 1000,
    });

    try {
      localStorage.setItem(
        'contactCooldown',
        JSON.stringify({ lastSendTime, attempts: nextAttempts, cooldownEnd }),
      );
    } catch {
      // The in-memory cooldown still applies when storage is unavailable.
    }

    form.current?.reset();
    setShowConfirmDialog(false);
    setShowSuccess(true);
    confetti({
      disableForReducedMotion: true,
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06b6d4', '#3b82f6', '#ffffff'],
    });
  };

  return (
    <>
      <AnimatedAlert
        title="Mensagem enviada"
        description="Sua mensagem foi enviada com sucesso."
        variant="success"
        isVisible={showSuccess}
        onClose={() => setShowSuccess(false)}
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
            <h3
              ref={formHeading}
              tabIndex={-1}
              className="scroll-mt-20 text-lg font-semibold text-white"
            >
              Enviar uma mensagem
            </h3>
          </div>

          <form ref={form} onSubmit={handleSubmit} className="space-y-5">
            <LabelInputContainer>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
              >
                Nome
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Seu nome"
                type="text"
                autoComplete="name"
                readOnly={loading}
                required
                className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
              >
                E-mail
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="seu@email.com"
                type="email"
                autoComplete="email"
                readOnly={loading}
                required
                className="rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
              />
            </LabelInputContainer>

            <LabelInputContainer>
              <Label
                htmlFor="message"
                className="text-sm font-medium text-neutral-600 dark:text-neutral-300"
              >
                Mensagem
              </Label>
              <TextareaInput
                id="message"
                name="message"
                readOnly={loading}
                placeholder="Sua mensagem..."
                className="min-h-30 resize-none rounded-xl border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 transition-all duration-200 placeholder:text-neutral-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-white dark:placeholder:text-neutral-600 dark:focus:border-cyan-500/40"
                required
              />
            </LabelInputContainer>

            <button
              ref={submitButton}
              type="submit"
              disabled={loading || countdown > 0}
              className="group relative z-20 mt-8 flex h-12 w-full cursor-pointer items-center justify-center rounded-full bg-white pr-2 pl-8 font-semibold text-black transition-all duration-300 hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="flex-1 text-center">
                {loading
                  ? 'Enviando...'
                  : countdown > 0
                    ? `Aguarde ${formatTime(countdown)}`
                    : 'Enviar mensagem'}
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-neutral-800">
                <IconArrowRight className="h-4 w-4" />
              </span>
            </button>
            {!showConfirmDialog && sendError && (
              <p role="alert" className="text-sm text-red-300">
                {SEND_ERROR}
              </p>
            )}
          </form>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent
          className="max-h-[calc(100dvh-2rem)] gap-5 overflow-y-auto rounded-lg border-neutral-200 bg-white p-5 sm:max-w-md sm:p-6 dark:border-neutral-700 dark:bg-neutral-900"
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            const target = submitButton.current?.disabled
              ? formHeading.current
              : submitButton.current;
            target?.focus();
          }}
        >
          <AlertDialogHeader className="text-left">
            <AlertDialogTitle className="text-lg tracking-normal text-neutral-900 sm:text-xl dark:text-white">
              Confirmar envio da mensagem
            </AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-600 dark:text-neutral-300">
              Após o envio, aguarde {waitDuration / 60_000} minutos para enviar
              outra mensagem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="min-w-0 rounded-md border border-neutral-200 px-3 py-2 dark:border-neutral-700">
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Seu e-mail
            </p>
            <p className="text-sm font-medium wrap-anywhere text-neutral-900 dark:text-white">
              {confirmationEmail}
            </p>
          </div>
          {sendError && (
            <p role="alert" className="text-sm text-red-700 dark:text-red-300">
              {SEND_ERROR}
            </p>
          )}
          <div role="status" className="sr-only">
            {loading ? 'Enviando mensagem...' : ''}
          </div>
          <AlertDialogFooter className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <AlertDialogCancel className="h-11 rounded-md border-neutral-200 bg-neutral-100 font-semibold whitespace-normal text-neutral-900 hover:bg-neutral-200 focus-visible:ring-cyan-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700">
              {loading ? 'Fechar' : 'Cancelar'}
            </AlertDialogCancel>
            <AlertDialogAction
              aria-disabled={loading}
              onClick={(event) => {
                event.preventDefault();
                void sendEmail();
              }}
              className="h-11 rounded-md bg-neutral-900 font-semibold whitespace-normal text-white hover:bg-neutral-800 focus-visible:ring-cyan-500 aria-disabled:cursor-wait aria-disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-neutral-100"
            >
              <span>{loading ? 'Enviando...' : 'Enviar mensagem'}</span>
              <IconSend aria-hidden="true" className="h-4 w-4" />
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
