<template>
  <div class="slider-placeholder">
    <span class="slider-badge">✦ Bảo tàng Phòng không - Không quân</span>
    <h2>
      Những khối thép im lặng hôm nay<br />chính là chứng tích của một bầu trời
      từng rực lửa.
    </h2>
    <p>Lịch sử không chỉ được lưu giữ, mà còn hiện diện như ký ức sống.</p>
    <div class="slide-dots">
      <span class="active"></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div style="margin-top: 16px; font-size: 13px; opacity: 0.6">
      ▸ 4–5 ảnh trượt · Ảnh: TTXVN
    </div>
  </div>
</template>

<style scoped>
.slider-placeholder {
  background: var(--olive);
  border-radius: var(--radius);
  padding: 60px 20px;
  text-align: center;
  color: var(--white);
  position: relative;
  overflow: hidden;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.slider-placeholder .slide-dots {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
.slider-placeholder .slide-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: var(--transition);
}
.slider-placeholder .slide-dots span.active {
  background: var(--gold);
  width: 30px;
  border-radius: 6px;
}
.slider-placeholder h2 {
  font-size: 28px;
  margin-bottom: 8px;
}
.slider-placeholder p {
  opacity: 0.85;
  max-width: 600px;
}
.slider-badge {
  background: var(--gold);
  color: var(--olive-dark);
  padding: 4px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 12px;
}
@media (max-width: 768px) {
  .slider-placeholder h2 {
    font-size: 20px;
  }
}
</style>
