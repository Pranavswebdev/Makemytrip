import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { HomePage } from "./HomePage";

const renderHome = () =>
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<div>Search Page</div>} />
        <Route path="/where-to" element={<div>Where To Page</div>} />
        <Route path="/space/:id" element={<div>Detail Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("HomePage", () => {
  it("shows a loading state then renders popular spaces", async () => {
    renderHome();
    expect(screen.getByText(/Loading spaces/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("Popular Spaces")).toBeInTheDocument(),
    );
    await waitFor(() =>
      expect(screen.queryByText(/Loading spaces/i)).not.toBeInTheDocument(),
    );
  });

  it("renders the category pills", async () => {
    renderHome();
    await waitFor(() => screen.getByText("Popular Spaces"));
    for (const cat of ["Near You", "Hotel", "Apartment", "Guest"]) {
      expect(screen.getByText(cat)).toBeInTheDocument();
    }
  });

  it("navigates to search when the search bar is tapped", async () => {
    const user = userEvent.setup();
    renderHome();
    await user.click(screen.getByText("Search Spaces..."));
    expect(screen.getByText("Search Page")).toBeInTheDocument();
  });

  it("navigates to the location picker", async () => {
    const user = userEvent.setup();
    renderHome();
    await user.click(screen.getByText(/Where To\?/i));
    expect(screen.getByText("Where To Page")).toBeInTheDocument();
  });

  it("navigates to a space detail when a card is tapped", async () => {
    const user = userEvent.setup();
    renderHome();
    await waitFor(() => screen.getByText("Avanzel Hotel"));
    const card = screen.getByText("Avanzel Hotel").closest("button");
    await user.click(card!);
    expect(screen.getByText("Detail Page")).toBeInTheDocument();
  });
});
