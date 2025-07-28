const board = document.getElementById("chessboard");
const whiteScoreEl = document.getElementById("white-score");
const blackScoreEl = document.getElementById("black-score");

let selectedSquare = null;
let whiteScore = 0;
let blackScore = 0;

const pieceValues = {
  "♟": 1, "♙": 1,
  "♞": 3, "♘": 3,
  "♝": 3, "♗": 3,
  "♜": 5, "♖": 5,
  "♛": 9, "♕": 9,
  "♚": 0, "♔": 0
};

const whitePieces = ["♙", "♖", "♘", "♗", "♕", "♔"];
const blackPieces = ["♟", "♜", "♞", "♝", "♛", "♚"];

const pieces = {
  0: ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  1: Array(8).fill("♟"),
  6: Array(8).fill("♙"),
  7: ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
};

function getSquareColor(row, col) {
  return (row + col) % 2 === 0 ? "white" : "black";
}

function createBoard() {
  board.innerHTML = ""; // Clear board
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square", getSquareColor(row, col));
      square.dataset.row = row;
      square.dataset.col = col;

      // Add pieces if available
      if (pieces[row]) {
        const piece = pieces[row][col];
        if (piece) {
          square.textContent = piece;
          square.classList.add("piece");
        }
      }

      square.addEventListener("click", () => handleSquareClick(square));
      board.appendChild(square);
    }
  }
}

function updateScores() {
  whiteScoreEl.textContent = `White: ${whiteScore}`;
  blackScoreEl.textContent = `Black: ${blackScore}`;
}

function handleSquareClick(square) {
  if (selectedSquare) {
    if (square === selectedSquare) {
      // Deselect
      selectedSquare.classList.remove("selected");
      selectedSquare = null;
    } else {
      const movingPiece = selectedSquare.textContent;
      const targetPiece = square.textContent;

      if (targetPiece) {
        // Capture logic
        if (whitePieces.includes(movingPiece) && blackPieces.includes(targetPiece)) {
          whiteScore += pieceValues[targetPiece];
        } else if (blackPieces.includes(movingPiece) && whitePieces.includes(targetPiece)) {
          blackScore += pieceValues[targetPiece];
        }
        updateScores();
      }

      // Move piece
      square.textContent = movingPiece;
      square.classList.add("piece");

      selectedSquare.textContent = "";
      selectedSquare.classList.remove("piece", "selected");

      selectedSquare = null;
    }
  } else if (square.textContent !== "") {
    selectedSquare = square;
    selectedSquare.classList.add("selected");
  }
}

createBoard();
updateScores();
