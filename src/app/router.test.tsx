import { describe, it, expect } from "vitest";
import { router } from "./router";

describe("router", () => {
  it("redirects the index route to /login", () => {
    const root = router.routes.find((r) => r.path === "/");
    expect(root).toBeDefined();
  });

  it("registers the expected auth + app routes", () => {
    const paths = router.routes
      .flatMap((r) => r.children ?? [r])
      .map((r) => r.path)
      .filter(Boolean);
    for (const p of [
      "/login",
      "/signup",
      "/verify",
      "/home",
      "/discover",
      "/profile",
      "/booking/payment",
    ]) {
      expect(paths).toContain(p);
    }
  });
});
