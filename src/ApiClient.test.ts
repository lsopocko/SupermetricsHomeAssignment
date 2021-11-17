import { ApiClient } from "./ApiClient";


//
describe("ApiClient", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test("getPosts retrives posts", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: { posts: [] } }));

        const posts = await ApiClient.getPosts(1, "testToken");

        expect(posts).toEqual([]);
    });

    test("register registers user", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ 
            data: { 
                client_id: "fakeClientId",
                email: "test@gmail.com",
                sl_token: "fakeToken"
            }
        }));

        const user = await ApiClient.register("test@gmail.com", "testname");

        expect(user).toEqual({
            client_id: "fakeClientId",
            email: "test@gmail.com",
            sl_token: "fakeToken"
        });
    });
})
