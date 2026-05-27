import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { WhereToPage } from "./WhereToPage";

const renderWhereTo = () =>
  render(
    <MemoryRouter initialEntries={["/where-to"]}>
      <Routes>
        <Route path="/where-to" element={<WhereToPage />} />
        <Route path="/discover" element={<div>Discover Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("WhereToPage", () => {
  it("renders the heading and a list of locations", () => {
    renderWhereTo();
    expect(
      screen.getByRole("heading", { name: "Where To?" }),
    ).toBeInTheDocument();
    expect(screen.getByText("East Jakarta")).toBeInTheDocument();
    expect(screen.getByText("Bali")).toBeInTheDocument();
  });

  it("navigates to discover when a location is selected", async () => {
    const user = userEvent.setup();
    renderWhereTo();
    await user.click(screen.getByText("Cibubur"));
    expect(screen.getByText("Discover Page")).toBeInTheDocument();
  });
});
