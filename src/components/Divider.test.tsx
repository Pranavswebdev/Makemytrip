import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OrDivider } from "./Divider";

describe("OrDivider", () => {
  it("renders the default label", () => {
    render(<OrDivider />);
    expect(screen.getByText("Or with")).toBeInTheDocument();
  });

  it("renders a custom label", () => {
    render(<OrDivider label="Continue with" />);
    expect(screen.getByText("Continue with")).toBeInTheDocument();
  });
});
