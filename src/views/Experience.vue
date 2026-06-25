<template>
  <div class="container page">
    <h1 class="page-title">Trải nghiệm</h1>
    <p class="page-subtitle">Góc nhìn GenZ · Truy tìm mảnh ghép</p>

    <h3 style="color: var(--olive-dark); margin: 20px 0 12px">
      ▸ Các bạn trẻ nghĩ gì về Bảo tàng?
    </h3>
    <div class="genz-grid">
      <GenZCard
        v-for="(item, idx) in genzList"
        :key="idx"
        :name="item.name"
        :age="item.age"
        :school="item.school"
        :quote="item.quote"
      />
    </div>

    <PuzzleGame />
  </div>
</template>

<script setup>
import GenZCard from "@/components/GenZCard.vue";
import PuzzleGame from "@/components/PuzzleGame.vue";

const genzList = [
  {
    name: "Nguyễn Khánh Linh",
    age: 21,
    school: "ĐH Ngoại Thương",
    quote:
      "“Đây là lần đầu tiên mình đi Bảo tàng, và ấn tượng lớn nhất đó chính là những khẩu pháo và phi cơ to khổng lồ, nhiều câu chuyện lịch sử về Phòng không - Không quân cũng khiến mình biết ơn hơn về những công ơn của những thế hệ đi trước.”",
  },
  {
    name: "Nguyễn Minh Nga",
    age: 20,
    school: "ĐH Kinh tế Quốc dân",
    quote:
      "“Ngày mình tham quan bảo tàng cũng là một ngày nắng đẹp, do đó mình vô cùng háo hức. Mình thấy việc bảo tàng dành nguyên tầng 2 cho trận Điện Biên Phủ trên không vô cùng ý nghĩa.”",
  },
  {
    name: "Nguyễn Văn A",
    age: 22,
    school: "ĐH Bách Khoa",
    quote:
      "“Cảm giác bảo tàng làm khá tốt ở phần không gian, không bị ngột ngạt như mình từng nghĩ về bảo tàng quân sự.”",
  },
  {
    name: "Trần Thị B",
    age: 19,
    school: "Sinh viên",
    quote:
      "“Không nghĩ một bảo tàng quân sự ở Hà Nội lại cuốn vậy luôn. Đi xong cảm giác vừa chill vừa học được nhiều thứ.”",
  },
];
</script>

<style scoped>
.genz-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin: 20px 0;
}
</style>
