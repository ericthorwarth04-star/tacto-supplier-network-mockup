interface Props {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  size?: 'sm' | 'md'
  onDark?: boolean
}

export default function Toggle({ checked, onChange, label, size = 'md', onDark = false }: Props) {
  const dims = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11'
  const knob = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const shift = size === 'sm' ? 'translate-x-4' : 'translate-x-5'
  const on = onDark ? 'bg-orange' : 'bg-black'
  const off = onDark ? 'bg-white/20' : 'bg-stone'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition ${dims} ${
        checked ? on : off
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2`}
    >
      <span className={`${knob} rounded-full bg-white shadow-sm transition ${checked ? shift : 'translate-x-0'}`} />
    </button>
  )
}
