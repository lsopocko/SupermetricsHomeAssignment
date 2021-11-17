import { configureStore } from "@reduxjs/toolkit"
import postsSlice from "./features/posts/postsSlice";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
      posts: postsSlice,
      user: userSlice
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;