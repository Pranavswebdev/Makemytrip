export function OrDivider({ label = "Or with" }: { label?: string }) {
  return (
    <div className="my-4 flex items-center gap-2.5 text-[13px] text-muted">
      <span className="h-px flex-1 bg-line" />
      {label}
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
