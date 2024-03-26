import { configureStore } from '@reduxjs/toolkit';
import favCounterReducer from '../features/favCounter/favCounterSlice';
import paramSettingsReducer from '../features/paramSettings/paramSettingsSlice';

export const store = configureStore({
  reducer: {
    favCounter: favCounterReducer,
    paramSettings: paramSettingsReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;