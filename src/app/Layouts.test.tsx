import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { PhoneLayout, TabLayout } from "./Layouts";

const renderLayout = (element: React.ReactNode) =>
  render(
    <MemoryRouter initialEntries={["/x"]}>
      <Routes>
        <Route element={element}>
          <Route path="/x" element={<div>Child Content</div>} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );

describe("PhoneLayout", () => {
  it("renders the status bar and outlet child", () => {
    renderLayout(<PhoneLayout />);
    expect(screen.getByText("9:41")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });
});

describe("TabLayout", () => {
  it("renders status bar, outlet child and the bottom nav", () => {
    renderLayout(<TabLayout />);
    expect(screen.getByText("9:41")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
