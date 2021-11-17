import { ApiClient } from "./ApiClient";
import { PostsResponse } from "./PostsResponse";
import { RegisterResponse } from "./RegisterResponse";

const fakePostsResponse: PostsResponse = {
    data: {
        page: 1,
        posts: []
    },
}

const fakeRegisterResponse: RegisterResponse = {
    data: { 
        client_id: "fakeClientId",
        email: "test@gmail.com",
        sl_token: "fakeToken"
    }
}

describe("ApiClient", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test("getPosts() retrives posts", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(fakePostsResponse));

        const posts = await ApiClient.getPosts(1, "testToken");

        expect(posts).toEqual([]);
    });

    test("register() registers user", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(fakeRegisterResponse));

        const user = await ApiClient.register("test@gmail.com", "testname");

        expect(user).toEqual({
            client_id: "fakeClientId",
            email: "test@gmail.com",
            sl_token: "fakeToken",
            name: "testname",
        });
    });
})
