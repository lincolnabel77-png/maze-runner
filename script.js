const maze = [
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
];

const gameContainer = document.getElementById('game-container');
const movesDisplay = document.getElementById('moves');
let playerPos = { x: 1, y: 1 };
let moves = 0;

// Render the maze
function renderMaze() {
  gameContainer.innerHTML = '';
  for (let y = 0; y < maze.length; y++) {
    for (let x = 0; x < maze[y].length; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      if (maze[y][x] === 1) cell.classList.add('wall');
      if (x === playerPos.x && y === playerPos.y) cell.classList.add('player');
      if (x === 8 && y === 8) cell.classList.add('exit');
      gameContainer.appendChild(cell);
    }
  }
}

function movePlayer(dx, dy) {
  const newX = playerPos.x + dx;
  const newY = playerPos.y + dy;
  if (maze[newY][newX] !== 1) {
    playerPos.x = newX;
    playerPos.y = newY;
    moves++;
    movesDisplay.textContent = moves;
    renderMaze();
    if (newX === 8 && newY === 8) {
      alert(`You reached the exit in ${moves} moves! 🎉`);
    }
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') movePlayer(0, -1);
  if (e.key === 'ArrowDown') movePlayer(0, 1);
  if (e.key === 'ArrowLeft') movePlayer(-1, 0);
  if (e.key === 'ArrowRight') movePlayer(1, 0);
});

renderMaze();
