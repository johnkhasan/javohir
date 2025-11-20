<template>
  <div class="loader-wrapper bg-primary-200">
    <div class="w-12 h-12 spinner border-6 border-a! border-t-secondary-100!"></div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}
.spinner {
 
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
