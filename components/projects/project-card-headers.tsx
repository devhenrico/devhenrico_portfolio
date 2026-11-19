import Image from 'next/image';

export const DaGymHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-default overflow-hidden rounded-md bg-neutral-900">
    <Image
      src="/assets/projects/dagym.png"
      alt="DaGym Landing Page"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const StreamPlayHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-default overflow-hidden rounded-md bg-neutral-900">
    <Image
      src="/assets/projects/streamplay.png"
      alt="StreamPlay streaming platform"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const DownloadYouTubeHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-default overflow-hidden rounded-md bg-neutral-900">
    <Image
      src="/assets/projects/download-youtube.png"
      alt="Interface do Download YouTube"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);

export const ConstruindoSaberesHeader = () => (
  <div className="group relative flex h-full min-h-60 w-full flex-1 cursor-default overflow-hidden rounded-md bg-neutral-900">
    <Image
      src="/assets/projects/contruindo-saberes.png"
      alt="Site da Clínica Construindo Saberes"
      fill
      className="object-cover object-top opacity-90 transition-opacity duration-500"
    />
    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
  </div>
);
