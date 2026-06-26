<template>
  <section class="hero">
    <div
      class="hero-slide"
      v-for="(slide, index) in slides"
      :key="index"
      v-show="currentIndex === index"
    >
      <!-- Background image (full width) -->
      <div
        class="hero-bg"
        :style="{ backgroundImage: `url(${slide.image})` }"
      ></div>
      <!-- Left overlay with blur and semi-transparent background -->
      <div class="hero-overlay-left">
        <div class="hero-text">
          <span class="hero-badge">✦ {{ slide.badge }}</span>
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.description }}</p>
          <router-link to="/kham-pha" class="btn-gold hero-btn">{{
            slide.cta
          }}</router-link>
        </div>
      </div>
      <!-- Clear right side (no overlay) – remains visible -->
    </div>
    <!-- Dots -->
    <div class="hero-dots">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        class="dot"
        :class="{ active: currentIndex === index }"
        @click="goTo(index)"
      ></span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const slides = [
  {
    badge: "Bảo tàng Phòng không - Không quân",
    title: "VÙNG TRỜI\nKÝ ỨC",
    description:
      "Tái hiện những câu chuyện, hiện vật và ký ức của lực lượng Phòng không - Không quân Việt Nam trên hành trình bảo vệ Tổ Quốc",
    cta: "KHÁM PHÁ",
    image: "https://via.placeholder.com/1920x800/195484/ffffff?text=Slide+1",
  },
  {
    badge: "Chiến công oanh liệt",
    title: "BẦU TRỜI\nRỰC LỬA",
    description:
      "Những chiến tích vang dội của lực lượng phòng không trong cuộc kháng chiến chống Mỹ cứu nước.",
    cta: "KHÁM PHÁ",
    image: "https://via.placeholder.com/1920x800/195484/ffffff?text=Slide+2",
  },
  {
    badge: "Phi công huyền thoại",
    title: "ĐÔI CÁNH\nTHÉP",
    description:
      "Những người con anh dũng đã làm nên lịch sử trên bầu trời Việt Nam.",
    cta: "KHÁM PHÁ",
    image: "https://via.placeholder.com/1920x800/195484/ffffff?text=Slide+3",
  },
  {
    badge: "Hiện vật lịch sử",
    title: "CHỨNG TÍCH\nTHỜI GIAN",
    description:
      "Mỗi hiện vật là một câu chuyện, mỗi câu chuyện là một bài học về lòng yêu nước.",
    cta: "KHÁM PHÁ",
    image: "https://via.placeholder.com/1920x800/195484/ffffff?text=Slide+4",
  },
];

const currentIndex = ref(0);
let interval = null;

function goTo(index) {
  currentIndex.value = index;
  resetAutoScroll();
}

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % slides.length;
}

function resetAutoScroll() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  interval = setInterval(nextSlide, 5000);
}

onMounted(() => {
  resetAutoScroll();
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
  margin-bottom: 20px;
}

.hero-slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}

/* Left overlay: covers left 50% with blur and gradient */
.hero-overlay-left {
  position: relative;
  z-index: 1;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.hero-text {
  max-width: 500px;
  color: var(--white);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.5);
}

.hero-badge {
  background: var(--gold);
  color: var(--primary-dark);
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-body);
  display: inline-block;
  margin-bottom: 16px;
}

.hero-text h1 {
  font-family: var(--font-title);
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 12px;
  letter-spacing: 2px;
  white-space: pre-line;
}

.hero-text p {
  font-family: var(--font-body);
  font-size: 1.2rem;
  opacity: 0.9;
  margin-bottom: 20px;
}

.hero-btn {
  background: var(--gold);
  color: var(--primary-dark);
  padding: 12px 32px;
  border-radius: 40px;
  font-weight: 600;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
  text-transform: uppercase;
  font-family: var(--font-body);
}
.hero-btn:hover {
  background: var(--gold-light);
}

/* Dots */
.hero-dots {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  display: flex;
  gap: 12px;
}

.hero-dots .dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: var(--transition);
}

.hero-dots .dot.active {
  background: var(--gold);
  width: 30px;
  border-radius: 6px;
}

/* Mobile */
@media (max-width: 768px) {
  .hero {
    height: 50vh;
    min-height: 350px;
  }
  .hero-overlay-left {
    width: 70%;
    padding: 20px;
  }
  .hero-text h1 {
    font-size: 2.2rem;
  }
  .hero-text p {
    font-size: 1rem;
  }
  .hero-btn {
    padding: 8px 20px;
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .hero-overlay-left {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
  .hero-text h1 {
    font-size: 1.8rem;
  }
  .hero-text p {
    font-size: 0.9rem;
  }
}
</style>
