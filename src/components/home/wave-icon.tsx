import Image from 'next/image';

export function WaveIcon() {
  return (
    <Image
      data-wave
      src="/images/waving.png"
      alt=""
      width={36}
      height={36}
      loading="eager"
      className="size-9 object-contain"
    />
  );
}
