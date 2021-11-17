import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter, Route, Routes } from "react-router";

function Testable() {
  return (
    <div>TestApp</div>
  )
}

test("renders route in outlet", () => {
  render(
    <MemoryRouter initialEntries={["/test"]}>
      <Routes>
          <Route path="/" element={<App />}>
            <Route path="test" element={<Testable />} />
          </Route>
      </Routes>
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/TestApp/);
  expect(linkElement).toBeInTheDocument();
});
