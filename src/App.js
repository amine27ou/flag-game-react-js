import React, { useState, useEffect } from "react";
import "./App.css";
import FlagGame from "./flagGame";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function App() {
  const [gameStarted, setGameStarted] = useState(() => {
    return JSON.parse(localStorage.getItem("play")) || false;
  });

  const startGame = () => {
    setGameStarted(prevState=>!prevState);
  };

  useEffect(() => {
    localStorage.setItem("play", JSON.stringify(gameStarted));
  }, [gameStarted]);

  return (
    <BrowserRouter>
      <div className="app">
        {!gameStarted && (
          <div>
            <h1>Flag Game</h1>
            <Link className="btn" to="/game" onClick={startGame}>
              Play
            </Link>
          </div>
        )}
        <Routes>
          <Route path="/game" element={<FlagGame startGame={startGame}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
