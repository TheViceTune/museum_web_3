<template>
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<style>
/* ===== GLOBAL RESET & STYLES ===== */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
:root {
  --olive: #3d4f2b;
  --olive-light: #5a7342;
  --olive-dark: #2a3a1e;
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
  --font: "Segoe UI", system-ui, -apple-system, sans-serif;
}
html {
  scroll-behavior: smooth;
}
body {
  font-family: var(--font);
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
  color: var(--olive-dark);
  margin-bottom: 8px;
}
.page-subtitle {
  color: var(--text-light);
  font-size: 16px;
  margin-bottom: 30px;
}
.btn-outline {
  background: transparent;
  border: 2px solid var(--olive-dark);
  color: var(--olive-dark);
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font);
  font-size: 14px;
  display: inline-block;
}
.btn-outline:hover {
  background: var(--olive-dark);
  color: var(--white);
}
.btn-gold {
  background: var(--gold);
  color: var(--olive-dark);
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font);
  font-size: 14px;
  display: inline-block;
}
.btn-gold:hover {
  background: var(--gold-light);
}
@media (max-width: 768px) {
  .page-title {
    font-size: 24px;
  }
}
</style>
