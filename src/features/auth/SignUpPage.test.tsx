import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SignUpPage } from "./SignUpPage";
import { describe, it, expect, vi } from "vitest";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("SignUpPage", () => {
  it("renders the sign up form with all fields", () => {
    renderWithRouter(<SignUpPage />);

    expect(screen.getByRole("heading", { name: /^Sign Up$/ })).toBeInTheDocument();
    expect(screen.getByText(/Create a Jiva Space Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Your Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Re-Enter Password")).toBeInTheDocument();
  });

  it("renders the logo", () => {
    renderWithRouter(<SignUpPage />);
    expect(screen.getByText("Jiva Space")).toBeInTheDocument();
  });

  it("renders sign in with Google and Apple buttons", () => {
    renderWithRouter(<SignUpPage />);
    expect(screen.getByText("Sign In With Google")).toBeInTheDocument();
    expect(screen.getByText("Sign In With Apple")).toBeInTheDocument();
  });

  it("renders Already Has An Account link", () => {
    renderWithRouter(<SignUpPage />);
    expect(screen.getByText("Already Has An Account?")).toBeInTheDocument();
  });

  it("disables Sign Up button initially", () => {
    renderWithRouter(<SignUpPage />);
    const signUpButton = screen.getByRole("button", { name: /^Sign Up$/ });
    expect(signUpButton).toBeDisabled();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignUpPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    await user.type(emailInput, "invalid-email");
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });
  });

  it("shows validation error when passwords don't match", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignUpPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Your Password"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      "Re-Enter Password"
    ) as HTMLInputElement;

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password456");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText("Passwords don't match")).toBeInTheDocument();
    });
  });

  it("enables Sign Up button when form is valid", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignUpPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Your Password"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      "Re-Enter Password"
    ) as HTMLInputElement;

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");

    await waitFor(() => {
      const signUpButton = screen.getByRole("button", { name: /^Sign Up$/ });
      expect(signUpButton).not.toBeDisabled();
    });
  });

  it("navigates to login when Already Has An Account is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignUpPage />);

    const loginLink = screen.getByText("Already Has An Account?");
    await user.click(loginLink);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
    });
  });

  it("navigates to verify page with email on successful submission", async () => {
    const user = userEvent.setup();
    renderWithRouter(<SignUpPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Your Password"
    ) as HTMLInputElement;
    const confirmPasswordInput = screen.getByLabelText(
      "Re-Enter Password"
    ) as HTMLInputElement;
    const signUpButton = screen.getByRole("button", { name: /^Sign Up$/ });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(signUpButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/verify");
    });
  });
});
