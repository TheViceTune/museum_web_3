<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>Ký ức lịch sử</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Lắng nghe những câu chuyện về con người, sự kiện và dấu mốc lịch sử phía
      sau mỗi hiện vật và chiến công trên bầu trời Tổ quốc.
    </p>

    <div class="story-grid" v-slide-in:bottom>
      <router-link
        v-for="story in stories"
        :key="story.id"
        :to="`/kham-pha/ky-uc/${story.id}`"
        class="story-card"
      >
        <div
          class="story-card-bg"
          :style="{
            backgroundImage: `url(${story.image || 'https://via.placeholder.com/400x400/195484/ffffff?text=' + story.title})`,
          }"
        ></div>
        <div class="story-card-overlay"></div>
        <div class="story-card-content">
          <h3>{{ story.title }}</h3>
          <p>{{ story.excerpt }}</p>
          <span class="btn-gold">KHÁM PHÁ →</span>
        </div>
      </router-link>
    </div>

    <div style="text-align: center; margin-top: 20px">
      <router-link to="/kham-pha" class="btn-outline"
        >← Quay lại trang chính</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { storyCards } from "@/data/storyData";
const stories = storyCards;
</script>

<style scoped>
.story-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 20px;
}
.story-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  height: 350px;
  text-decoration: none;
  color: var(--white);
  display: block;
  box-shadow: var(--shadow);
  transition: var(--transition);
}
.story-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}
.story-card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.story-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
}
.story-card-content {
  position: relative;
  z-index: 2;
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.story-card-content h3 {
  font-family: var(--font-title);
  font-size: 20px;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.story-card-content p {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.story-card-content .btn-gold {
  background: var(--gold);
  color: var(--primary-dark);
  padding: 6px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 13px;
  align-self: flex-start;
  transition: var(--transition);
}
.story-card-content .btn-gold:hover {
  background: var(--gold-light);
}
@media (max-width: 600px) {
  .story-card {
    height: 280px;
  }
}
</style>
