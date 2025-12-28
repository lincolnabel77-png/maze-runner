// Define multiple mazes for levels
const mazes = [
  // Level 1
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,0,1],
    [1,0,1,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,0,1,0,1,0,1],
    [1,0,0,1,0,0,0,1,0,1],
    [1,0,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1],
  ],
  // Level 2
  [
    [1,1,1,1,1,1,1,1,1,1],
    [1,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,1,0,1],
    [1,1,1,0,1,1,0,1,0,1],
    [1,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,1],
    [1,0,0,0,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1],
  ]
];

let currentLevel = 0;
let maze = mazes[currentLevel];

const gameContainer = document.getElementById('game-container');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');

let playerPos = { x: 1, y: 1 };
let moves = 0;
let timeLeft = 60;
let timerInterval;

// Render maze
function renderMaze() {
  gameContainer.innerHTML = '';
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (maze[y][x] === 1) cell.classList.add('wall');
      if (x === playerPos.x && y === playerPos.y) cell.classList.add('player');
      // Exit is bottom-right for all levels
      if (x === maze[0].length - 2 && y === maze.length - 2) cell.classList.add('exit');
      gameContainer.appendChild(cell);
    }
  }
}

// Start game / timer
function startGame() {
  moves = 0;
  movesDisplay.textContent = moves;
  playerPos = { x: 1, y: 1 };
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;

  renderMaze();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert(`Time's up! You failed level ${currentLevel + 1}`);
      playerPos = { x: 1, y: 1 };
      renderMaze();
    }
  }, 1000);
}

// Move player
function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  if (maze[newY][newX] !== 1) {
    playerPos.x = newX;
    playerPos.y = newY;
    moves++;
    movesDisplay.textContent = moves;
    renderMaze();

    // Check if reached exit
    if (newX === maze[0].length - 2 && newY === maze.length - 2) {
      clearInterval(timerInterval);
      alert(`Level ${currentLevel + 1} completed in ${moves} moves! 🎉`);
      currentLevel++;
      if (currentLevel >= mazes.length) {
        alert("Congratulations! You completed all levels! 🏆");
        currentLevel = 0;
      }
      maze = mazes[currentLevel];
      startGame();
    }
  }
}

// Keyboard controls (arrows + WASD)
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') movePlayer(0, -1);
  if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') movePlayer(0, 1);
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') movePlayer(-1, 0);
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') movePlayer(1, 0);
});

// Initial render
renderMaze();
