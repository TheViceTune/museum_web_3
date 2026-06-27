<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>Trải nghiệm</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Khám phá những góc nhìn đa dạng về bảo tàng qua các hoạt động tương tác.
    </p>

    <div class="experience-cards" v-slide-in:bottom>
      <router-link to="/trai-nghiem/genz" class="exp-card">
        <div
          class="exp-card-bg"
          style="
            background-image: url(&quot;https://via.placeholder.com/600x400/195484/ffffff?text=GenZ&quot;);
          "
        ></div>
        <div class="exp-card-overlay"></div>
        <div class="exp-card-content">
          <h3>Góc nhìn GenZ</h3>
          <p>
            Lắng nghe những cảm nghĩ và tâm sự của các bạn trẻ sau khi tham quan
            Bảo tàng Phòng không - Không quân!
          </p>
          <span class="btn-gold">KHÁM PHÁ →</span>
        </div>
      </router-link>

      <router-link to="/trai-nghiem/puzzle" class="exp-card">
        <div
          class="exp-card-bg"
          style="
            background-image: url(&quot;https://via.placeholder.com/600x400/195484/ffffff?text=Puzzle&quot;);
          "
        ></div>
        <div class="exp-card-overlay"></div>
        <div class="exp-card-content">
          <h3>Truy tìm mảnh ghép</h3>
          <p>
            Hãy thử thách bản thân với những câu hỏi thú vị về quân chủng Phòng
            không - Không quân để học hỏi thêm nhiều kiến thức mới nhé!
          </p>
          <span class="btn-gold">KHÁM PHÁ →</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.experience-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
}

/* Card styles (same as before) */
.exp-card {
  position: relative;
  border-radius: var(--radius);
  overflow: hidden;
  height: 400px;
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
  .experience-cards {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .experience-cards {
    grid-template-columns: 1fr;
  }
  .exp-card {
    height: 300px;
  }
}
</style>
