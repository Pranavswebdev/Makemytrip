interface WordmarkProps {
  size?: number;
  showText?: boolean;
}

export function RingsLogo({ size = 30 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="relative inline-block rounded-full border-[3px] border-accent"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-1 rounded-full border-2 border-accent" />
    </span>
  );
}

export function Wordmark({ size = 30, showText = true }: WordmarkProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <RingsLogo size={size} />
      {showText && (
        <span className="font-serif text-[20px] font-semibold text-heading">
          Jiva Space
        </span>
      )}
    </div>
  );
}
