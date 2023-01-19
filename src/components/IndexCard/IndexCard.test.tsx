import { render, screen } from "@testing-library/react";
import IndexCard from "./IndexCard";

describe("IndexCard", () => {
  it("should render a scene heading input field", () => {
    render(<IndexCard />);

    const sceneHeading = screen.getByRole("textbox", {
      name: /scene heading/i,
    });

    expect(sceneHeading).toBeInTheDocument();
    expect(sceneHeading).toBeVisible();
  });

  it("should render a synopsis text area field", () => {
    render(<IndexCard />);

    const synopsis = screen.getByRole("textbox", { name: /synopsis/i });

    expect(synopsis).toBeInTheDocument();
    expect(synopsis).toBeVisible();
  });

  it("should render a conflict input field", () => {
    render(<IndexCard />);

    const conflict = screen.getByRole("textbox", {
      name: /conflict/i,
    });

    expect(conflict).toBeInTheDocument();
    expect(conflict).toBeVisible();
  });
});
