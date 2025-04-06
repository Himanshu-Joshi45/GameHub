import React from "react";
import { Col } from "react-bootstrap";
import GameCard from "./GameCard";
import "../style/GameGrid.css"; // Import your CSS file
const GameGrid = ({ games }) => {
  return (
    <>
      {games.map((game) => (
        <Col key={game.id} xs={12} sm={6} md={4}>
          <GameCard game={game} />
        </Col>
      ))}
    </>
  );
};

export default GameGrid;
