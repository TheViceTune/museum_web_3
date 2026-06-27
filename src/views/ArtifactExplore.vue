<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>Dòng chảy hiện vật</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Khám phá hành trình phát triển của lực lượng Phòng không - Không quân Việt
      Nam qua những hiện vật tiêu biểu của từng thời kỳ lịch sử.
    </p>

    <!-- Audio floating -->
    <div class="audio-float">
      <audio ref="audioRef" controls loop>
        <source :src="noiseAudio" type="audio/mpeg" />
      </audio>
    </div>

    <Timeline v-model="currentPeriod" v-slide-in:bottom="{ delay: 100 }" />

    <div class="carousel-wrapper" v-slide-in:bottom="{ delay: 200 }">
      <button
        class="arrow-btn left"
        @click="prevExhibit"
        :disabled="exhibitIndex === 0"
      >
        ‹
      </button>
      <div class="carousel-content">
        <transition name="slide" mode="out-in">
          <div :key="currentExhibit.id" class="carousel-item">
            <div class="explore-layout">
              <ArtifactDisplay :exhibit="currentExhibit" />
              <InfoPanel :exhibit="currentExhibit" />
            </div>
          </div>
        </transition>
      </div>
      <button
        class="arrow-btn right"
        @click="nextExhibit"
        :disabled="exhibitIndex === exhibitsInPeriod.length - 1"
      >
        ›
      </button>
    </div>

    <div class="exhibit-counter" v-slide-in:bottom="{ delay: 300 }">
      {{ exhibitIndex + 1 }} / {{ exhibitsInPeriod.length }}
    </div>

    <!-- Back to Explore Home -->
    <div style="text-align: center; margin-top: 20px">
      <router-link to="/kham-pha" class="btn-outline"
        >← Quay lại trang chính</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import Timeline from "@/components/Timeline.vue";
import ArtifactDisplay from "@/components/ArtifactDisplay.vue";
import InfoPanel from "@/components/InfoPanel.vue";
import { exhibitsData, periods } from "@/data/exhibits";
import noiseAudio from "/noise.mp3";

const router = useRouter();
const audioRef = ref(null);
let audioElement = null;

onMounted(() => {
  audioElement = audioRef.value;
  if (audioElement) {
    audioElement.play().catch(() => {});
  }
  const stopAudio = () => {
    if (audioElement && !audioElement.paused) audioElement.pause();
  };
  const unregister = router.afterEach((to) => {
    if (to.path !== "/kham-pha/hien-vat") stopAudio();
  });
  onBeforeUnmount(() => {
    stopAudio();
    unregister();
  });
});

const currentPeriod = ref(periods[0]);
const exhibitIndex = ref(0);
const exhibitsInPeriod = computed(
  () => exhibitsData[currentPeriod.value] || [],
);
const currentExhibit = computed(() => {
  const list = exhibitsInPeriod.value;
  return list[exhibitIndex.value] || list[0];
});
watch(currentPeriod, () => {
  exhibitIndex.value = 0;
});

function nextExhibit() {
  if (exhibitIndex.value < exhibitsInPeriod.value.length - 1)
    exhibitIndex.value++;
}
function prevExhibit() {
  if (exhibitIndex.value > 0) exhibitIndex.value--;
}
</script>

<style scoped>
/* All styles from the original Explore.vue (unchanged) */
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
  background: var(--primary-dark);
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
  color: var(--primary-dark);
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
.audio-float {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 999;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 40px;
  padding: 6px 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.audio-float audio {
  width: 120px;
  height: 32px;
  outline: none;
}
.audio-float audio::-webkit-media-controls-panel {
  background: transparent;
}
@media (max-width: 600px) {
  .audio-float {
    top: 70px;
    right: 10px;
    padding: 4px 8px;
  }
  .audio-float audio {
    width: 100px;
    height: 28px;
  }
}
.exhibit-counter {
  text-align: center;
  font-size: 14px;
  color: var(--text-light);
  margin: 8px 0 20px;
  font-weight: 500;
}
</style>
