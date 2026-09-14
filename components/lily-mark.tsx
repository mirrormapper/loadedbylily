interface LilyMarkProps {
  className?: string
  title?: string
}

export function LilyMark({ className, title }: LilyMarkProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect width="32" height="32" rx="9" fill="#0E0B09" />
      <circle cx="16" cy="15.6" r="9.2" fill="#C17A3A" />
      <circle cx="12.4" cy="12.8" r="1.45" fill="#0E0B09" />
      <circle cx="18.6" cy="14.6" r="1.2" fill="#0E0B09" />
      <circle cx="14.8" cy="18.6" r="1.3" fill="#0E0B09" />
      <path
        d="M8.2 25.2 C 13 22.6, 19 22.6, 23.8 25.2"
        stroke="#E8B7C4"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

interface WordmarkProps {
  className?: string
  markClassName?: string
}

export function Wordmark({ className, markClassName }: WordmarkProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LilyMark className={markClassName ?? "h-8 w-8"} />
      <span className="text-[15px] font-semibold tracking-[-0.03em]">
        Loaded <span className="font-normal text-ash">by</span> Lily
      </span>
    </span>
  )
}
