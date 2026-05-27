import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Wordmark, RingsLogo } from "./Wordmark";

describe("Wordmark", () => {
  it("renders the brand text by default", () => {
    render(<Wordmark />);
    expect(screen.getByText("Jiva Space")).toBeInTheDocument();
  });

  it("hides the brand text when showText is false", () => {
    render(<Wordmark showText={false} />);
    expect(screen.queryByText("Jiva Space")).not.toBeInTheDocument();
  });

  it("respects a custom size", () => {
    const { container } = render(<Wordmark size={50} />);
    const logo = container.querySelector("span[aria-hidden]") as HTMLElement;
    expect(logo.style.width).toBe("50px");
  });
});

describe("RingsLogo", () => {
  it("renders with default size", () => {
    const { container } = render(<RingsLogo />);
    const logo = container.querySelector("span[aria-hidden]") as HTMLElement;
    expect(logo.style.width).toBe("30px");
  });
});
