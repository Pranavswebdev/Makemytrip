import { Outlet } from "react-router-dom";
import { StatusBar } from "../components/StatusBar";
import { BottomNav } from "../components/BottomNav";

/** Phone shell with status bar; used for full-screen flows (auth, booking). */
export function PhoneLayout() {
  return (
    <div className="app-shell">
      <div className="phone">
        <StatusBar />
        <main className="screen-scroll no-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/** Phone shell with status bar + persistent bottom navigation. */
export function TabLayout() {
  return (
    <div className="app-shell">
      <div className="phone">
        <StatusBar />
        <main className="screen-scroll no-scrollbar">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
