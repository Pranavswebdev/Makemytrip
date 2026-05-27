import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listByArea } from "../../data/mockApi";
import { MiniSpaceCard } from "../../components/SpaceCard";
import type { Space } from "../../data/types";

export function DiscoverPage() {
  const navigate = useNavigate();
  const [areaSpaces, setAreaSpaces] = useState<Record<string, Space[]>>({});
  const [loading, setLoading] = useState(true);
  const areas = ["East Jakarta", "Cibubur", "Malang"];

  useEffect(() => {
    Promise.all(areas.map((area) => listByArea(area))).then((results) => {
      const grouped: Record<string, Space[]> = {};
      areas.forEach((area, i) => {
        grouped[area] = results[i];
      });
      setAreaSpaces(grouped);
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="screen-scroll space-y-6 p-4 pb-24">
        <h1 className="text-[24px] font-semibold text-heading">Discover</h1>
        {loading ? (
          <div className="text-center text-muted">Loading...</div>
        ) : (
          areas.map((area) => (
            <div key={area}>
              <h2 className="mb-3 text-[16px] font-semibold text-heading">
                {area}
              </h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {areaSpaces[area]?.map((space) => (
                  <MiniSpaceCard key={space.id} space={space} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
