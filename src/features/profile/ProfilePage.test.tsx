import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { ProfilePage } from "./ProfilePage";
import { seedUser } from "../../data/user";

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <Routes>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>,
  );

describe("ProfilePage", () => {
  it("shows loading then renders the user's profile", async () => {
    renderPage();
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText(seedUser.name)).toBeInTheDocument(),
    );
    expect(screen.getByText(seedUser.email)).toBeInTheDocument();
    expect(screen.getByText(seedUser.phone)).toBeInTheDocument();
  });

  it("logs out and routes to login", async () => {
    const user = userEvent.setup();
    renderPage();
    await waitFor(() => screen.getByText("Log Out"));
    await user.click(screen.getByText("Log Out"));
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});
