import './GaneshMark.css'

export default function GaneshMark() {
  return (
    <svg
      className="ganesh-mark"
      viewBox="0 0 100 110"
      role="img"
      aria-label="Stylized Ganesha symbol"
    >
      <g fill="currentColor">
        <circle cx="50" cy="12" r="5.5" />
        <rect x="42" y="21" width="16" height="4" rx="2" />
        <rect x="37" y="28" width="26" height="4.5" rx="2.25" />
        <circle cx="50" cy="41" r="3" />
        <circle cx="46" cy="101" r="2.5" />
        <circle cx="50" cy="106" r="1.8" />
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="5.5"
      >
        <path d="M42 37C35 30 26 30 14 36c8 4 12 9 15 17 2 6 7 10 15 16 8 7 8 14 1 21-5 5-5 9-2 13" />
        <path d="M58 37c7-7 16-7 28-1-8 4-12 9-15 17" />
        <path d="M50 44c-2 9 1 16 9 24 9 8 7 15-3 23-5 4-7 8-6 12" />
      </g>
    </svg>
  )
}
