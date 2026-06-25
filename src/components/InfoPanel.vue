<template>
  <div class="info-panel">
    <h3>{{ data.title }}</h3>
    <div class="meta">{{ data.subtitle }}</div>
    <div class="story">
      <div class="quote-block">{{ data.quote }}</div>
      <div v-html="data.detail"></div>
      <p style="margin-top: 8px; font-size: 13px; color: var(--text-light)">
        📖 Nguồn: TTXVN · Báo Vĩnh Long
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { artifactData } from "@/data/artifactData";

const props = defineProps(["period"]);
const data = computed(
  () => artifactData[props.period] || artifactData["1946-1965"],
);
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
  color: var(--olive-dark);
  font-size: 18px;
  margin-bottom: 8px;
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
}
</style>
