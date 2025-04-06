import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../redux/slices/gameSlice";
import { Spinner, Container, Row, Col, Card, Badge, Image } from "react-bootstrap";
import "../style/GameDetails.css";

const GameDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { gameDetails, loading, error } = useSelector((state) => state.games);

  useEffect(() => {
    if (id) {
      dispatch(getGameDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading game details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-danger">Failed to load game details.</h5>
        <p>Please try again later.</p>
      </div>
    );
  }

  if (!gameDetails) {
    return (
      <div className="text-center mt-5">
        <h5>No details available.</h5>
      </div>
    );
  }

  return (
    <Container className="game-details-container">
      {/* Game Image at the Top-Left */}
      <Row className="align-items-center">
        <Col md={5}>
          <Image 
            src={gameDetails.background_image} 
            alt={gameDetails.name} 
            className="game-details-image"
            fluid 
          />
        </Col>

        <Col md={7}>
          <h2 className="game-title">{gameDetails.name}</h2>
          <p><strong>Released:</strong> {gameDetails.released}</p>
          <p><strong>Rating:</strong> ⭐ {gameDetails.rating} / 5</p>

          <p>
            <strong>Platforms:</strong> 
            {gameDetails.platforms.map((p, index) => (
              <Badge key={index} bg="secondary" className="ms-1">
                {p.platform.name}
              </Badge>
            ))}
          </p>

          <p>
            <strong>Genres:</strong> 
            {gameDetails.genres.map((g, index) => (
              <Badge key={index} bg="info" className="ms-1">
                {g.name}
              </Badge>
            ))}
          </p>
        </Col>
      </Row>

      {/* Centered Description */}
      <Row className="justify-content-center mt-4">
        <Col md={10}>
          <Card className="p-4 game-description-box">
            <Card.Text className="game-description">
              {gameDetails.description_raw}
            </Card.Text>
          </Card>
        </Col>
      </Row>

      {/* Screenshots */}
      {gameDetails.short_screenshots && (
        <Row className="mt-4 text-center">
          <Col>
            <h3>📸 Screenshots</h3>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        {gameDetails.short_screenshots?.map((screenshot, index) => (
          <Col key={index} xs={12} md={4} className="mb-3">
            <Image src={screenshot.image} alt={`screenshot-${index}`} className="screenshot" />
          </Col>
        ))}
      </Row>

      {/* System Requirements */}
      {gameDetails.platforms?.find((p) => p.platform.name === "PC")?.requirements ? (
        <Row className="mt-4">
          <Col>
            <h3 className="text-center">🖥️ System Requirements</h3>
            <Card className="p-3">
              <p><strong>Minimum:</strong></p>
              <p>{gameDetails.platforms.find(p => p.platform.name === "PC").requirements.minimum || "Not Available"}</p>
              <p><strong>Recommended:</strong></p>
              <p>{gameDetails.platforms.find(p => p.platform.name === "PC").requirements.recommended || "Not Available"}</p>
            </Card>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
};

export default GameDetails;
