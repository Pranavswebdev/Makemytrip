import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RingsLogo } from "./Wordmark";

interface TopBarProps {
  title?: string;
  showLogo?: boolean;
  right?: ReactNode;
  onBack?: () => void;
  showBack?: boolean;
}

export function TopBar({
  title,
  showLogo = true,
  right,
  onBack,
  showBack = true,
}: TopBarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between px-6 pt-2.5 pb-1">
      {showBack ? (
        <button
          aria-label="Go back"
          onClick={onBack ?? (() => navigate(-1))}
          className="text-accent"
        >
          <ArrowLeft size={24} />
        </button>
      ) : (
        <span className="w-6" />
      )}
      <div className="flex items-center gap-2 font-serif text-[20px] font-semibold text-heading">
        {showLogo && <RingsLogo size={22} />}
        {title}
      </div>
      <span className="flex w-6 items-center justify-end text-accent">{right}</span>
    </div>
  );
}
