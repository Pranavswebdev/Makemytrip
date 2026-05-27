import { useEffect, useState } from "react";
import { listByArea } from "../../data/mockApi";
import { MiniSpaceCard } from "../../components/SpaceCard";
import type { Space } from "../../data/types";

const AREAS = ["East Jakarta", "Cibubur", "Malang"];

export function DiscoverPage() {
  const [areaSpaces, setAreaSpaces] = useState<Record<string, Space[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(AREAS.map((area) => listByArea(area))).then((results) => {
      const grouped: Record<string, Space[]> = {};
      AREAS.forEach((area, i) => {
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
          AREAS.map((area) => (
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
