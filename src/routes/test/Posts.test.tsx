import { act, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import store from "../../store";
import Posts from "../Posts";

const fakePostsJson: any = [
    {
        id: "fakeId_1",
        message: "fakePost_1",
        created_time: new Date(596674800000).toString(),
        from_id: "fakeUser_1",
        from_name: "fakeName_1"
    },
    {
        id: "fakeId_2",
        message: "fakePost_2",
        created_time: new Date(596761200000).toString(),
        from_id: "fakeUser_2",
        from_name: "fakeName_2"
    },
    {
        id: "fakeId_3",
        message: "fakePost_3",
        created_time: new Date(596847600000).toString(),
        from_id: "fakeUser_3",
        from_name: "fakeName_3"
    }
]

describe("Posts route", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(JSON.stringify({ data: { posts: fakePostsJson } }));
    })

    test("retrives posts and renders them from store", async () => {
        await act(async () => {
            render(
                <Provider store={store}>
                    <MemoryRouter initialEntries={["/posts"]}>
                        <Routes>
                            <Route path="/posts" element={<Posts />} />
                        </Routes>
                    </MemoryRouter>
                </Provider>
            );
        });
                
        const postsElements = screen.getAllByText(/fakePost/);
        expect(postsElements[0]).toHaveTextContent(/fakePost_3/);
        expect(postsElements[1]).toHaveTextContent(/fakePost_2/);
        expect(postsElements[2]).toHaveTextContent(/fakePost_1/);
    });
});