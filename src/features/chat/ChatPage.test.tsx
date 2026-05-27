import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ChatPage } from "./ChatPage";

describe("ChatPage", () => {
  it("renders the coming-soon placeholder", () => {
    render(<ChatPage />);
    expect(screen.getByText("Chat is coming soon.")).toBeInTheDocument();
  });
});
