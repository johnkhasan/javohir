<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import BackgroundBlur from "../assets/icons/background-blur.svg";
import { X } from "lucide-vue-next";
// skip snake game
const skipGame = ref(false);
const showSkipButton = ref(true);
let gameOver = ref(false);
const isLoading = ref(false);

function handleArrow(e) {
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
  isLoading.value = true;

  window.addEventListener("keydown", handleArrow);

  board = document.getElementById("board");
  board.height = total_row * blockSize;
  board.width = total_col * blockSize;
  context = board.getContext("2d");

  placeFood();
  document.addEventListener("keyup", changeDirection);

  // --- NEW SMOOTH GAME LOOP ---
  let lastTime = 0;
  let moveAccum = 0;
  let snakeSpeed = 6;

  function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    moveAccum += deltaTime;
    const moveInterval = 1000 / snakeSpeed;

    while (moveAccum >= moveInterval) {
      update();
      moveAccum -= moveInterval;
    }

    drawFrame();

    requestAnimationFrame(gameLoop);
  }

  requestAnimationFrame(gameLoop);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleArrow);
  document.removeEventListener("keyup", changeDirection);
});

function drawFrame() {
  // Background canvas
  context.fillStyle = "rgba(1, 22, 39, 0.8)";
  context.fillRect(0, 0, board.width, board.height);

  // Food halo
  drawFoodHalo(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2);

  // Snake head
  drawSnakePart(snakeX, snakeY, 1);

  // Snake body (fade tail)
  for (let i = 0; i < snakeBody.length; i++) {
    let opacity = getOpacity(i, snakeBody.length);
    drawSnakePart(snakeBody[i][0], snakeBody[i][1], opacity);
  }
}
let blockSize = 25;
let total_row = 17;
let total_col = 12;
let board;
let context;

let snakeX = blockSize * 4;
let snakeY = blockSize * 4;

let speedX = 0;
let speedY = 0;

let snakeBody = [];

let foodX;
let foodY;

let firstRenderDone = false;
function update() {
  if (gameOver.value) return;
  if (!firstRenderDone) {
    isLoading.value = false;
    firstRenderDone = true;
  }
  // Background
  context.fillStyle = "rgba(1, 22, 39, 0.8)";

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
    }
  }
}

// ---------- DRAW SNAKE ROUND PART ----------
function drawSnakePart(x, y, opacity) {
  const r = blockSize / 2;
  context.fillStyle = `rgba(67, 216, 172, ${opacity})`;

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
  <div class="wrapper p-8 border-2 border-line flex justify-between relative">
    <div
      class="dot dot-left-top w-6 h-6 rounded-full text-2xl text-center backdrop-blur-3xl flex justify-center items-center bg-transparent top-2 absolute left-2"
    >
      <X size="24" color="red" class="bg-transparent" />
    </div>
    <div
      class="dot dot-right-top w-12 h-12 rounded-full flex justify-center items-center bg-transparent top-0 absolute right-0"
    >
      <!-- <img :src="xIcon" class="w-4" /> -->
      <X size="24" color="red" class="bg-transparent" />
    </div>
    <div
      class="dot dot-left-bottom w-12 h-12 rounded-full flex justify-center items-center bg-transparent bottom-0 absolute left-0"
    >
      <!-- <img :src="xIcon" class="w-4" /> -->
    </div>
    <div
      class="dot dot-right-bottom w-12 h-12 rounded-full flex justify-center items-center bg-transparent bottom-0 absolute right-0"
    >
      <!-- <img :src="xIcon" class="w-4" /> -->
    </div>

    <div class="snake-game-left self-start">
      <div v-show="!skipGame" class="relative snake-game">
        <div
          v-if="isLoading"
          class="loader-overlay absolute inset-0 flex items-center justify-center z-20 bg-primary-200 bg-opacity-90"
        >
          <div class="loader"></div>
        </div>
        <button
          v-if="gameOver"
          class="text-white z-10 btn btn-accent bg-a absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          @click="resetGame"
        >
          Restart
        </button>
        <button
          v-show="showSkipButton"
          v-if="!skipGame"
          class="text-white z-10 btn btn-accent bg-a absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          @click="skipGame = true"
        >
          Skip
        </button>
        <div
          v-show="showSkipButton"
          v-if="!skipGame"
          class="absolute left-1/2 bottom-12 -translate-x-1/2 bg-accent-100 rounded-sm p-1"
        >
          start-game
        </div>

        <div class="h-[425px] w-[300px] rounded-2xl shadow-2xl">
          <canvas class="canvas rounded-2xl shadow-inner" id="board"></canvas>
        </div>
      </div>
      <div
        class="back-blur absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"
      ></div>
    </div>
    <div class="snake-game-right"></div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 600px;
  display: flex;
  justify-content: center;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.038);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}
.back-blur {
  background-image: url("../assets//icons/background-blur.svg");
  background-size: 800px;
  background-position: center;
  background-repeat: no-repeat;
  width: 50vw;
  height: 50vh;
  transform: rotate(-90deg);
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #ffffff50;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
