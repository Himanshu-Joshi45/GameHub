import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

// Fetch all games (with filters, search, pagination)
export const fetchGames = createAsyncThunk(
  "games/fetchGames",
  async ({ page = 1, filters = {}, searchTerm = "" }) => {
    const params = new URLSearchParams({
      key: API_KEY,
      page,
      page_size: 20,
    });

    if (searchTerm) params.append("search", searchTerm);
    if (filters.genre) params.append("genres", filters.genre);
    if (filters.tag) params.append("tags", filters.tag);
    if (filters.year) params.append("dates", `${filters.year}-01-01,${filters.year}-12-31`);
    if (filters.ordering) params.append("ordering", filters.ordering);

    const response = await axios.get(`${BASE_URL}/games?${params}`);
    return response.data.results;
  }
);

// Fetch individual game details
export const getGameDetails = createAsyncThunk(
  "games/getGameDetails",
  async (id) => {
    const response = await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
    return response.data;
  }
);

// Initial state
const initialState = {
  games: [],
  gameDetails: null,
  loading: false,
  error: null,
  currentPage: 1,
  filters: {},
  searchTerm: "",
};

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Games
      .addCase(fetchGames.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.loading = false;
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch games";
      })

      // Fetch Game Details
      .addCase(getGameDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGameDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.gameDetails = action.payload;
      })
      .addCase(getGameDetails.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch game details";
      });
  },
});

// Exports
export const { setCurrentPage, setFilters, setSearchTerm } = gameSlice.actions;
export default gameSlice.reducer;
