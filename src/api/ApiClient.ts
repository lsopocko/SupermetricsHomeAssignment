import { PostModel } from "../features/posts/Post";
import { PostsResponse, RawPost } from "./PostsResponse";
import { RegisterResponse } from "./RegisterResponse";

export namespace ApiClient {
    const API_URL: string = "https://api.supermetrics.com/assignment";
    const CLIENT_ID: string = "ju16a6m81mhid5ue1z3v2g0uh";

    export async function getPosts(page: number, token: string): Promise<PostModel[]> {
        const response = await fetch(`${API_URL}/posts?page=${page}&sl_token=${token}`);
        const { data, error }: PostsResponse = await response.json();

        if (error) {
            console.log(error);
            return [];
        }

        return data.posts.map((rawPost: RawPost): PostModel => {
            return {
                createdTime: new Date(rawPost.created_time).getTime(),
                message: rawPost.message,
                id: rawPost.id,
                fromId: rawPost.from_id,
                fromName: rawPost.from_name
            }
        });
    }

    export async function register(email: string, name: string): Promise<any> {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email, name, client_id: CLIENT_ID})
        });
        
        const { data, error }: RegisterResponse = await response.json();

        if (error) {
            console.log(error);
        }

        return data;
    }
}