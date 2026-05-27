import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { describe, it, expect } from "vitest";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("LoginPage", () => {
  it("renders the login form with all fields", () => {
    renderWithRouter(<LoginPage />);

    expect(screen.getByRole("heading", { name: /^Log In$/ })).toBeInTheDocument();
    expect(screen.getByText(/Enter to a Jiva Space Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Your Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Your Password")).toBeInTheDocument();
  });

  it("renders the logo", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Jiva Space")).toBeInTheDocument();
  });

  it("renders sign in with Google and Apple buttons", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Log In With Google")).toBeInTheDocument();
    expect(screen.getByText("Log In With Apple")).toBeInTheDocument();
  });

  it("renders Forget Password link", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Forget Password")).toBeInTheDocument();
  });

  it("renders Sign Up link", () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  it("disables Login button initially", () => {
    renderWithRouter(<LoginPage />);
    const loginButton = screen.getByRole("button", { name: /^Login$/ });
    expect(loginButton).toBeDisabled();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    await user.type(emailInput, "invalid-email");
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email address")
      ).toBeInTheDocument();
    });
  });

  it("enables Login button when form is valid", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Your Password"
    ) as HTMLInputElement;

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    await waitFor(() => {
      const loginButton = screen.getByRole("button", { name: /^Login$/ });
      expect(loginButton).not.toBeDisabled();
    });
  });

  it("shows error message for invalid credentials", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Your Password"
    ) as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: /^Login$/ });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText("Invalid email or password")
      ).toBeInTheDocument();
    });
  });

  it("logs in successfully with seed credentials", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    const emailInput = screen.getByLabelText("Your Email") as HTMLInputElement;
    const passwordInput = screen.getByLabelText(
      "Your Password"
    ) as HTMLInputElement;
    const loginButton = screen.getByRole("button", { name: /^Login$/ });

    await user.type(emailInput, "demo@jiva.com");
    await user.type(passwordInput, "password123");
    await user.click(loginButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/home");
    });
  });

  it("navigates to sign up when Sign Up link is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    const signUpLink = screen.getByText("Sign Up");
    await user.click(signUpLink);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/signup");
    });
  });

  it("navigates to forgot password when Forget Password link is clicked", async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);

    const forgotPasswordLink = screen.getByText("Forget Password");
    await user.click(forgotPasswordLink);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/forgot-password");
    });
  });
});
