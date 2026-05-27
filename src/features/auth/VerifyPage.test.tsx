import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { VerifyPage } from "./VerifyPage";
import { describe, it, expect, vi } from "vitest";

const renderWithRouter = (component: React.ReactNode) => {
  return render(
    <MemoryRouter
      initialEntries={[
        { pathname: "/verify", state: { email: "test@example.com" } },
      ]}
    >
      {component}
    </MemoryRouter>
  );
};

describe("VerifyPage", () => {
  it("renders the verification form with all fields", () => {
    renderWithRouter(<VerifyPage />);

    expect(
      screen.getByRole("heading", { name: /^Verification Code$/ })
    ).toBeInTheDocument();
    expect(screen.getByText(/Enter the 4 Digit Verification code/i)).toBeInTheDocument();
    expect(screen.getByText(/sent to your/i)).toBeInTheDocument();
  });

  it("renders four OTP input boxes", () => {
    renderWithRouter(<VerifyPage />);

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  it("renders Continue and Go Back buttons", () => {
    renderWithRouter(<VerifyPage />);

    expect(screen.getByRole("button", { name: /^Continue$/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /^Go Back$/ })).toBeInTheDocument();
  });

  it("renders Resend link", () => {
    renderWithRouter(<VerifyPage />);

    expect(screen.getByText("Resend")).toBeInTheDocument();
  });

  it("disables Continue button initially", () => {
    renderWithRouter(<VerifyPage />);

    const continueButton = screen.getByRole("button", { name: /^Continue$/ });
    expect(continueButton).toBeDisabled();
  });

  it("only accepts numeric input", async () => {
    const user = userEvent.setup();
    renderWithRouter(<VerifyPage />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    await user.type(inputs[0], "a");

    expect(inputs[0].value).toBe("");
  });

  it("auto-focuses to next field on input", async () => {
    const user = userEvent.setup();
    renderWithRouter(<VerifyPage />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    await user.type(inputs[0], "1");

    expect(inputs[1]).toHaveFocus();
  });

  it("enables Continue button when all fields are filled", async () => {
    const user = userEvent.setup();
    renderWithRouter(<VerifyPage />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    const continueButton = screen.getByRole("button", { name: /^Continue$/ });

    for (let i = 0; i < 4; i++) {
      await user.type(inputs[i], "1");
    }

    expect(continueButton).not.toBeDisabled();
  });

  it("handles backspace correctly", async () => {
    const user = userEvent.setup();
    renderWithRouter(<VerifyPage />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];

    // Fill first two fields
    await user.type(inputs[0], "1");
    await user.type(inputs[1], "2");

    // Backspace on second field should clear it
    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(inputs[1].value).toBe("");

    // Backspace on empty field should move to previous
    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(inputs[0]).toHaveFocus();
  });

  it("enables Continue button click when all codes are filled", async () => {
    const user = userEvent.setup();
    renderWithRouter(<VerifyPage />);

    const inputs = screen.getAllByRole("textbox") as HTMLInputElement[];
    const continueButton = screen.getByRole("button", { name: /^Continue$/ });

    for (let i = 0; i < 4; i++) {
      await user.type(inputs[i], "1");
    }

    // Button should be clickable when all filled
    expect(continueButton).not.toBeDisabled();
    await user.click(continueButton);

    // Verify no errors occurred by checking the page still renders
    expect(screen.getByRole("heading", { name: /^Verification Code$/ })).toBeInTheDocument();
  });

  it("shows resend toast on resend click", async () => {
    const user = userEvent.setup();
    renderWithRouter(<VerifyPage />);

    const resendButton = screen.getByText("Resend");
    await user.click(resendButton);

    await waitFor(() => {
      expect(screen.getByText(/Code resent to/i)).toBeInTheDocument();
    });
  });
});
