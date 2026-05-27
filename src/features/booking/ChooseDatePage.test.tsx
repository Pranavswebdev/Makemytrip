import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { ChooseDatePage } from "./ChooseDatePage";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/booking/date"]}>
      <Routes>
        <Route path="/booking/date" element={<ChooseDatePage />} />
        <Route path="/booking/payment" element={<div>Payment Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("ChooseDatePage", () => {
  it("renders heading and date inputs", () => {
    renderPage();
    expect(screen.getByText("Choose Date")).toBeInTheDocument();
    expect(screen.getByText("Check In")).toBeInTheDocument();
    expect(screen.getByText("Check Out")).toBeInTheDocument();
  });

  it("disables Continue until a valid range is chosen", async () => {
    const user = userEvent.setup();
    renderPage();
    const continueBtn = screen.getByRole("button", { name: "Continue" });
    expect(continueBtn).toBeDisabled();

    const [checkIn, checkOut] = screen.getAllByDisplayValue("");
    await user.type(checkIn, "2026-06-01");
    await user.type(checkOut, "2026-06-03");
    expect(continueBtn).not.toBeDisabled();
  });

  it("keeps Continue disabled when checkout precedes checkin (boundary)", async () => {
    const user = userEvent.setup();
    renderPage();
    const [checkIn, checkOut] = screen.getAllByDisplayValue("");
    await user.type(checkIn, "2026-06-05");
    await user.type(checkOut, "2026-06-01");
    expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
  });

  it("advances to payment on a valid range", async () => {
    const user = userEvent.setup();
    renderPage();
    const [checkIn, checkOut] = screen.getAllByDisplayValue("");
    await user.type(checkIn, "2026-06-01");
    await user.type(checkOut, "2026-06-03");
    await user.click(screen.getByRole("button", { name: "Continue" }));
    expect(screen.getByText("Payment Page")).toBeInTheDocument();
  });
});
