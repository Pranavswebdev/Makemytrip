import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { SpaceDetailPage } from "./SpaceDetailPage";
import { spaces } from "../../data/spaces";

const space = spaces[0];

const renderDetail = (id: string) =>
  render(
    <MemoryRouter initialEntries={[`/space/${id}`]}>
      <Routes>
        <Route path="/space/:id" element={<SpaceDetailPage />} />
        <Route path="/booking/date" element={<div>Choose Date Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("SpaceDetailPage", () => {
  it("shows loading then renders the space details", async () => {
    renderDetail(space.id);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(space.hotel)).toBeInTheDocument(),
    );
    expect(screen.getByText(space.name)).toBeInTheDocument();
    expect(screen.getByText(`${space.guests} Guests`)).toBeInTheDocument();
  });

  it("shows a not-found message for an unknown id", async () => {
    renderDetail("does-not-exist");
    await waitFor(() =>
      expect(screen.getByText("Space not found")).toBeInTheDocument(),
    );
  });

  it("navigates to booking date on Book Now", async () => {
    const user = userEvent.setup();
    renderDetail(space.id);
    await waitFor(() => screen.getByText("Book Now"));
    await user.click(screen.getByText("Book Now"));
    expect(screen.getByText("Choose Date Page")).toBeInTheDocument();
  });
});
