import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchGames, setFilters } from "../redux/slices/gameSlice";
import axios from "axios";
import "../style/Sidebar.css";

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const SideBar = () => {
  const dispatch = useDispatch();
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, updateFilters] = useState({
    genre: "",
    tag: "",
    year: "",
    ordering: "",
  });

  useEffect(() => {
    const fetchGenresAndTags = async () => {
      try {
        const [genreRes, tagRes] = await Promise.all([
          axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`),
          axios.get(`https://api.rawg.io/api/tags?key=${API_KEY}`),
        ]);
        setGenres(genreRes.data.results);
        setTags(tagRes.data.results);
      } catch (err) {
        console.error("Error fetching genres/tags:", err);
      }
    };

    fetchGenresAndTags();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    updateFilters(newFilters);
    dispatch(setFilters(newFilters));
    dispatch(fetchGames(1));
  };

  return (
    <div className="sidebar-container">
      <h4 className="sidebar-title">Filters</h4>

      <div className="filters-wrapper">
        <div className="filter-group">
          <label htmlFor="genre">Category</label>
          <select name="genre" onChange={handleChange}>
            <option value="">All</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.slug}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="tag">Tags</label>
          <select name="tag" onChange={handleChange}>
            <option value="">All</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.slug}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">Release Year</label>
          <input
            type="number"
            name="year"
            min="1980"
            max={new Date().getFullYear()}
            onChange={handleChange}
            placeholder="e.g. 2023"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="ordering">Popularity</label>
          <select name="ordering" onChange={handleChange}>
            <option value="">Default</option>
            <option value="-rating">Top Rated</option>
            <option value="-added">Most Added</option>
            <option value="-released">Recently Released</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
