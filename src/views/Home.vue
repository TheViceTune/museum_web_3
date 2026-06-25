<template>
  <div class="container page">
    <Slider />
    <VideoPlaceholder />
    <Disclaimer />
    <div class="quick-links">
      <div class="quick-card">
        <div class="icon">📖</div>
        <h4>Khám phá</h4>
        <p>Dòng chảy hiện vật &amp; ký ức lịch sử</p>
        <router-link to="/kham-pha" class="btn-outline">Xem ngay</router-link>
      </div>
      <div class="quick-card">
        <div class="icon">🎮</div>
        <h4>Trải nghiệm</h4>
        <p>Góc nhìn GenZ &amp; Truy tìm mảnh ghép</p>
        <router-link to="/trai-nghiem" class="btn-outline"
          >Tham gia</router-link
        >
      </div>
      <div class="quick-card">
        <div class="icon">📍</div>
        <h4>Tham quan</h4>
        <p>Giờ mở cửa &amp; vé vào cổng</p>
        <router-link to="/tham-quan" class="btn-outline"
          >Xem chi tiết</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from "@/components/Slider.vue";
import VideoPlaceholder from "@/components/VideoPlaceholder.vue";
import Disclaimer from "@/components/Disclaimer.vue";
</script>

<style scoped>
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.quick-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 20px;
  text-align: center;
  box-shadow: var(--shadow);
  border-top: 4px solid var(--gold);
}
.quick-card .icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.quick-card h4 {
  color: var(--olive-dark);
}
.quick-card p {
  font-size: 13px;
  color: var(--text-light);
}
.quick-card .btn-outline {
  margin-top: 10px;
  padding: 6px 18px;
  font-size: 13px;
}
</style>
