// src/pages/Home.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames } from "../redux/slices/gameSlice";
import GameGrid from "../components/GameGrid";
import SideBar from "../components/SideBar";
import PaginationControls from "../components/PaginationControls";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import "../style/Home.css";

const Home = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { games, loading, currentPage, filters } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchGames({ page: currentPage, filters, searchTerm }));
  }, [dispatch, currentPage, filters, searchTerm]);

  return (
    <Container fluid className="py-4 home-container">
      <Row>
        <Col xs={12} md={3} className="sidebar-column mb-4 mb-md-0">
          <SideBar />
        </Col>

        <Col xs={12} md={9}>
          <h2 className="mb-4">
            {searchTerm ? `🔍 Results for "${searchTerm}"` : "🎮 Popular Games"}
          </h2>

          {loading ? (
            <div className="text-center mt-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <>
              <Row className="g-4">
                <GameGrid games={games} />
              </Row>

              <div className="d-flex justify-content-center mt-4">
                <PaginationControls />
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
