// src/components/PaginationControls.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, setCurrentPage } from "../redux/slices/gameSlice";
import { Button } from "react-bootstrap";

const PaginationControls = () => {
  const dispatch = useDispatch();
  const { currentPage, filters } = useSelector((state) => state.games);

  const handlePageChange = (newPage) => {
    dispatch(setCurrentPage(newPage));
    dispatch(fetchGames({ page: newPage, filters }));
  };

  return (
    <div className="d-flex gap-3 align-items-center">
      <Button
        variant="outline-primary"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </Button>
      <span>Page {currentPage}</span>
      <Button
        variant="outline-primary"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
