interface Props {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  size?: 'sm' | 'md'
}

export default function Toggle({ checked, onChange, label, size = 'md' }: Props) {
  const dims = size === 'sm' ? 'h-5 w-9' : 'h-6 w-11'
  const knob = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
  const shift = size === 'sm' ? 'translate-x-4' : 'translate-x-5'
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition ${dims} ${
        checked ? 'bg-accent-600' : 'bg-slate-300'
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2`}
    >
      <span className={`${knob} rounded-full bg-white shadow transition ${checked ? shift : 'translate-x-0'}`} />
    </button>
  )
}
