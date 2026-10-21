export type IconName =
  | 'code'
  | 'arrow'
  | 'grid'
  | 'download'
  | 'clock'
  | 'check'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'send';

const symbols: Record<IconName, string> = {
  code: 'code_xml',
  arrow: 'arrow_right_alt',
  grid: 'view_cozy',
  download: 'download',
  clock: 'schedule',
  check: 'task_alt',
  mail: 'mail',
  phone: 'call',
  pin: 'location_on',
  send: 'send',
};

export function Icon({
  name,
  className = '',
}: Readonly<{ name: IconName; className?: string }>) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 leading-none ${className}`}
    >
      <span className="material-symbols-outlined">{symbols[name]}</span>
    </span>
  );
}
