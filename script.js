const boxes = document.querySelectorAll(".box");
const statusText = document.getElementById("gameStatus");
const restartBtn = document.getElementById("restartBtn");

const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");
const drawScoreText = document.getElementById("drawScore");

let currentPlayer = "X";
let running = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

boxes.forEach(box => {
    box.addEventListener("click", () => makeMove(box));
});

restartBtn.addEventListener("click", resetBoard);

function makeMove(box) {
    if (box.textContent !== "" || !running) return;

    box.textContent = currentPlayer;

    if (checkWin()) {
        statusText.textContent = `Player ${currentPlayer} Wins 🎉`;
        updateScore(currentPlayer);
        running = false;
    } else if (isDraw()) {
        statusText.textContent = "It's a Draw 🤝";
        draws++;
        drawScoreText.textContent = draws;
        running = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winPatterns.some(pattern =>
        pattern.every(i => boxes[i].textContent === currentPlayer)
    );
}

function isDraw() {
    return [...boxes].every(box => box.textContent !== "");
}

function updateScore(player) {
    if (player === "X") {
        xWins++;
        xScoreText.textContent = xWins;
    } else {
        oWins++;
        oScoreText.textContent = oWins;
    }
}

function resetBoard() {
    boxes.forEach(box => box.textContent = "");
    currentPlayer = "X";
    running = true;
    statusText.textContent = "Player X's Turn";
}
