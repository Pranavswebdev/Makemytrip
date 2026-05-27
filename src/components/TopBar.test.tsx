import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { TopBar } from "./TopBar";

const renderInRouter = (ui: React.ReactNode) =>
  render(<MemoryRouter>{ui}</MemoryRouter>);

describe("TopBar", () => {
  it("renders a title", () => {
    renderInRouter(<TopBar title="Profile" />);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

  it("shows a back button by default", () => {
    renderInRouter(<TopBar title="Detail" />);
    expect(screen.getByLabelText("Go back")).toBeInTheDocument();
  });

  it("hides the back button when showBack is false", () => {
    renderInRouter(<TopBar title="Home" showBack={false} />);
    expect(screen.queryByLabelText("Go back")).not.toBeInTheDocument();
  });

  it("invokes the custom onBack handler", async () => {
    const onBack = vi.fn();
    const user = userEvent.setup();
    renderInRouter(<TopBar title="X" onBack={onBack} />);
    await user.click(screen.getByLabelText("Go back"));
    expect(onBack).toHaveBeenCalledOnce();
  });

  it("renders a right-side slot", () => {
    renderInRouter(<TopBar title="X" right={<span>R</span>} />);
    expect(screen.getByText("R")).toBeInTheDocument();
  });
});
