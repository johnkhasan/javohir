<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import BackgroundBlur from "../assets/icons/background-blur.svg";
import UpArrow from "../assets/icons/up-arrow.svg";
import DownArrow from "../assets/icons/down-arrow.svg";
import LeftArrow from "../assets/icons/left-arrow.svg";
import RightArrow from "../assets/icons/right-arrow.svg";
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
  <div class="border-line wrapper relative flex justify-between gap-10 border-2 p-8">
    <!-- Top-left -->
    <div
      class="dot-left-top dot absolute top-2 left-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-center text-2xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl"
    >
      <X size="20" color="#ccc" />
    </div>

    <!-- Top-right -->
    <div
      class="dot-right-top dot absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl"
    >
      <X size="20" color="#ccc" />
    </div>

    <!-- Bottom-left -->
    <div
      class="dot-left-bottom dot absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-xl"
    >
      <X size="20" color="#cccccc" />
    </div>

    <!-- Bottom-right -->
    <div
      class="dot-right-bottom dot absolute right-2 bottom-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-xl"
    >
      <X size="20" color="#ccc" />
    </div>

    <div class="snake-game-left">
      <div v-show="!skipGame" class="snake-game relative">
        <div
          v-if="isLoading"
          class="bg-primary-200 bg-opacity-90 loader-overlay absolute inset-0 z-20 flex items-center justify-center"
        >
          <div class="loader"></div>
        </div>
        <button
          v-if="gameOver"
          class="bg-a btn btn-accent absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white"
          @click="resetGame"
        >
          Restart
        </button>
        <!-- <button
          v-show="showSkipButton"
          v-if="!skipGame"
          class="bg-a btn btn-accent absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-white"
          @click="skipGame = true"
        >
          Skip
        </button> -->
        <div
          v-show="showSkipButton"
          v-if="!skipGame"
          class="bg-accent-100 absolute bottom-12 left-1/2 -translate-x-1/2 rounded-sm p-1"
        >
          start-game
        </div>

        <div class="h-[425px] w-[300px] rounded-2xl shadow-2xl">
          <canvas class="canvas rounded-2xl shadow-inner" id="board"></canvas>
        </div>
      </div>
      <div
        class="back-blur absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 blur-2xl"
      ></div>
    </div>
    <div class="snake-game-right">
      <div class="game-console h-36 w-48 bg-gray-400 p-4">
        <p class="text-sm text-white">// use keyboard</p>
        <p class="text-sm text-white">// arrows to play</p>
        <div class="console-btn mt-2 flex flex-col items-center gap-1">
          <div class="console-btn-up">
            <img :src="UpArrow" alt="" />
          </div>
          <div class="console-btn-downs flex gap-1">
            <div>
              <img :src="LeftArrow" alt="" />
            </div>
            <div>
              <img :src="DownArrow" alt="" />
            </div>
            <div>
              <img :src="RightArrow" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  width: 600px;
  display: flex;
  justify-content: center;
  /* From https://css.glass */
  background: rgba(255, 255, 255, 0.002);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(64px);
  -webkit-backdrop-filter: blur(6px);
  background: linear-gradient(
    175deg,
    rgba(67, 217, 173, 0.2) 0%,
    rgba(77, 91, 206, 0.2) 85%,
    rgba(77, 91, 206, 0.2) 100%
  );
  border: 2px solid rgba(12, 22, 22, 1);
}
.back-blur {
  background-image: url("../assets//icons/background-blur.svg");
  background-size: 1000px;
  background-position: center;
  background-repeat: no-repeat;
  width: 50vw;
  height: 50vh;
}

.loader {
  width: 40px;
  height: 40px;
  border: 4px solid #ffffff50;
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
.dot {
  color: #1e2d3d2d;
}
.game-console {
  background: rgba(255, 255, 255, 0.002);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(64px);
  -webkit-backdrop-filter: blur(6px);
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
