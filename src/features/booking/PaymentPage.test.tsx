import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { PaymentPage } from "./PaymentPage";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/booking/payment"]}>
      <Routes>
        <Route path="/booking/payment" element={<PaymentPage />} />
        <Route path="/booking/success" element={<div>Success Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("PaymentPage", () => {
  it("renders all payment methods", () => {
    renderPage();
    expect(screen.getByText("Payment Method")).toBeInTheDocument();
    expect(screen.getByText("Credit/Debit Card")).toBeInTheDocument();
    expect(screen.getByText("UPI")).toBeInTheDocument();
    expect(screen.getByText("Digital Wallet")).toBeInTheDocument();
  });

  it("allows selecting a different payment method", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByText("UPI"));
    const upiButton = screen.getByText("UPI").closest("button");
    expect(upiButton?.className).toContain("border-accent");
  });

  it("completes payment and navigates to success", async () => {
    const user = userEvent.setup();
    renderPage();
    await user.click(screen.getByText("Complete Payment"));
    expect(screen.getByText("Success Page")).toBeInTheDocument();
  });
});
