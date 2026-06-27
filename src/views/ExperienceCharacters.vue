<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>Nhân vật</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Những anh hùng, phi công và nhân vật tiêu biểu đã làm nên lịch sử.
    </p>

    <div class="characters-grid" v-slide-in:bottom>
      <div class="character-card" v-for="hero in heroes" :key="hero.name">
        <div
          class="char-image"
          :style="{
            backgroundImage: `url(${hero.image || 'https://via.placeholder.com/300x300/195484/ffffff?text=' + hero.name})`,
          }"
        ></div>
        <div class="char-info">
          <h3>{{ hero.name }}</h3>
          <p class="char-title">{{ hero.title }}</p>
          <p class="char-desc">{{ hero.description }}</p>
          <div class="char-quote">“{{ hero.quote }}”</div>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 30px">
      <router-link to="/trai-nghiem" class="btn-outline"
        >← Quay lại trang chính</router-link
      >
    </div>
  </div>
</template>

<script setup>
const heroes = [
  {
    name: "Nguyễn Văn Bảy",
    title: "Anh hùng Lực lượng vũ trang nhân dân",
    description:
      "Phi công huyền thoại “Ông Bảy lúa” với 7 máy bay Mỹ bị bắn hạ. Từ cậu bé chăn trâu lớp 3 đến ách chủ bài trên bầu trời.",
    quote: "Lái máy bay như lái trâu cày - cứ nhắm thẳng vào địch mà đánh.",
    image: "https://via.placeholder.com/300x300/195484/ffffff?text=Bảy",
  },
  {
    name: "Vũ Xuân Thiều",
    title: "Anh hùng Lực lượng vũ trang nhân dân (truy tặng)",
    description:
      "Phi công đã thực hiện lời thề “taran” lao thẳng vào B-52 đêm 28/12/1972, hy sinh ở tuổi 27.",
    quote:
      "Em mà gặp được B-52 thì nó đừng hòng thoát. Nếu bắn mà nó không rơi, thì em taran!",
    image: "https://via.placeholder.com/300x300/195484/ffffff?text=Thiều",
  },
  {
    name: "Nguyễn Văn Cốc",
    title: "Trung tướng, Anh hùng Lực lượng vũ trang nhân dân",
    description:
      "“Chim cắt số 2” – phi công duy nhất bắn hạ 9 máy bay Mỹ, với 6 chiếc khi đang ở vị trí yểm trợ.",
    quote:
      "Chưa một lần nào tôi mất bình tĩnh khi đối mặt với không quân địch.",
    image: "https://via.placeholder.com/300x300/195484/ffffff?text=Cốc",
  },
  {
    name: "Tô Vĩnh Diện",
    title: "Anh hùng Lực lượng vũ trang nhân dân",
    description:
      "Khẩu đội trưởng pháo cao xạ 37mm đã hy sinh để cứu khẩu pháo khỏi rơi xuống vực tại Điện Biên Phủ.",
    quote: "Pháo có việc gì không?",
    image: "https://via.placeholder.com/300x300/195484/ffffff?text=Diện",
  },
];
</script>

<style scoped>
.characters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 20px;
}
.character-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
}
.character-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}
.char-image {
  height: 200px;
  background-size: cover;
  background-position: center;
}
.char-info {
  padding: 20px;
}
.char-info h3 {
  font-family: var(--font-title);
  color: var(--primary-dark);
  font-size: 20px;
  letter-spacing: 0.5px;
}
.char-title {
  font-weight: 600;
  color: var(--gold);
  font-size: 14px;
  margin: 4px 0 8px;
}
.char-desc {
  font-size: 14px;
  color: var(--text-light);
  line-height: 1.6;
}
.char-quote {
  background: var(--cream);
  padding: 12px 16px;
  border-left: 4px solid var(--gold);
  font-style: italic;
  margin-top: 12px;
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 14px;
  color: var(--text);
}
</style>
