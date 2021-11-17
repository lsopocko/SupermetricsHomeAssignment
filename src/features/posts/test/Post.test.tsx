import React from "react";
import { render, screen } from "@testing-library/react";
import Post from "../Post";

test("renders route in outlet", () => {
  render(
    <Post post={{
        createdTime: 596674801000,
        message: "TestMessage",
        id: "testId",
        fromId: "testFromId",
        fromName: "testFromName"
    }} />
  );
  const timeElement = screen.getByText(/November 28/);
  const nessageElement = screen.getByText(/TestMessage/);
  expect(timeElement).toBeInTheDocument();
  expect(nessageElement).toBeInTheDocument();
});
