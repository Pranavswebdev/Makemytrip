import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { SuccessPage } from "./SuccessPage";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/booking/success"]}>
      <Routes>
        <Route path="/booking/success" element={<SuccessPage />} />
        <Route path="/home" element={<div>Home Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("SuccessPage", () => {
  it("renders the confirmation message", () => {
    renderPage();
    expect(screen.getByText("Booking Confirmed!")).toBeInTheDocument();
  });

  it("navigates home on Back to Home", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByText("Back to Home"));
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });
});
