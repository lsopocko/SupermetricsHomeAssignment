import { PostModel } from "./features/posts/Post";

interface PostJSON {
    id: string;
    created_time: string;
    from_id: string;
    from_name: string;
    message: string;
    type: string;
}

interface PostsJSON {
    data: {
        page: number;
        posts: PostJSON[];
    },
    errors?: Array<{message: string}>;
}

export namespace ApiClient {
    const API_URL: string = "https://api.supermetrics.com/assignment";
    const CLIENT_ID: string = "ju16a6m81mhid5ue1z3v2g0uh";

    export async function getPosts(page: number, token: string): Promise<PostModel[]> {
        const response = await fetch(`${API_URL}/posts?page=${page}&sl_token=${token}`);
        const { data, errors }: PostsJSON = await response.json();

        if (errors) {
            console.log(errors);
        }

        return data.posts.map((rawPost: PostJSON): PostModel => {
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
        const { data, errors }: PostsJSON = await response.json();

        if (errors) {
            console.log(errors);
        }

        return data;
    }
}