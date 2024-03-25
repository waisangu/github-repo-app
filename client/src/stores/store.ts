import { configureStore } from '@reduxjs/toolkit';
import favCounterReducer from '../features/favCounter/favCounterSlice';

export const store = configureStore({
  reducer: {
    favCounter: favCounterReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;