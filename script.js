const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalBtn = document.getElementById('modal-btn');
const xScoreValue = document.getElementById('x-score-value');
const oScoreValue = document.getElementById('o-score-value');
const drawScoreValue = document.getElementById('draw-score-value');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, Draws: 0 };

function handleCellClick(e) {
    const cell = e.target;
    const index = parseInt(cell.dataset.index);

    if (!gameActive || gameBoard[index] !== '' || cell.classList.contains('disabled')) {
        return;
    }

    makeMove(cell, index);
}

function makeMove(cell, index) {
    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const result = checkWin();
    if (result) {
        handleWin(result);
    } else if (!gameBoard.includes('')) {
        handleDraw();
    } else {
        switchPlayer();
    }
}

function checkWin() {
    for (const combination of WINNING_COMBINATIONS) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return { winner: gameBoard[a], combination };
        }
    }
    return null;
}

function handleWin({ winner, combination }) {
    gameActive = false;
    status.textContent = `Player ${winner} wins! 🎉`;
    scores[winner]++;
    updateScores();

    combination.forEach(index => {
        cells[index].classList.add('winner');
    });

    setTimeout(() => {
        showModal(`Player ${winner} wins! 🎉`);
    }, 500);
}

function handleDraw() {
    gameActive = false;
    scores.Draws++;
    updateScores();
    status.textContent = "It's a draw! 🤝";
    setTimeout(() => {
        showModal("It's a draw! 🤝");
    }, 500);
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScores() {
    xScoreValue.textContent = scores.X;
    oScoreValue.textContent = scores.O;
    drawScoreValue.textContent = scores.Draws;
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner', 'disabled');
    });
}

function resetScores() {
    scores = { X: 0, O: 0, Draws: 0 };
    updateScores();
}

function showModal(message) {
    modalTitle.textContent = message;
    modalOverlay.classList.add('active');
}

function hideModal() {
    modalOverlay.classList.remove('active');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', resetGame);
modalBtn.addEventListener('click', () => {
    hideModal();
    resetGame();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        hideModal();
        resetGame();
    }
});