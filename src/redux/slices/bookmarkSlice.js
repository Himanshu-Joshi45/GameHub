import { createSlice } from "@reduxjs/toolkit";

// Load bookmarks from localStorage if available
const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

const initialState = {
  bookmarks: storedBookmarks,
};

const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const exists = state.bookmarks.find((game) => game.id === action.payload.id);
      if (!exists) {
        state.bookmarks.push(action.payload);
        localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter((game) => game.id !== action.payload);
      localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
