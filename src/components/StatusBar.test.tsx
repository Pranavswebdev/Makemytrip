import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StatusBar } from "./StatusBar";

describe("StatusBar", () => {
  it("renders the iOS-style time", () => {
    render(<StatusBar />);
    expect(screen.getByText("9:41")).toBeInTheDocument();
  });
});
