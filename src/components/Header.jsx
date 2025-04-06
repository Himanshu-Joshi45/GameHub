import React from "react";
import {
  Navbar,
  Form,
  FormControl,
  Container,
  Nav,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBookmark, FaSearch } from "react-icons/fa";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

import "../style/Header.css";

const Header = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <Navbar expand="lg" className="custom-navbar py-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="logo">
          GameHub
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" className="bg-light" />

        <Navbar.Collapse id="navbarScroll" className="navbar-collapse">
          {/* Search Bar */}
          <Form
            className="search-form d-flex flex-grow-1 me-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <InputGroup className="search-group">
              <FormControl
                type="search"
                placeholder="Search games..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <InputGroup.Text
                onClick={handleSearch}
                className="search-icon-wrapper"
              >
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Form>

          {/* Right Side Navigation */}
          <Nav className="nav-right d-flex align-items-center gap-3 ms-auto">
            <Nav.Link
              as={Link}
              to="/library"
              className="library-link d-flex align-items-center"
              style={{ padding: "6px 12px", borderRadius: "6px" }}
            >
              <FaBookmark className="me-1" /> My Library
            </Nav.Link>

            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="btn btn-outline-light login-btn"
                  style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    height: "100%",
                  }}
                >
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    userButtonAvatarBox: {
                      width: "42px",
                      height: "42px",
                    },
                  },
                }}
              />
            </SignedIn>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
