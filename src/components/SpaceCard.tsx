import { Star, Users, BedDouble, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Space } from "../data/types";
import { formatRs } from "../lib/format";

export function SpaceCard({ space }: { space: Space }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/space/${space.id}`)}
      className="w-full rounded-2xl border border-line bg-surface p-2.5 text-left"
    >
      <div className="h-[140px] rounded-xl bg-gradient-to-br from-[#4a4a44] to-[#6b655c]" />
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[14px] font-bold text-accent">
          {formatRs(space.pricePerNight)}{" "}
          <span className="font-normal text-muted">/{space.nightsLabel}</span>
        </span>
        <span className="flex items-center gap-1 text-[13px] text-heading">
          <Star size={13} className="fill-accent text-accent" />
          {space.rating}
        </span>
      </div>
      <div className="mt-0.5 flex items-center justify-between">
        <span className="font-serif text-[18px] text-heading">{space.hotel}</span>
        <span className="flex items-center gap-2 text-[12px] text-muted">
          <span className="flex items-center gap-1">
            <Users size={13} />
            {space.guests}
          </span>
          <span className="flex items-center gap-1">
            <BedDouble size={13} />
            {space.beds}
          </span>
        </span>
      </div>
      <div className="mt-1 flex items-center gap-1 text-[12px] text-muted">
        <MapPin size={12} />
        {space.location}
      </div>
    </button>
  );
}

export function MiniSpaceCard({ space }: { space: Space }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(`/space/${space.id}`)}
      className="w-[150px] shrink-0 rounded-2xl border border-line bg-surface p-2.5 text-left"
    >
      <div className="h-[90px] rounded-xl bg-gradient-to-br from-[#4a4a44] to-[#6b655c]" />
      <div className="mt-2 font-serif text-[14px] text-heading">{space.hotel}</div>
      <div className="text-[12px] font-bold text-accent">
        {formatRs(space.pricePerNight)}{" "}
        <span className="font-normal text-muted">/{space.nightsLabel}</span>
      </div>
      <div className="flex items-center gap-1 text-[11px] text-muted">
        <Star size={11} className="fill-accent text-accent" />
        {space.rating}
      </div>
    </button>
  );
}
