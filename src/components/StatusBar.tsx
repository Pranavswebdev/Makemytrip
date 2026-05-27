import { Signal, Wifi, BatteryFull } from "lucide-react";

export function StatusBar() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-between px-7 pt-3.5 pb-1 text-white shrink-0"
    >
      <span className="text-[15px] font-semibold">9:41</span>
      <div className="flex items-center gap-1.5">
        <Signal size={16} />
        <Wifi size={16} />
        <BatteryFull size={20} />
      </div>
    </div>
  );
}
