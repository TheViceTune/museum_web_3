<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>Truy tìm mảnh ghép</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Hãy thử thách bản thân với những câu hỏi thú vị về quân chủng Phòng không
      - Không quân để học hỏi thêm nhiều kiến thức mới nhé!
    </p>

    <PuzzleGame v-slide-in:bottom="{ delay: 150 }" />

    <div style="text-align: center; margin-top: 30px">
      <router-link to="/trai-nghiem" class="btn-outline"
        >← Quay lại trang chính</router-link
      >
    </div>
  </div>
</template>

<script setup>
import PuzzleGame from "@/components/PuzzleGame.vue";
</script>

<style scoped>
/* No additional styles needed – PuzzleGame has its own styling */
</style>
