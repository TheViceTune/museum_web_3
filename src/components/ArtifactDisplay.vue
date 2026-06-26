<template>
  <div class="artifact-display">
    <div class="artifact-image-box">
      <div class="icon-placeholder">{{ exhibit.icon }}</div>
      <p>
        <strong>{{ exhibit.label }}</strong
        ><br />{{ exhibit.subtitle }}
      </p>
      <p style="font-size: 12px; margin-top: 4px">{{ exhibit.imageNote }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps(["exhibit"]);
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
  justify-content: center;
}
.artifact-image-box {
  background: var(--cream);
  border-radius: var(--radius);
  padding: 40px 20px;
  text-align: center;
  border: 2px dashed var(--primary-light);
  min-height: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  font-size: 14px;
}
.icon-placeholder {
  font-size: 80px;
  margin-bottom: 10px;
  opacity: 0.6;
}
</style>
