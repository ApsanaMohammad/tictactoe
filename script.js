document.addEventListener("DOMContentLoaded", function () {
    const boardContainer = document.getElementById("board-container");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("reset-btn");

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    function renderBoard() {
        boardContainer.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.index = i;
            cell.innerText = board[i];
            cell.addEventListener("click", handleCellClick);
            boardContainer.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            renderBoard();
            checkWinner();
            togglePlayer();
        }
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
                gameActive = false;
                messageElement.innerText = `Player ${board[a]} wins!`;
                return;
            }
        }

        if (board.every(cell => cell !== '')) {
            gameActive = false;
            messageElement.innerText = "It's a tie!";
        }
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        messageElement.innerText = "";
        renderBoard();
    }

    resetButton.addEventListener("click", resetGame);

    // Initial render
    renderBoard();
});
