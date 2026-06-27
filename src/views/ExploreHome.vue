<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>VÙNG TRỜI KÝ ỨC</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Tái hiện những câu chuyện, hiện vật và ký ức của lực lượng Phòng không -
      Không quân Việt Nam trên hành trình bảo vệ Tổ Quốc
    </p>

    <div class="explore-cards" v-slide-in:bottom>
      <router-link to="/kham-pha/hien-vat" class="exp-card">
        <div
          class="exp-card-bg"
          style="
            background-image: url(&quot;https://via.placeholder.com/600x400/195484/ffffff?text=Hien+Vat&quot;);
          "
        ></div>
        <div class="exp-card-overlay"></div>
        <div class="exp-card-content">
          <div class="card-icon">📖</div>
          <h3>Dòng chảy hiện vật</h3>
          <p>
            Khám phá hành trình phát triển của lực lượng Phòng không - Không
            quân Việt Nam qua những hiện vật tiêu biểu của từng thời kỳ lịch sử.
          </p>
          <span class="btn-gold">KHÁM PHÁ →</span>
        </div>
      </router-link>

      <router-link to="/kham-pha/ky-uc" class="exp-card">
        <div
          class="exp-card-bg"
          style="
            background-image: url(&quot;https://via.placeholder.com/600x400/195484/ffffff?text=Ky+Uc&quot;);
          "
        ></div>
        <div class="exp-card-overlay"></div>
        <div class="exp-card-content">
          <div class="card-icon">📜</div>
          <h3>Ký ức lịch sử</h3>
          <p>
            Lắng nghe những câu chuyện về con người, sự kiện và dấu mốc lịch sử
            phía sau mỗi hiện vật và chiến công trên bầu trời Tổ quốc.
          </p>
          <span class="btn-gold">KHÁM PHÁ →</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.explore-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
}

/* Reuse the same card style as Experience */
.exp-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  height: 420px;
  text-decoration: none;
  color: var(--white);
  display: block;
  transition: var(--transition);
  box-shadow: var(--shadow);
}
.exp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
}
.exp-card-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.exp-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 100%
  );
}
.exp-card-content {
  position: relative;
  z-index: 2;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.card-icon {
  font-size: 48px;
  margin-bottom: 8px;
}
.exp-card-content h3 {
  font-family: var(--font-title);
  font-size: 24px;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}
.exp-card-content p {
  font-size: 15px;
  opacity: 0.9;
  margin-bottom: 16px;
  max-width: 90%;
}
.exp-card-content .btn-gold {
  background: var(--gold);
  color: var(--primary-dark);
  padding: 8px 24px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 14px;
  align-self: flex-start;
  transition: var(--transition);
  display: inline-block;
}
.exp-card-content .btn-gold:hover {
  background: var(--gold-light);
}

@media (max-width: 900px) {
  .explore-cards {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .explore-cards {
    grid-template-columns: 1fr;
  }
  .exp-card {
    height: 320px;
  }
}
</style>
