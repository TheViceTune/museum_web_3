<template>
  <div class="container page">
    <h1 class="page-title">Tham quan</h1>
    <p class="page-subtitle">Giờ mở cửa · Vé vào cổng · Địa chỉ &amp; lưu ý</p>

    <div class="visit-grid">
      <div class="visit-card">
        <h3>🕐 Giờ mở cửa</h3>
        <ul>
          <li>
            <strong>Thứ 2 – Thứ 5, Thứ 7, Chủ Nhật</strong><br />08:00 – 11:00
            &amp; 13:00 – 16:00
          </li>
          <li>
            <strong>Thứ 7, Chủ nhật</strong><br />Phục vụ khách lẻ tham quan
            ngoài trời từ 16:00 – 18:30
          </li>
          <li style="color: #c62828; font-weight: 600">Thứ 6: ĐÓNG CỬA</li>
        </ul>
      </div>

      <div class="visit-card">
        <h3>🎫 Vé vào cổng</h3>
        <ul>
          <li>
            <span class="highlight">Người lớn (khách Việt Nam):</span> 10.000 –
            15.000 VND
          </li>
          <li>
            <span class="highlight">Người lớn (khách nước ngoài):</span> 30.000
            VND
          </li>
          <li>
            <span class="highlight">Trẻ em trên 6 tuổi:</span> 5.000 – 10.000
            VND
          </li>
          <li><span class="highlight">Trẻ em dưới 6 tuổi:</span> Miễn phí</li>
        </ul>
      </div>

      <div class="visit-card">
        <h3>📍 Địa chỉ &amp; Liên hệ</h3>
        <ul>
          <li>
            <strong>Địa chỉ:</strong> Số 173C đường Trường Chinh, Phường Khương
            Mai, TP. Hà Nội
          </li>
          <li><strong>Điện thoại:</strong> 02435 632 686</li>
          <li>
            <strong>Phương tiện:</strong> Xe máy, ô tô (có chỗ để xe), xe buýt
            (tuyến 16, 19, 24), taxi/xe công nghệ
          </li>
        </ul>
      </div>

      <div class="visit-card">
        <h3>📋 Lưu ý</h3>
        <ul>
          <li>✓ Giữ trật tự, không nói tục, gây ồn</li>
          <li>✓ Không leo trèo, chạm, khắc vẽ lên hiện vật</li>
          <li>
            ✓ Tránh đi ngày mưa để tham quan trọn vẹn không gian ngoài trời
          </li>
          <li>✓ Mang theo mũ, ô và nước uống</li>
          <li>✓ Ăn mặc lịch sự, trang nhã</li>
          <li>✓ Cấm mang chất cháy nổ, vật sắc nhọn</li>
          <li>✓ Bỏ rác đúng nơi quy định</li>
        </ul>
      </div>
    </div>

    <div class="contact-card">
      <h3>📬 Thông tin liên hệ</h3>
      <div class="contact-grid">
        <div>
          <strong>Điện thoại quân sự:</strong> 069.562.323 · 069.562.322
        </div>
        <div><strong>Email:</strong> btpkkq171@gmail.com</div>
        <div><strong>Follow:</strong> [ Facebook · YouTube · Zalo ]</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.visit-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
  margin: 20px 0;
}
.visit-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}
.visit-card h3 {
  color: var(--olive-dark);
  margin-bottom: 8px;
  font-size: 18px;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 8px;
}
.visit-card ul {
  list-style: none;
  margin-top: 8px;
}
.visit-card ul li {
  padding: 4px 0;
  font-size: 14px;
  border-bottom: 1px solid #f0f0f0;
}
.visit-card ul li:last-child {
  border-bottom: none;
}
.visit-card .highlight {
  color: var(--olive-dark);
  font-weight: 600;
}
.contact-card {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  margin-top: 20px;
}
.contact-card h3 {
  color: var(--olive-dark);
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 8px;
}
</style>
