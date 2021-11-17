import { render, screen , fireEvent} from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { PostsList } from "../PostsList";
import { PostModel } from "../Post";

const fakePosts: PostModel[] = [
  {
    id: "fakeId_1",
    message: "fakePost_1",
    createdTime: 596674800000,
    fromId: "fakeUser_1",
    fromName: "fakeName_1"
  },
  {
    id: "fakeId_2",
    message: "fakePost_2",
    createdTime: 596761200000,
    fromId: "fakeUser_2",
    fromName: "fakeName_2"
  },
  {
    id: "fakeId_3",
    message: "fakePost_3",
    createdTime: 596847600000,
    fromId: "fakeUser_3",
    fromName: "fakeName_3"
  }
]

describe("Posts list", () => {
    test("renders posts newest to oldest", () => {
        render(
          <MemoryRouter initialEntries={["/posts"]}>
            <Routes>
              <Route path="/posts" element={<PostsList posts={fakePosts} />} />
            </Routes>
          </MemoryRouter>
        );
      
        const postsElements = screen.getAllByText(/fakePost/);
        expect(postsElements[0]).toHaveTextContent(/fakePost_3/);
        expect(postsElements[1]).toHaveTextContent(/fakePost_2/);
        expect(postsElements[2]).toHaveTextContent(/fakePost_1/);
      
    });

    test("renders posts oldest to newest", () => {
        render(
          <MemoryRouter initialEntries={["/posts"]}>
            <Routes>
              <Route path="/posts" element={<PostsList posts={fakePosts} />} />
            </Routes>
          </MemoryRouter>
        );
        
        const ascOrderButton = screen.getByTitle(/From oldest/);

        fireEvent.click(ascOrderButton);
      
        const postsElements = screen.getAllByText(/fakePost/);
        expect(postsElements[0]).toHaveTextContent(/fakePost_1/);
        expect(postsElements[1]).toHaveTextContent(/fakePost_2/);
        expect(postsElements[2]).toHaveTextContent(/fakePost_3/);
      
    });

    test("renders only posts from given author when url param is present", () => {
        render(
          <MemoryRouter initialEntries={["/posts/fakeUser_2"]}>
            <Routes>
              <Route path="/posts/:authorId" element={<PostsList posts={fakePosts} />} />
            </Routes>
          </MemoryRouter>
        );
      
        const postElement = screen.getByText(/fakePost_2/);
        expect(postElement).toBeInTheDocument();
    });

    test("renders only posts with given query in message", () => {
        render(
          <MemoryRouter initialEntries={["/posts"]}>
            <Routes>
              <Route path="/posts" element={<PostsList posts={fakePosts} />} />
            </Routes>
          </MemoryRouter>
        );
      
        const searchInput = screen.getByPlaceholderText(/Search/);

        fireEvent.change(searchInput, { target: { value: "Post_3" }})

        const visiblePostElement = screen.getByText(/fakePost_3/);
        const hiddenPostElement = screen.queryByText(/fakePost_2/);
        expect(visiblePostElement).toBeInTheDocument();
        expect(hiddenPostElement).toBeNull();
    });
})
