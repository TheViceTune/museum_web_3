<template>
  <div class="genz-card">
    <div class="card-photo" :style="{ backgroundImage: `url(${photo})` }"></div>
    <div class="card-body">
      <div class="name">{{ name }}</div>
      <div class="detail">{{ age }} tuổi · {{ school }}</div>
      <div class="quote">{{ quote }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps(["name", "age", "school", "quote", "photo"]);
</script>

<style scoped>
.genz-card {
  background: var(--white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 100%;
}
.genz-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-photo {
  width: 100%;
  height: 180px;
  background-size: cover;
  background-position: center;
  background-color: var(--cream);
  flex-shrink: 0;
}

.card-body {
  padding: 20px 20px 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.genz-card .name {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 18px;
  font-family: var(--font-title);
  letter-spacing: 0.3px;
}
.genz-card .detail {
  font-size: 13px;
  color: var(--text-light);
  margin-bottom: 8px;
}
.genz-card .quote {
  font-style: italic;
  margin: 6px 0 4px;
  font-size: 14px;
  color: var(--text);
  line-height: 1.7;
  flex-grow: 1;
}
</style>
