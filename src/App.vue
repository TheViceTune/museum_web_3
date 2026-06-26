<template>
  <Header />
  <main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@300;400;500;600;700&display=swap");

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  --primary: #195484;
  --primary-dark: #0e3a5c;
  --primary-light: #2a7ab0;
  --gold: #c9a84c;
  --gold-light: #e8d18c;
  --cream: #f5f0e6;
  --dark: #1e1e1e;
  --text: #2c2c2c;
  --text-light: #6b6b6b;
  --white: #ffffff;
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --radius: 8px;
  --transition: 0.3s ease;
  --font-header-footer: "Barlow", sans-serif;
  --font-title: "Anton", sans-serif;
  --font-body: "Be Vietnam Pro", "BeVietnam", sans-serif;
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: var(--font-body);
  background: var(--cream);
  color: var(--text);
  line-height: 1.6;
}
a {
  text-decoration: none;
  color: inherit;
}
img {
  max-width: 100%;
  display: block;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
.page {
  padding: 40px 0 20px;
  min-height: 60vh;
}
.page-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 8px;
  font-family: var(--font-title);
  letter-spacing: 1px;
}
.page-subtitle {
  color: var(--text-light);
  font-size: 16px;
  margin-bottom: 30px;
  font-family: var(--font-body);
}
.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-dark);
  color: var(--primary-dark);
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
  font-size: 14px;
  display: inline-block;
}
.btn-outline:hover {
  background: var(--primary-dark);
  color: var(--white);
}
.btn-gold {
  background: var(--gold);
  color: var(--primary-dark);
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
  font-size: 14px;
  display: inline-block;
}
.btn-gold:hover {
  background: var(--gold-light);
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
}
.slide-in {
  opacity: 0;
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.slide-in[data-slide-direction="bottom"] {
  transform: translateY(50px);
}
.slide-in[data-slide-direction="left"] {
  transform: translateX(-50px);
}
.slide-in[data-slide-direction="right"] {
  transform: translateX(50px);
}
.slide-in[data-slide-direction="top"] {
  transform: translateY(-50px);
}
.slide-in.visible {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
