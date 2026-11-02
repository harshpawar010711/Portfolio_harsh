import { describe, expect, it } from "vitest";

import { categories, hubVideos, projects } from "@/lib/portfolio";

// The user asked for the AI-generated work to come off the site entirely.
describe("Portfolio content", () => {
  it("has no AI Generation category or AI-generated videos", () => {
    expect(categories).not.toContain("AI Generation");
    expect(projects.some(project => project.category === "AI Generation")).toBe(false);
    expect(projects.some(project => project.url.includes("drive.google.com"))).toBe(false);
    expect(hubVideos.some(video => video.url.includes("drive.google.com"))).toBe(false);
  });

  it("still shows the real client reels and the showreel", () => {
    expect(projects).toHaveLength(7);
    expect(projects.map(project => project.id)).toEqual([1, 2, 3, 4, 5, 10, 6]);
    expect(hubVideos).toHaveLength(6);
  });
});
