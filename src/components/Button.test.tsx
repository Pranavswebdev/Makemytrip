import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a primary button with accent background", () => {
    render(<Button>Login</Button>);
    const btn = screen.getByRole("button", { name: "Login" });
    expect(btn.className).toContain("bg-accent");
  });

  it("renders an outline button variant", () => {
    render(<Button variant="outline">Go Back</Button>);
    const btn = screen.getByRole("button", { name: "Go Back" });
    expect(btn.className).toContain("border-accent");
  });
});
