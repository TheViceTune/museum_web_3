<template>
  <div class="genz-card">
    <div class="name">{{ name }}</div>
    <div class="detail">{{ age }} tuổi · {{ school }}</div>
    <div class="quote">{{ quote }}</div>
  </div>
</template>

<script setup>
defineProps(["name", "age", "school", "quote"]);
</script>

<style scoped>
.genz-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 20px;
  box-shadow: var(--shadow);
  border-top: 4px solid var(--gold);
}
.genz-card .name {
  font-weight: 600;
  color: var(--olive-dark);
}
.genz-card .detail {
  font-size: 13px;
  color: var(--text-light);
}
.genz-card .quote {
  font-style: italic;
  margin: 8px 0 4px;
  font-size: 14px;
  color: var(--text);
}
</style>
