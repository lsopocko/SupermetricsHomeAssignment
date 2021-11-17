import { render, screen } from "@testing-library/react";
import PostAuthor from "../PostAuthor";

test("renders post author with number of posts", () => {
  render(
    <PostAuthor author={{
        id: "testAuthorId",
        name: "testAuthorName",
        numberOfPosts: 10
    }} />
  );

  const authorElement = screen.getByText(/testAuthorName/);
  expect(authorElement).toBeInTheDocument();
  expect(authorElement).toHaveTextContent("(10)");
});
