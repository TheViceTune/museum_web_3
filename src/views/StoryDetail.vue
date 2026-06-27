<template>
  <div class="container page">
    <div class="story-detail" v-if="story">
      <h1 class="page-title" v-slide-in:left>{{ story.title }}</h1>
      <div
        class="story-content"
        v-html="story.fullStory"
        v-slide-in:bottom
      ></div>

      <div class="story-navigation" v-slide-in:bottom>
        <router-link
          :to="`/kham-pha/ky-uc/${prevId}`"
          v-if="prevId"
          class="btn-outline"
          >← Trước</router-link
        >
        <router-link to="/kham-pha/ky-uc" class="btn-outline"
          >📖 Danh sách</router-link
        >
        <router-link
          :to="`/kham-pha/ky-uc/${nextId}`"
          v-if="nextId"
          class="btn-outline"
          >Sau →</router-link
        >
      </div>
    </div>
    <div v-else>
      <p>Không tìm thấy câu chuyện.</p>
      <router-link to="/kham-pha/ky-uc" class="btn-outline"
        >Quay lại</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storyCards } from "@/data/storyData";

const route = useRoute();
const storyId = route.params.id;

const currentIndex = computed(() => {
  return storyCards.findIndex((s) => s.id === storyId);
});

const story = computed(() => {
  return storyCards.find((s) => s.id === storyId);
});

const prevId = computed(() => {
  const idx = currentIndex.value;
  if (idx > 0) return storyCards[idx - 1].id;
  return null;
});

const nextId = computed(() => {
  const idx = currentIndex.value;
  if (idx < storyCards.length - 1) return storyCards[idx + 1].id;
  return null;
});
</script>

<style scoped>
.story-detail {
  max-width: 800px;
  margin: 0 auto;
}
.story-content {
  font-size: 16px;
  line-height: 1.9;
  color: var(--text);
  background: var(--white);
  padding: 30px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}
.story-content p {
  margin-bottom: 16px;
}
.story-navigation {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 30px;
  flex-wrap: wrap;
}
.story-navigation .btn-outline {
  padding: 8px 20px;
}
@media (max-width: 600px) {
  .story-navigation {
    flex-direction: column;
    align-items: stretch;
  }
  .story-navigation .btn-outline {
    text-align: center;
  }
}
</style>
