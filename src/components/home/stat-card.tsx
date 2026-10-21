import { Icon, type IconName } from '@/components/ui/icon';

type StatCardProps = Readonly<{
  value: string;
  label: string;
  icon: IconName;
  tone: 'lime' | 'orchid';
  className?: string;
}>;

export function StatCard({
  value,
  label,
  icon,
  tone,
  className = '',
}: StatCardProps) {
  return (
    <div
      className={`absolute flex min-h-[124px] w-28 flex-col justify-center rounded-[26px] border border-[#676776] bg-linear-[120deg,#242533e8,#191b2be8] px-3.5 py-[18px] shadow-[inset_0_0_16px_#ffffff03] backdrop-blur-md lg:min-h-[164px] lg:w-[155px] lg:rounded-[38px] lg:px-[22px] lg:py-6 ${className}`}
    >
      <div
        className={`flex items-start justify-between gap-2 ${tone === 'lime' ? 'text-[#96df61]' : 'text-[#c56ce8]'}`}
      >
        <strong className="text-[26px] leading-none lg:text-[34px]">
          {value}
        </strong>
        <Icon name={icon} className="text-lg lg:text-[24px]" />
      </div>
      <p className="mt-3 max-w-[110px] text-sm leading-[1.3] text-[#e1e0e9] lg:mt-[15px] lg:text-lg">
        {label}
      </p>
    </div>
  );
}
