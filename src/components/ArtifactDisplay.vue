<template>
  <div class="artifact-display">
    <div class="artifact-image-box">
      <div class="icon-placeholder">{{ data.icon }}</div>
      <p>
        <strong>{{ data.label }}</strong
        ><br />{{ data.subtitle }}
      </p>
      <p style="font-size: 12px; margin-top: 4px">{{ data.imageNote }}</p>
    </div>
    <div class="artifact-quote">{{ data.quote }}</div>
    <div class="artifact-detail" v-html="data.detail"></div>
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
.artifact-display {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.artifact-image-box {
  background: var(--cream);
  border-radius: var(--radius);
  padding: 40px 20px;
  text-align: center;
  border: 2px dashed var(--olive-light);
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 14px;
}
.icon-placeholder {
  font-size: 56px;
  margin-bottom: 10px;
  opacity: 0.5;
}
.artifact-quote {
  font-style: italic;
  font-size: 18px;
  color: var(--olive-dark);
  padding: 16px 0 8px;
  border-bottom: 2px solid var(--gold);
  margin-bottom: 12px;
  font-weight: 500;
}
.artifact-quote::before {
  content: "“";
  color: var(--gold);
  font-size: 28px;
}
.artifact-quote::after {
  content: "”";
  color: var(--gold);
  font-size: 28px;
}
.artifact-detail h4 {
  color: var(--olive-dark);
  margin: 12px 0 4px;
  font-size: 15px;
}
.artifact-detail p {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.7;
}
</style>
