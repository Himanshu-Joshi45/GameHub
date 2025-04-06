import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addBookmark, removeBookmark } from "../redux/slices/bookmarkSlice";
import "../style/GameCard.css";

const GameCard = ({ game }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const isBookmarked = bookmarks.some((g) => g.id === game.id);

  const handleBookmark = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(game.id));
    } else {
      dispatch(addBookmark(game));
    }
  };

  return (
    <Card className="game-card mb-4">
      <Card.Img
        variant="top"
        src={game.background_image}
        alt={game.name}
        className="game-image"
      />

      <Card.Body>
        <Card.Title>{game.name}</Card.Title>

        {game.description_raw && (
          <Card.Text className="text-muted">
            {game.description_raw.substring(0, 100)}...
          </Card.Text>
        )}

        {game.tags?.length > 0 && (
          <Card.Text style={{ fontSize: "0.85rem" }}>
            <strong>Tags:</strong> {game.tags.slice(0, 3).map((tag) => tag.name).join(", ")}
          </Card.Text>
        )}

        {game.genres?.length > 0 && (
          <Card.Text style={{ fontSize: "0.85rem" }}>
            <strong>Category:</strong> {game.genres.map((genre) => genre.name).join(", ")}
          </Card.Text>
        )}

        <Card.Text style={{ fontSize: "0.9rem" }}>
          <strong>Rating:</strong> ⭐ {game.rating} / 5
        </Card.Text>

        {/* ✅ Two Buttons in a Row */}
        <div className="d-flex justify-content-between mt-3">
          <Link to={`/game/${game.id}`}>
            <Button variant="dark" size="sm">View</Button>
          </Link>

          <Button
            variant={isBookmarked ? "success" : "outline-secondary"}
            size="sm"
            onClick={handleBookmark}
          >
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
