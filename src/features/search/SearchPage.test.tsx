import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { SearchPage } from "./SearchPage";

const renderSearch = () =>
  render(
    <MemoryRouter initialEntries={["/search"]}>
      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/space/:id" element={<div>Detail Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("SearchPage", () => {
  it("shows the empty prompt before typing", () => {
    renderSearch();
    expect(screen.getByText(/Start typing to search/i)).toBeInTheDocument();
  });

  it("returns matching results for a query", async () => {
    const user = userEvent.setup();
    renderSearch();
    await user.type(screen.getByPlaceholderText("Search spaces..."), "Malang");
    await waitFor(() =>
      expect(
        screen.getAllByText((t) => t.includes("Malang")).length,
      ).toBeGreaterThan(0),
    );
  });

  it("shows the no-results state for an unknown keyword", async () => {
    const user = userEvent.setup();
    renderSearch();
    await user.type(screen.getByPlaceholderText("Search spaces..."), "zzzzz");
    await waitFor(() =>
      expect(screen.getByText(/No spaces found/i)).toBeInTheDocument(),
    );
  });

  it("navigates back when the back button is tapped", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/home", "/search"]}>
        <Routes>
          <Route path="/home" element={<div>Home Page</div>} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>,
    );
    const backBtn = screen.getAllByRole("button")[0];
    await user.click(backBtn);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
