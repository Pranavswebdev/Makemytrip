import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Wordmark } from "../../components/Wordmark";

const LOCATIONS = [
  { name: "East Jakarta", country: "Indonesia" },
  { name: "Cibubur", country: "Indonesia" },
  { name: "Malang", country: "Indonesia" },
  { name: "Jakarta", country: "Indonesia" },
  { name: "Bali", country: "Indonesia" },
];

export function WhereToPage() {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-bg">
      <div className="screen-scroll flex flex-col gap-6 p-6 pb-24 pt-8">
        <Wordmark size={24} />
        <h1 className="text-[28px] font-semibold text-heading">Where To?</h1>
        <div className="space-y-3">
          {LOCATIONS.map((loc) => (
            <button
              key={loc.name}
              onClick={() => navigate("/discover")}
              className="w-full rounded-lg border border-line bg-surface px-4 py-4 text-left"
            >
              <div className="font-semibold text-heading">{loc.name}</div>
              <div className="text-[13px] text-muted">{loc.country}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
