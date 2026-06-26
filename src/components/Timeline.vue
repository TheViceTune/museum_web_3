<template>
  <div class="timeline-trail">
    <div class="trail-track">
      <div
        v-for="period in periods"
        :key="period.value"
        class="trail-item"
        :class="{ active: modelValue === period.value }"
        @click="$emit('update:modelValue', period.value)"
      >
        <span class="dot"></span>
        <span class="label">{{ period.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const periods = [
  { value: "1946-1965", label: "1946 – 1965" },
  { value: "1965-1975", label: "1965 – 1975" },
  { value: "1975-nay", label: "1975 – NAY" },
];
</script>

<style scoped>
.timeline-trail {
  background: var(--white);
  border-radius: var(--radius);
  padding: 20px 30px;
  box-shadow: var(--shadow);
  margin: 20px 0;
}
.trail-track {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}
.trail-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 2;
  padding: 0 8px;
  flex: 1;
  text-align: center;
}
.trail-item .dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--cream);
  border: 2px solid var(--primary-light);
  transition: all 0.3s ease;
  margin-bottom: 6px;
}
.trail-item.active .dot {
  background: var(--primary);
  border-color: var(--gold);
  box-shadow: 0 0 0 4px rgba(25, 84, 132, 0.2);
}
.trail-item .label {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-light);
  transition: color 0.3s ease;
}
.trail-item.active .label {
  color: var(--primary-dark);
  font-weight: 600;
}
.trail-item:hover .label {
  color: var(--primary-dark);
}
.trail-track::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--cream);
  transform: translateY(-50%);
  z-index: 0;
}
@media (max-width: 600px) {
  .timeline-trail {
    padding: 16px 10px;
  }
  .trail-item .label {
    font-size: 12px;
  }
  .trail-item .dot {
    width: 12px;
    height: 12px;
  }
}
</style>
