<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-inner">
        <div class="footer-col">
          <h4>Bảo tàng Phòng không - Không quân</h4>
          <p>
            Lưu giữ và tôn vinh những chiến công oanh liệt của lực lượng Phòng
            không - Không quân Việt Nam.
          </p>
        </div>
        <div class="footer-col">
          <h4>Điều hướng</h4>
          <ul>
            <li><router-link to="/">Trang chủ</router-link></li>
            <li><router-link to="/kham-pha">Khám phá</router-link></li>
            <li><router-link to="/trai-nghiem">Trải nghiệm</router-link></li>
            <li><router-link to="/tham-quan">Tham quan</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Thông tin</h4>
          <ul>
            <li>173C Trường Chinh, Hà Nội</li>
            <li>02435 632 686</li>
            <li>btpkkq171@gmail.com</li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Dự án học tập</h4>
          <p style="font-size: 13px">
            Sản phẩm được thực hiện trong khuôn khổ môn học, không nhằm mục đích
            thương mại.
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        © 2026 Bảo tàng Phòng không - Không quân · Mọi quyền được bảo lưu
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--primary-dark);
  color: var(--cream);
  padding: 40px 0 20px;
  margin-top: 60px;
  font-family: var(--font-header-footer);
}
.footer-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}
.footer-col h4 {
  color: var(--gold);
  margin-bottom: 12px;
  font-size: 16px;
}
.footer-col p,
.footer-col li {
  font-size: 14px;
  opacity: 0.9;
  line-height: 1.8;
}
.footer-col ul {
  list-style: none;
}
.footer-col ul li::before {
  content: "› ";
  color: var(--gold);
}
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 30px;
  padding-top: 20px;
  text-align: center;
  font-size: 13px;
  opacity: 0.7;
}
</style>
