import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Field } from "./Field";

describe("Field", () => {
  it("renders the label and associates it with the input", () => {
    render(<Field label="Your Email" placeholder="you@example.com" />);
    expect(screen.getByText("Your Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument();
  });

  it("does not render an error message when error is absent", () => {
    const { container } = render(<Field label="Name" />);
    expect(container.querySelector(".text-accent")).toBeNull();
  });

  it("renders an inline error message when provided", () => {
    render(<Field label="Email" error="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
  });

  it("forwards arbitrary input props (type)", () => {
    render(<Field label="Password" type="password" />);
    expect(screen.getByText("Password")).toBeInTheDocument();
  });
});
