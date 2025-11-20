<script setup>
import { ref, onMounted, watch } from 'vue'

const WORK_TIME = 20 * 60 // 20 daqiqa
const BREAK_TIME = 20 // 20 soniya

const timer = ref(WORK_TIME)
const isBreak = ref(false)
const interval = ref(null)

// Audio notification
const audio = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg')

// Timer start
function startTimer() {
  interval.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value--
    } else {
      isBreak.value = !isBreak.value
      timer.value = isBreak.value ? BREAK_TIME : WORK_TIME
      notify()
    }
  }, 1000)
}

// Notification
function notify() {
  if (Notification.permission === 'granted') {
    new Notification(isBreak.value ? 'Break Time!' : 'Work Time!', {
      body: isBreak.value
        ? 'Look away for 20 seconds!'
        : 'Back to work!',
    })
  }
  audio.play().catch(() => {})
}

// Format time mm:ss
function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

// Ask permission on mount
onMounted(() => {
  if ('Notification' in window) {
    Notification.requestPermission()
  }
  startTimer()
})
</script>

<template>
  <div
    :class="[
      'flex flex-col items-center justify-center h-screen transition-colors duration-1000',
      isBreak ? 'bg-green-900' : 'bg-gray-900'
    ]"
  >
    <h1 class="text-4xl font-light text-white mb-6">
      {{ isBreak ? 'Break Time!' : 'Work Time' }}
    </h1>
    <div class="text-7xl font-mono text-white mb-4">
      {{ formatTime(timer) }}
    </div>
    <p class="text-gray-400 text-sm">
      20–20–20 rule: Every 20 min, look 20 feet away for 20 seconds
    </p>
  </div>
</template>

<style>

</style>