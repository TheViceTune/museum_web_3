<template>
  <div class="info-panel">
    <h3>{{ exhibit.title }}</h3>
    <div class="meta">{{ exhibit.subtitle }}</div>
    <div class="story">
      <div class="quote-block">{{ exhibit.quote }}</div>
      <div v-html="exhibit.detail"></div>
      <p style="margin-top: 8px; font-size: 13px; color: var(--text-light)">
        📖 Nguồn: TTXVN · Báo Vĩnh Long
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps(["exhibit"]);
</script>

<style scoped>
.info-panel {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  max-height: 600px;
  overflow-y: auto;
}
.info-panel h3 {
  color: var(--primary-dark);
  font-size: 20px;
  margin-bottom: 4px;
  font-family: var(--font-title);
  letter-spacing: 0.5px;
}
.info-panel .meta {
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 12px;
}
.info-panel .story {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text);
}
.info-panel .story p {
  margin-bottom: 10px;
}
.info-panel .story .quote-block {
  background: var(--cream);
  padding: 12px 16px;
  border-left: 4px solid var(--gold);
  font-style: italic;
  margin: 12px 0;
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 16px;
  color: var(--primary-dark);
}
</style>
