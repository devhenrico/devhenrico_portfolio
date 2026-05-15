'use client';

import { useEffect } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { Button } from '@/components/ui/primitives/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-white">
      <div className="relative">
        <div className="absolute -inset-4 rounded-full bg-cyan-500/20 blur-2xl" />
        <h2 className="relative mb-4 bg-linear-to-b from-white to-neutral-500 bg-clip-text py-1 text-4xl leading-tight font-bold text-transparent md:text-5xl">
          Algo deu errado!
        </h2>
      </div>
      <p className="mb-8 max-w-md text-center text-lg text-neutral-400">
        Desculpe o transtorno. Ocorreu um erro inesperado no sistema.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button
          onClick={() => reset()}
          className="group relative flex h-12 min-w-60 cursor-pointer items-center justify-center rounded-full bg-white pr-2 pl-5 text-lg font-semibold text-black transition-all duration-300 hover:bg-neutral-200"
        >
          <span className="flex-1 text-center">Tentar novamente</span>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors duration-300 group-hover:bg-neutral-800">
            <IconArrowRight className="h-4 w-4" />
          </span>
        </Button>
        <Button
          onClick={() => (window.location.href = '/')}
          variant="outline"
          className="h-12 cursor-pointer rounded-full border-neutral-700 p-6 text-lg text-white transition-all hover:bg-neutral-800"
        >
          Voltar para o inicio
        </Button>
      </div>
      <div className="mt-12 text-sm text-neutral-600">
        ID do erro: {error.digest || 'N/A'}
      </div>
    </div>
  );
}
