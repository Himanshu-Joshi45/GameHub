import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookmarks: JSON.parse(localStorage.getItem("bookmarks")) || [],
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      const exists = state.bookmarks.some((game) => game.id === action.payload.id);
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

export const { addBookmark, removeBookmark } = librarySlice.actions;
export default librarySlice.reducer;
