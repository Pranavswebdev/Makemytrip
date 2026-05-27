import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { SpaceCard, MiniSpaceCard } from "./SpaceCard";
import { spaces } from "../data/spaces";

const space = spaces[0];

const renderCard = (ui: React.ReactNode) =>
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <Routes>
        <Route path="/home" element={ui} />
        <Route path="/space/:id" element={<div>Detail Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("SpaceCard", () => {
  it("renders hotel name, rating and location", () => {
    renderCard(<SpaceCard space={space} />);
    expect(screen.getByText(space.hotel)).toBeInTheDocument();
    expect(screen.getByText(String(space.rating))).toBeInTheDocument();
    expect(screen.getByText(space.location)).toBeInTheDocument();
  });

  it("navigates to the space detail on click", async () => {
    const user = userEvent.setup();
    renderCard(<SpaceCard space={space} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Detail Page")).toBeInTheDocument();
  });
});

describe("MiniSpaceCard", () => {
  it("renders hotel name and rating", () => {
    renderCard(<MiniSpaceCard space={space} />);
    expect(screen.getByText(space.hotel)).toBeInTheDocument();
  });

  it("navigates to the space detail on click", async () => {
    const user = userEvent.setup();
    renderCard(<MiniSpaceCard space={space} />);
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Detail Page")).toBeInTheDocument();
  });
});
