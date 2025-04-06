import React from "react";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import GameCard from "../components/GameCard";
import { Container, Row, Col, Alert } from "react-bootstrap";

const Library = () => {
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);
  const { user } = useUser();

  return (
    <Container className="py-4">
      <h2 className="mb-4">
        {user ? `${user.firstName}'s Library` : "Your Library"}
      </h2>

      {bookmarks.length === 0 ? (
        <Alert variant="info">
          You haven’t bookmarked any games yet. Start exploring and bookmark your favorites!
        </Alert>
      ) : (
        <Row className="g-4">
          {bookmarks.map((game) => (
            <Col key={game.id} xs={12} sm={6} md={4}>
              <GameCard game={game} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Library;
