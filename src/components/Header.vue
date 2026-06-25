<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="logo-area">
        <div class="logo-placeholder">P</div>
        <div class="logo-text">
          Bảo tàng Phòng không - Không quân
          <small>Air Defense - Air Force Museum</small>
        </div>
      </div>
      <nav class="main-nav">
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/kham-pha">Khám phá</router-link>
        <router-link to="/trai-nghiem">Trải nghiệm</router-link>
        <router-link to="/tham-quan">Tham quan</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  background: var(--olive-dark);
  color: var(--white);
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}
.logo-area {
  display: flex;
  align-items: center;
  gap: 12px;
}
.logo-placeholder {
  width: 48px;
  height: 48px;
  background: var(--gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 20px;
  color: var(--olive-dark);
  flex-shrink: 0;
}
.logo-text {
  font-weight: 700;
  font-size: 18px;
  line-height: 1.2;
}
.logo-text small {
  display: block;
  font-weight: 400;
  font-size: 12px;
  opacity: 0.8;
}
.main-nav {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.main-nav a {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: var(--transition);
  border: 1px solid transparent;
}
.main-nav a:hover,
.main-nav a.router-link-active {
  background: var(--gold);
  color: var(--olive-dark);
  border-color: var(--gold);
}
@media (max-width: 768px) {
  .header-inner {
    flex-direction: column;
    align-items: stretch;
  }
  .main-nav {
    justify-content: center;
  }
  .main-nav a {
    font-size: 13px;
    padding: 6px 12px;
  }
}
@media (max-width: 480px) {
  .main-nav a {
    font-size: 12px;
    padding: 4px 10px;
  }
  .logo-text {
    font-size: 15px;
  }
}
</style>
