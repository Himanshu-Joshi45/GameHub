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
        {/* Sidebar */}
        <Col xs={12} lg={3} className="sidebar-column mb-4 mb-lg-0">
          <SideBar />
        </Col>

        {/* Main Content */}
        <Col xs={12} lg={9}>
          <div className="content-wrapper">
            <h2 className="section-heading text-center mb-4">
              {searchTerm ? `🔍 Results for "${searchTerm}"` : "🎮 Popular Games"}
            </h2>

            {loading ? (
              <div className="loader-wrapper d-flex justify-content-center">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : games.length === 0 ? (
              <div className="text-center mt-5">
                <h4>No games found for "{searchTerm}".</h4>
                <p>Try refining your search or adjusting the filters.</p>
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
