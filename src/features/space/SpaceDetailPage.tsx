import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Star, Users, BedDouble, Bath, MapPin } from "lucide-react";
import { getSpace } from "../../data/mockApi";
import { Button } from "../../components/Button";
import { formatRs } from "../../lib/format";
import type { Space } from "../../data/types";

export function SpaceDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getSpace(id).then((data) => {
      setSpace(data || null);
      setLoading(false);
    });
  }, [id]);

  if (loading)
    return (
      <div className="flex h-full items-center justify-center bg-bg text-muted">
        Loading...
      </div>
    );

  if (!space)
    return (
      <div className="flex h-full items-center justify-center bg-bg text-muted">
        Space not found
      </div>
    );

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="border-b border-line bg-bg px-4 py-3">
        <button onClick={() => navigate(-1)} className="text-heading">
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="screen-scroll space-y-6 p-4 pb-24">
        {/* Photo */}
        <div className="h-[200px] rounded-2xl bg-gradient-to-br from-[#4a4a44] to-[#6b655c]" />

        {/* Info */}
        <div className="space-y-4">
          <div>
            <h1 className="mb-2 font-serif text-[24px] text-heading">
              {space.hotel}
            </h1>
            <p className="text-[14px] text-muted">{space.name}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[18px] font-bold text-accent">
              {formatRs(space.pricePerNight)}{" "}
              <span className="font-normal text-muted">/{space.nightsLabel}</span>
            </span>
            <span className="flex items-center gap-1 text-heading">
              <Star size={16} className="fill-accent text-accent" />
              {space.rating}
              <span className="text-[12px] text-muted">({space.reviews})</span>
            </span>
          </div>

          <div className="flex gap-4 text-[13px] text-muted">
            <div className="flex items-center gap-1">
              <Users size={16} />
              {space.guests} Guests
            </div>
            <div className="flex items-center gap-1">
              <BedDouble size={16} />
              {space.beds} Beds
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} />
              {space.baths} Baths
            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-muted">
            <MapPin size={16} />
            {space.location}
          </div>

          <div className="space-y-2 pt-4">
            <h3 className="font-semibold text-heading">Amenities</h3>
            <p className="text-[13px] text-muted">
              {space.photoCount} photos • {space.bedrooms} bedrooms
            </p>
          </div>

          <Button onClick={() => navigate("/booking/date")}>Book Now</Button>
        </div>
      </div>
    </div>
  );
}
