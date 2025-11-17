<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
// skip snake game
const skipGame = ref(false);
const showSkipButton = ref(true);

function handleArrow(e) {
  console.log(e.key);

  switch (e.key) {
    case "ArrowUp":
      showSkipButton.value = false;
      break;
    case "ArrowDown":
      showSkipButton.value = false;
      break;
    case "ArrowRight":
      showSkipButton.value = false;
      break;
    case "ArrowLeft":
      showSkipButton.value = false;
      break;
    default:
      break;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleArrow);
});
onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleArrow);
});
let blockSize = 25;
let total_row = 17;
let total_col = 17;
let board;
let context;

let snakeX = blockSize * 4;
let snakeY = blockSize * 4;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let gameOver = ref(false);

window.onload = function () {
  board = document.getElementById("board");
  board.height = total_row * blockSize;
  board.width = total_col * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver.value) return;

  // Background
  context.fillStyle = "#062431";
  context.fillRect(0, 0, board.width, board.height);

  // ----- DRAW FOOD WITH HALO -----
  drawFoodHalo(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2);

  // If snake eats food
  if (snakeX === foodX && snakeY === foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  // Move body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  // Update snake head position
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;

  // ----- DRAW SNAKE WITH FADE EFFECT -----
  // HEAD (always full opacity)
  drawSnakePart(snakeX, snakeY, 1);

  // BODY (fade from head → tail)
  for (let i = 0; i < snakeBody.length; i++) {
    let opacity = getOpacity(i, snakeBody.length);
    drawSnakePart(snakeBody[i][0], snakeBody[i][1], opacity);
  }

  // Check walls
  if (
    snakeX < 0 ||
    snakeX >= total_col * blockSize ||
    snakeY < 0 ||
    snakeY >= total_row * blockSize
  ) {
    gameOver.value = true;
  }

  // Check self collision
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
      gameOver.value = true;
      alert("Game Over");
    }
  }
}

// ---------- DRAW SNAKE ROUND PART ----------
function drawSnakePart(x, y, opacity) {
  const r = blockSize / 2;
  context.fillStyle = `rgba(67, 216, 172, ${opacity})`;
  // context.beginPath();
  // context.arc(x, y, r, 0, Math.PI * 2);
  // context.fill();
  context.fillRect(x, y, blockSize, blockSize);
}

// ---------- OPACITY FUNCTION (HEAD → TAIL) ----------
function getOpacity(index, length) {
  if (length === 0) return 1;
  return 1 - index / length;
}

// ---------- FOOD WITH HALO ----------
function drawFoodHalo(x, y, radius) {
  // Center circle
  context.fillStyle = "rgba(100, 255, 200, 1)";
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();

  // First halo
  context.fillStyle = "rgba(100, 255, 200, 0.2)";
  context.beginPath();
  context.arc(x, y, radius * 1.5, 0, Math.PI * 2);
  context.fill();

  // Second halo
  context.fillStyle = "rgba(100, 255, 200, 0.1)";
  context.beginPath();
  context.arc(x, y, radius * 1.9, 0, Math.PI * 2);
  context.fill();
}

// ---------- MOVEMENT ----------
function changeDirection(e) {
  if (e.code === "ArrowUp" && speedY !== 1) {
    speedX = 0;
    speedY = -1;
  } else if (e.code === "ArrowDown" && speedY !== -1) {
    speedX = 0;
    speedY = 1;
  } else if (e.code === "ArrowLeft" && speedX !== 1) {
    speedX = -1;
    speedY = 0;
  } else if (e.code === "ArrowRight" && speedX !== -1) {
    speedX = 1;
    speedY = 0;
  }
}

// ---------- RANDOM FOOD POSITION ----------
function placeFood() {
  foodX = Math.floor(Math.random() * total_col) * blockSize;
  foodY = Math.floor(Math.random() * total_row) * blockSize;
}

function resetGame() {
  snakeX = blockSize * 4;
  snakeY = blockSize * 4;

  speedX = 0;
  speedY = 0;

  snakeBody = [];

  gameOver.value = false;

  placeFood();
}
</script>

<template>
  <div class="relative" @keypress.left="showSkipButton = false">
    <button
      v-if="gameOver"
      class="text-white btn btn-accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      @click="resetGame"
    >
      Restart
    </button>
    <button
      v-show="showSkipButton"
      v-if="!skipGame"
      class="text-white btn btn-accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      @click="skipGame = true"
    >
      Skip
    </button>
    <canvas v-show="!skipGame" id="board"></canvas>
  </div>
</template>

<style lang="scss" scoped></style>
