import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import React, { useState, useEffect } from "react";
import axios from 'axios';

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { ScoreBoard } from "./components/ScoreBoard";
import './App.css';

const App = () => {
  const [funFact, setFunFact] = useState('');
  
  const fetchFact = async () => {
    try {
      const response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=1', {
        headers: {
          'X-Api-Key': process.env.REACT_APP_FACTS_API_KEY
        }
      });
      setFunFact(response.data[0].fact); 
    } catch (error) {
      console.error('Error fetching fun fact:', error);
    }
  };
  
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null))
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  
  const handleBoxClick = (boxIdx) => {
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    })

    setBoard(updatedBoard);

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        let { oScore } = scores;
        oScore += 1;
        setScores({ ...scores, oScore })
      } else {
        let { xScore } = scores;
        xScore += 1;
        setScores({ ...scores, xScore })
      }
    }

    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        setWinner(board[x]);
        fetchFact();
        return board[x];
      }
    }
  }

  const resetBoard = () => {
    setGameOver(false);
    setWinner(null);
    setBoard(Array(9).fill(null));
  }

  return (
    <div className="App">
      <h1 style={{display:"flex", justifyContent:"center", flexWrap: "wrap"}}>
      {'Mufu\'s  Tic-Tac-Toe!'.split('').map((char, index) => (
        <span 
          key={index} 
          style={{
            color: index % 2 === 0 ? 'rgb(255, 70, 37)' : 'rgb(44, 135, 255)',
            marginRight: char === 's' ? '20px' : '0' 
          }}
        >
          {char}
        </span>
      ))}
    </h1>

      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      {winner && (
    <div>
      <p className={`congrats-message ${winner === 'X' ? 'x-won' : 'o-won'}`}>
        Congratulations Team {winner === 'X' ? 'X' : 'O'}, here's a fun fact!
      </p>
      <div className={`fun-fact-box ${winner === 'X' ? 'x-won' : 'o-won'}`}>
        {funFact}
      </div>
    </div>
  )}
    </div>
  );
}

export default App;

