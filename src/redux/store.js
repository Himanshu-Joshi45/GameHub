import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./slices/gameSlice";
import authReducer from "./slices/authSlice";
import bookmarkReducer from "./slices/bookmarkSlice"; 
const store = configureStore({
  reducer: {
    games: gameReducer,
    auth: authReducer,
    bookmarks: bookmarkReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // ✅ Enable Redux DevTools in development
});

export default store;
