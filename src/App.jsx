import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { RedirectToSignIn, useUser } from "@clerk/clerk-react";

import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import Library from "./pages/Library";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Header from "./components/Header";

import "./App.css";

// ✅ ProtectedRoute component with loading check
const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="loading d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <span>Loading...</span>
      </div>
    );
  }

  return isSignedIn ? children : <RedirectToSignIn />;
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {/* Global Header with search control */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* All App Routes */}
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/game/:id" element={<GameDetails />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/library"
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
