import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { listPopularSpaces } from "../../data/mockApi";
import { SpaceCard } from "../../components/SpaceCard";
import { Wordmark } from "../../components/Wordmark";
import type { Space } from "../../data/types";

export function HomePage() {
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPopularSpaces().then((data) => {
      setSpaces(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex h-full flex-col bg-bg">
      {/* Header */}
      <div className="border-b border-line bg-bg px-4 py-4">
        <div className="flex items-center justify-between">
          <Wordmark size={20} showText={false} />
          <button aria-label="Notifications" className="text-heading hover:opacity-70">
            <Bell size={20} />
          </button>
        </div>
      </div>

      <h1 className="sr-only">Home</h1>

      {/* Content */}
      <div className="screen-scroll flex flex-col gap-6 p-4">
        {/* Location and Search */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/where-to")}
            className="w-full rounded-lg bg-surface px-3 py-2 text-left text-[13px] text-muted"
          >
            Where To? East Jakarta, Indonesia
          </button>
          <button
            onClick={() => navigate("/search")}
            className="flex items-center gap-2 rounded-xl border border-accent bg-surface px-4 py-3 text-[15px] text-placeholder"
          >
            <Search size={16} />
            Search Spaces...
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Near You", "Hotel", "Apartment", "Guest"].map((cat) => (
            <button
              key={cat}
              className="shrink-0 rounded-full bg-accent px-4 py-1 text-[13px] font-medium text-bg"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Popular Spaces */}
        <div>
          <h2 className="mb-4 text-[18px] font-semibold text-heading">
            Popular Spaces
          </h2>
          <div className="space-y-3">
            {loading ? (
              <div className="text-center text-muted">Loading spaces...</div>
            ) : spaces.length > 0 ? (
              spaces.map((space) => <SpaceCard key={space.id} space={space} />)
            ) : (
              <div className="text-center text-muted">No spaces found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
