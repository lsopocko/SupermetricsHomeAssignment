import { render, screen } from "@testing-library/react";
import PostsAuthorsList from "../PostsAuthorsList";
import { PostAuthorModel } from "../PostAuthor";
import { MemoryRouter, Route, Routes } from "react-router";

const fakeAuthors: PostAuthorModel[] = [
  {
    id: "fakeId_1",
    name: "fakeName_1",
    numberOfPosts: 1
  },
  {
    id: "fakeId_2",
    name: "fakeName_2",
    numberOfPosts: 1
  },
  {
    id: "fakeId_3",
    name: "fakeName_3w",
    numberOfPosts: 1
  }
]

test("renders posts authors list", () => {
  render(
    <MemoryRouter initialEntries={["/posts/fakeId_2"]}>
      <Routes>
        <Route path="/posts/:authorId" element={<PostsAuthorsList authors={fakeAuthors} />} />
      </Routes>
    </MemoryRouter>
  );

  const authorElement = screen.getByText(/fakeName_2/);
  expect(authorElement).toBeInTheDocument();
  expect(authorElement).toHaveTextContent("(1)");
  expect(authorElement.parentElement).toHaveClass("active");
});
