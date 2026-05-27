import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { BottomNav } from "./BottomNav";

describe("BottomNav", () => {
  it("renders all four navigation tabs", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <BottomNav />
      </MemoryRouter>,
    );
    for (const label of ["Home", "Discover", "Chat", "Profile"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("marks the active tab with the accent color", () => {
    render(
      <MemoryRouter initialEntries={["/discover"]}>
        <BottomNav />
      </MemoryRouter>,
    );
    const active = screen.getByText("Discover").closest("a");
    expect(active?.className).toContain("text-accent");
  });
});
