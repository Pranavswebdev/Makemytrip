import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { DiscoverPage } from "./DiscoverPage";

const renderDiscover = () =>
  render(
    <MemoryRouter initialEntries={["/discover"]}>
      <Routes>
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/space/:id" element={<div>Detail Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("DiscoverPage", () => {
  it("renders the heading", () => {
    renderDiscover();
    expect(screen.getByText("Discover")).toBeInTheDocument();
  });

  it("shows loading then renders area sections", async () => {
    renderDiscover();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText("East Jakarta")).toBeInTheDocument(),
    );
    expect(screen.getByText("Cibubur")).toBeInTheDocument();
    expect(screen.getByText("Malang")).toBeInTheDocument();
  });
});
