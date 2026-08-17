/* Shared flame shape — used across yellow chapters (hero, story). */

export default function Flame({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 64"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMax meet"
    >
      <path
        d="M24 2C30 12 42 20 42 36a18 18 0 0 1-36 0C6 20 18 12 24 2Zm0 22c-5 4-8 8-8 13a8 8 0 0 0 16 0c0-5-3-9-8-13Z"
        fill="currentColor"
      />
    </svg>
  );
}
