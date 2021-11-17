import { SLResponse } from "./SLResponse";

export interface RawPost {
    id: string;
    created_time: string;
    from_id: string;
    from_name: string;
    message: string;
    type: string;
}

export interface PostsResponse extends SLResponse {
    data: {
        page: number;
        posts: RawPost[];
    }
}