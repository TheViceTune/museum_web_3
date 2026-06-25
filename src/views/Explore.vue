<template>
  <div class="container page">
    <h1 class="page-title">Khám phá</h1>
    <p class="page-subtitle">
      Dòng chảy hiện vật · Ký ức lịch sử · Dấu son thời gian
    </p>

    <!-- New Timeline with sliding indicator -->
    <Timeline v-model="currentPeriod" />

    <!-- Carousel with arrows (unchanged) -->
    <div class="carousel-wrapper">
      <button
        class="arrow-btn left"
        @click="prev"
        :disabled="currentIndex === 0"
      >
        ‹
      </button>
      <div class="carousel-content">
        <transition name="slide" mode="out-in">
          <div :key="currentPeriod" class="carousel-item">
            <div class="explore-layout">
              <ArtifactDisplay :period="currentPeriod" />
              <InfoPanel :period="currentPeriod" />
            </div>
          </div>
        </transition>
      </div>
      <button
        class="arrow-btn right"
        @click="next"
        :disabled="currentIndex === periods.length - 1"
      >
        ›
      </button>
    </div>

    <!-- Story cards and hero profiles (unchanged) -->
    <!-- ... -->
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Timeline from "@/components/Timeline.vue";
import ArtifactDisplay from "@/components/ArtifactDisplay.vue";
import InfoPanel from "@/components/InfoPanel.vue";

const periods = ["1946-1965", "1965-1975", "1975-nay"];
const currentIndex = ref(0);

const currentPeriod = computed({
  get: () => periods[currentIndex.value],
  set: (val) => {
    const idx = periods.indexOf(val);
    if (idx !== -1) currentIndex.value = idx;
  },
});

function next() {
  if (currentIndex.value < periods.length - 1) currentIndex.value++;
}

function prev() {
  if (currentIndex.value > 0) currentIndex.value--;
}
</script>

<style scoped>
/* Same as before – carousel arrows, transitions, etc. */
.explore-layout {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 30px;
}
@media (max-width: 900px) {
  .explore-layout {
    grid-template-columns: 1fr;
  }
}

.carousel-wrapper {
  position: relative;
  margin: 20px 0;
  display: flex;
  align-items: stretch;
}
.carousel-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}
.carousel-item {
  width: 100%;
}
.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  background: var(--olive-dark);
  color: var(--white);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 28px;
  line-height: 1;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
.arrow-btn:hover:not(:disabled) {
  background: var(--gold);
  color: var(--olive-dark);
}
.arrow-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.arrow-btn.left {
  left: -20px;
}
.arrow-btn.right {
  right: -20px;
}
@media (max-width: 768px) {
  .arrow-btn {
    width: 32px;
    height: 32px;
    font-size: 20px;
  }
  .arrow-btn.left {
    left: -12px;
  }
  .arrow-btn.right {
    right: -12px;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

/* The rest of the story cards and profiles stay the same */
</style>
