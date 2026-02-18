'use client'

interface ToggleSwitchProps {
    enabled: boolean
    onToggle?: () => void
    label?: string
    description?: string
}

export const ToggleSwitch = ({ enabled, onToggle, label, description }: ToggleSwitchProps) => {
    return (
        <div className="flex items-center justify-between">
            {(label || description) && (
                <div className="flex-1 mr-4">
                    {label && <span className="text-sm font-medium text-white">{label}</span>}
                    {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
                </div>
            )}
            <button
                onClick={onToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-navy-900 cursor-pointer ${enabled ? 'bg-cyan-500' : 'bg-navy-700'
                    }`}
                role="switch"
                aria-checked={enabled}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    )
}
