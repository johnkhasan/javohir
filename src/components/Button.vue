<script setup>
import { computed } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  color: { type: String, default: "primary" }, // primary, secondary, accent, etc
  variant: { type: String, default: "solid" }, // solid, outline, soft
  size: { type: String, default: "md" }, // sm, md, lg
  rounded: { type: String, default: "md" }, // none, sm, md, lg, full
  border: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
});

// Button sizes
const sizeClasses = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

// Border radius
const roundedClasses = {
  none: "rounded-none",
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

// Variants
const variantClasses = computed(() => {
  switch (props.variant) {
    case "outline":
      return `border border-${props.color}-200 text-${props.color}-200 bg-transparent`;
    case "soft":
      return `bg-${props.color}-100/20 text-${props.color}-300`;
    default:
      // solid
      return `bg-${props.color}-200 text-white`;
  }
});

// Final class
const classes = computed(
  () => `
  ${sizeClasses[props.size]}
  ${roundedClasses[props.rounded]}
  ${variantClasses.value}
  ${props.border ? "border border-line" : ""}
  transition-all duration-200
  hover:opacity-90 active:opacity-80
  disabled:opacity-50 disabled:cursor-not-allowed
`
);
</script>

<template>
  <button :class="classes" :disabled="disabled">
    {{ text }}
  </button>
</template>
