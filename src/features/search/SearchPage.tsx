import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { searchSpaces } from "../../data/mockApi";
import { SpaceCard } from "../../components/SpaceCard";
import type { Space } from "../../data/types";

export function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Space[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    searchSpaces(query).then((data) => {
      setResults(data);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="border-b border-line bg-bg px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-heading">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search spaces..."
              className="w-full rounded-lg bg-surface px-3 py-2 text-[15px] text-text placeholder:text-placeholder outline-none"
            />
          </div>
        </div>
      </div>

      <div className="screen-scroll space-y-3 p-4">
        {!query.trim() ? (
          <div className="text-center py-8 text-muted">
            Start typing to search spaces...
          </div>
        ) : loading ? (
          <div className="text-center py-8 text-muted">Searching...</div>
        ) : results.length > 0 ? (
          results.map((space) => <SpaceCard key={space.id} space={space} />)
        ) : (
          <div className="text-center py-8 text-muted">
            No spaces found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
