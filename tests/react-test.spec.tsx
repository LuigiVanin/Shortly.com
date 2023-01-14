import { render, screen } from "@testing-library/react";
import React from "react";

test("renders learn react link", () => {
    const { getByText } = render(<p>Ola</p>);
    const linkElement = screen.getByText(/Ola/i);
    expect(linkElement).not.toBe(null);
});

export {};
