import axios from "axios";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

// Function to fetch games
export const fetchGames = async (filters = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        ...filters, // Includes filters like category, tags, release year, etc.
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching games:", error);
    return null;
  }
};

// Function to fetch game details by ID
export const fetchGameDetails = async (gameId) => {
  try {
    const response = await axios.get(`${BASE_URL}/games/${gameId}`, {
      params: { key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};

// Function to search games by name
export const searchGames = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        search: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching games:", error);
    return null;
  }
};
