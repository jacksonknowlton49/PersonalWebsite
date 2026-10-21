import Image from 'next/image';
import { StatCard } from './stat-card';

export function HeroPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-[600px] min-w-0 self-end md:max-w-none">
      <Image
        src="/images/head-shot.png"
        alt="Jackson Knowlton wearing a black hoodie"
        width={846}
        height={700}
        priority
        sizes="(max-width: 767px) 100vw, (max-width: 1536px) 54vw, 752px"
        className="block h-auto w-full"
      />
      <StatCard
        value="7+"
        label="Years Experience"
        icon="clock"
        tone="lime"
        className="top-[24%] left-[5%] xl:left-[10%]"
      />
      <StatCard
        value="12+"
        label="Skilled Technologies"
        icon="check"
        tone="orchid"
        className="top-[50%] right-0"
      />
    </div>
  );
}
