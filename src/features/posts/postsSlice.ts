import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiClient } from "../../api/ApiClient";
import { PostModel } from "./Post";
import { PostAuthorModel } from "./PostAuthor";

export const fetchPosts = createAsyncThunk("posts/fetch", async ({page, token}: { page: number, token: string}) => {
  const posts = await ApiClient.getPosts(page, token);
  return posts;
});

interface PostsState {
  items: PostModel[];
  status: string;
  authors: PostAuthorModel[];
}

const initialState: PostsState = {
  items: [],
  status: "idle",
  authors: []
}

function extractAuthors(posts: PostModel[]): PostAuthorModel[] {
  const uniqueAuthors: PostAuthorModel[] = [];

  posts.forEach((post) => {
    const alreadyExists = uniqueAuthors.find((author) => author.id === post.fromId);
    if (!alreadyExists) {
      uniqueAuthors.push({
        id: post.fromId,
        name: post.fromName,
        numberOfPosts: 1
      })
    } else {
      alreadyExists.numberOfPosts++;
    }
  });

  return uniqueAuthors;
}

function sortByAuthorName(authorA: PostAuthorModel, authorB: PostAuthorModel) {
  return authorA.name.localeCompare(authorB.name);
}

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.concat(action.payload);

        state.authors = extractAuthors(action.payload).sort(sortByAuthorName);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
      })
  }
});

export default postsSlice.reducer;