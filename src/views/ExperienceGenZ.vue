<template>
  <div class="container page">
    <h1 class="page-title" v-slide-in:left>Góc nhìn GenZ</h1>
    <p class="page-subtitle" v-slide-in:left="{ delay: 100 }">
      Lắng nghe những cảm nghĩ và tâm sự của các bạn trẻ sau khi tham quan Bảo
      tàng Phòng không - Không quân!
    </p>

    <!-- Reviews -->
    <div class="genz-grid" v-slide-in:bottom>
      <GenZCard
        v-for="(item, idx) in genzList"
        :key="idx"
        :name="item.name"
        :age="item.age"
        :school="item.school"
        :quote="item.quote"
        :photo="item.photo"
        v-slide-in:bottom="{ delay: idx * 80 }"
      />
    </div>

    <!-- Feedback CTA -->
    <div class="feedback-cta" v-slide-in:bottom>
      <p>Chia sẻ thêm với chúng mình tại đây!</p>
      <button class="btn-gold" @click="openFeedbackForm">
        📝 Gửi phản hồi
      </button>
    </div>

    <!-- Check-in gallery section -->
    <div class="gallery-section" v-slide-in:bottom="{ delay: 200 }">
      <h2 class="gallery-title">NHỮNG GÓC CHECK IN TẠI BẢO TÀNG</h2>
      <div class="gallery-grid">
        <div
          class="gallery-item"
          v-for="(img, idx) in checkinPhotos"
          :key="idx"
        >
          <img :src="img" :alt="'Check-in ' + (idx + 1)" />
        </div>
      </div>
      <div class="gallery-share">
        <span>Chia sẻ thêm với chúng mình tại đây!</span>
        <button class="btn-gold" @click="shareCheckin">📸 Chia sẻ ảnh</button>
      </div>
    </div>

    <!-- Back button -->
    <div style="text-align: center; margin-top: 30px">
      <router-link to="/trai-nghiem" class="btn-outline"
        >← Quay lại trang chính</router-link
      >
    </div>

    <!-- Feedback Modal (simple placeholder) -->
    <div
      v-if="feedbackModalVisible"
      class="modal-overlay"
      @click.self="closeFeedbackModal"
    >
      <div class="modal-content">
        <button class="close-btn" @click="closeFeedbackModal">✕</button>
        <h2>Chia sẻ cảm nhận của bạn</h2>
        <form @submit.prevent="submitFeedback">
          <div class="form-group">
            <label>Tên của bạn</label>
            <input
              type="text"
              v-model="feedbackName"
              placeholder="Nhập tên..."
              required
            />
          </div>
          <div class="form-group">
            <label>Tuổi</label>
            <input
              type="number"
              v-model="feedbackAge"
              placeholder="Nhập tuổi..."
              required
            />
          </div>
          <div class="form-group">
            <label>Trường / Nơi làm việc</label>
            <input
              type="text"
              v-model="feedbackSchool"
              placeholder="Nhập thông tin..."
              required
            />
          </div>
          <div class="form-group">
            <label>Cảm nhận của bạn</label>
            <textarea
              v-model="feedbackMessage"
              rows="4"
              placeholder="Chia sẻ cảm nghĩ của bạn về bảo tàng..."
              required
            ></textarea>
          </div>
          <button type="submit" class="btn-primary">Gửi phản hồi</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import GenZCard from "@/components/GenZCard.vue";

const genzList = [
  {
    name: "Nguyễn Khánh Linh",
    age: 21,
    school: "ĐH Ngoại Thương",
    quote:
      "“Đây là lần đầu tiên mình đi Bảo tàng, và ấn tượng lớn nhất đó chính là những khẩu pháo và phi cơ to khổng lồ, nhiều câu chuyện lịch sử về Phòng không - Không quân cũng khiến mình biết ơn hơn về những công ơn của những thế hệ đi trước.”",
    photo: "https://via.placeholder.com/400x250/195484/ffffff?text=Khanh+Linh",
  },
  {
    name: "Nguyễn Minh Nga",
    age: 20,
    school: "ĐH Kinh tế Quốc dân",
    quote:
      "“Ngày mình tham quan bảo tàng cũng là một ngày nắng đẹp, do đó mình vô cùng háo hức. Mình thấy việc bảo tàng dành nguyên tầng 2 cho trận Điện Biên Phủ trên không vô cùng ý nghĩa vì đó là chiến tích lớn nhất của quân chủng Phòng không - Không quân.”",
    photo: "https://via.placeholder.com/400x250/195484/ffffff?text=Minh+Nga",
  },
  {
    name: "Nguyễn Văn Anh",
    age: 22,
    school: "ĐH Bách Khoa",
    quote:
      "“Cảm giác bảo tàng làm khá tốt ở phần không gian, không bị ngột ngạt như mình từng nghĩ về bảo tàng quân sự.”",
    photo: "https://via.placeholder.com/400x250/195484/ffffff?text=Van+Anh",
  },
  {
    name: "Trần Thị Bình",
    age: 19,
    school: "Sinh viên",
    quote:
      "“Không nghĩ một bảo tàng quân sự ở Hà Nội lại cuốn vậy luôn. Đi xong cảm giác vừa chill vừa học được nhiều thứ.”",
    photo: "https://via.placeholder.com/400x250/195484/ffffff?text=Thi+Binh",
  },
  {
    name: "Lê Văn Cường",
    age: 23,
    school: "ĐH Quốc gia Hà Nội",
    quote:
      "“Có những khoảnh khắc đứng dưới máy bay thật sự thấy choáng ngợp. Tự nhiên hiểu hơn về một giai đoạn lịch sử.”",
    photo: "https://via.placeholder.com/400x250/195484/ffffff?text=Van+Cuong",
  },
  {
    name: "Phạm Thị Dung",
    age: 20,
    school: "Học viện Báo chí và Tuyên truyền",
    quote:
      "“Mình thấy việc bảo tàng tổ chức các trò chơi tương tác rất hay, giúp giới trẻ tiếp cận lịch sử một cách nhẹ nhàng và dễ nhớ hơn.”",
    photo: "https://via.placeholder.com/400x250/195484/ffffff?text=Thi+Dung",
  },
];

// Check-in photos (replace with actual image URLs)
const checkinPhotos = [
  "https://via.placeholder.com/300x300/195484/ffffff?text=Checkin+1",
  "https://via.placeholder.com/300x300/195484/ffffff?text=Checkin+2",
  "https://via.placeholder.com/300x300/195484/ffffff?text=Checkin+3",
  "https://via.placeholder.com/300x300/195484/ffffff?text=Checkin+4",
  "https://via.placeholder.com/300x300/195484/ffffff?text=Checkin+5",
  "https://via.placeholder.com/300x300/195484/ffffff?text=Checkin+6",
];

// Feedback modal
const feedbackModalVisible = ref(false);
const feedbackName = ref("");
const feedbackAge = ref("");
const feedbackSchool = ref("");
const feedbackMessage = ref("");

function openFeedbackForm() {
  feedbackModalVisible.value = true;
}

function closeFeedbackModal() {
  feedbackModalVisible.value = false;
  // Reset form
  feedbackName.value = "";
  feedbackAge.value = "";
  feedbackSchool.value = "";
  feedbackMessage.value = "";
}

function submitFeedback() {
  // Here you can send the data to your backend or display a success message
  alert("Cảm ơn bạn đã chia sẻ cảm nhận!");
  closeFeedbackModal();
}

function shareCheckin() {
  // You can open a file upload or link to a form
  alert("Chức năng chia sẻ ảnh sẽ sớm ra mắt!");
}
</script>

<style scoped>
/* Page title larger */
.page-title {
  font-size: 42px !important;
}
@media (max-width: 768px) {
  .page-title {
    font-size: 28px !important;
  }
}

/* Reviews grid */
.genz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin: 20px 0;
}

/* Feedback CTA */
.feedback-cta {
  text-align: center;
  margin: 30px 0 20px;
  padding: 16px;
  background: var(--cream);
  border-radius: var(--radius);
  border: 2px dashed var(--gold);
}
.feedback-cta p {
  font-size: 18px;
  font-weight: 500;
  color: var(--primary-dark);
  margin-bottom: 10px;
}
.feedback-cta .btn-gold {
  background: var(--gold);
  color: var(--primary-dark);
  padding: 10px 32px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}
.feedback-cta .btn-gold:hover {
  background: var(--gold-light);
}

/* Gallery section */
.gallery-section {
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid var(--gold);
}
.gallery-title {
  font-family: var(--font-title);
  font-size: 32px;
  color: var(--primary-dark);
  text-align: center;
  margin-bottom: 24px;
  letter-spacing: 1px;
}
@media (max-width: 768px) {
  .gallery-title {
    font-size: 24px;
  }
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.gallery-item {
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  aspect-ratio: 1/1;
  background: var(--cream);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}
.gallery-item img:hover {
  transform: scale(1.05);
}
.gallery-share {
  text-align: center;
  margin-top: 12px;
  font-size: 16px;
  color: var(--text-light);
}
.gallery-share .btn-gold {
  display: inline-block;
  margin-left: 12px;
  padding: 8px 24px;
  border-radius: 30px;
  background: var(--gold);
  color: var(--primary-dark);
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: var(--transition);
}
.gallery-share .btn-gold:hover {
  background: var(--gold-light);
}

/* Modal overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}
.modal-content {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  transition: var(--transition);
}
.close-btn:hover {
  color: var(--text);
}
.modal-content h2 {
  font-family: var(--font-title);
  color: var(--primary-dark);
  margin-bottom: 16px;
  font-size: 22px;
  letter-spacing: 0.5px;
  padding-right: 40px;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  font-weight: 600;
  color: var(--primary-dark);
  margin-bottom: 4px;
  font-size: 14px;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 2px solid #ddd;
  border-radius: var(--radius);
  font-family: var(--font-body);
  font-size: 14px;
  transition: var(--transition);
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  outline: none;
}
.btn-primary {
  background: var(--primary-dark);
  color: var(--white);
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
  font-size: 14px;
  width: 100%;
}
.btn-primary:hover {
  background: var(--primary);
}

/* Responsive */
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
}
</style>
