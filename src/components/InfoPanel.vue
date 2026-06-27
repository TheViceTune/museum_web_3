<template>
  <div class="info-panel">
    <div class="panel-header">
      <h3>{{ exhibit.title }}</h3>
      <div class="meta">{{ exhibit.subtitle }}</div>
    </div>

    <!-- Quote block (always visible) -->
    <div class="quote-block">{{ exhibit.quote }}</div>

    <!-- Dynamic sections parsed from detail HTML -->
    <div v-for="(section, index) in sections" :key="index" class="section">
      <div class="section-header" @click="toggleSection(index)">
        <h4>{{ section.title }}</h4>
        <span class="toggle-btn">{{ sectionOpen[index] ? "−" : "+" }}</span>
      </div>
      <transition name="collapse">
        <div
          v-if="sectionOpen[index]"
          class="section-content"
          v-html="section.content"
        ></div>
      </transition>
    </div>

    <!-- Source note (always visible) -->
    <p class="source">📖 Nguồn: TTXVN · Báo Vĩnh Long</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["exhibit"]);

// Parse the detail HTML into sections based on <h4> tags
const sections = computed(() => {
  const detail = props.exhibit.detail || "";
  const div = document.createElement("div");
  div.innerHTML = detail;
  const children = div.childNodes;
  const result = [];
  let currentTitle = "";
  let currentContent = [];

  const pushSection = () => {
    if (currentTitle && currentContent.length) {
      result.push({
        title: currentTitle,
        content: currentContent.join(""),
      });
    }
    currentTitle = "";
    currentContent = [];
  };

  children.forEach((node) => {
    if (node.nodeType === 1 && node.tagName === "H4") {
      pushSection();
      currentTitle = node.textContent.trim();
    } else if (node.nodeType === 1) {
      currentContent.push(node.outerHTML);
    } else if (node.nodeType === 3) {
      const text = node.textContent.trim();
      if (text) {
        currentContent.push(`<p>${text}</p>`);
      }
    }
  });
  pushSection();

  if (result.length === 0) {
    result.push({
      title: "Thông tin chi tiết",
      content: detail,
    });
  }
  return result;
});

// 🔽 All sections are initially collapsed
const sectionOpen = ref(sections.value.map(() => false));

function toggleSection(index) {
  sectionOpen.value[index] = !sectionOpen.value[index];
}
</script>

<style scoped>
.info-panel {
  background: var(--white);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
  max-height: 600px;
  overflow-y: auto;
}
.panel-header {
  margin-bottom: 8px;
}
.panel-header h3 {
  color: var(--primary-dark);
  font-size: 20px;
  margin: 0;
  font-family: var(--font-title);
  letter-spacing: 0.5px;
}
.meta {
  font-size: 13px;
  color: var(--text-light);
  margin-top: 2px;
}
.quote-block {
  background: var(--cream);
  padding: 12px 16px;
  border-left: 4px solid var(--gold);
  font-style: italic;
  margin: 12px 0 16px;
  border-radius: 0 var(--radius) var(--radius) 0;
  font-size: 16px;
  color: var(--primary-dark);
}
.section {
  margin-bottom: 12px;
}
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  padding: 6px 0;
  border-bottom: 1px solid var(--cream);
}
.section-header h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--primary-dark);
}
.toggle-btn {
  font-size: 24px;
  color: var(--primary-dark);
  font-weight: 300;
  line-height: 1;
}
.section-content {
  padding-top: 8px;
  font-size: 14px;
  line-height: 1.8;
  color: var(--text);
}
.section-content p {
  margin-bottom: 10px;
}
.section-content h4 {
  display: none;
}
.source {
  margin-top: 16px;
  font-size: 13px;
  color: var(--text-light);
  border-top: 1px solid var(--cream);
  padding-top: 12px;
}

/* collapse transition */
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
  max-height: 0;
}
.collapse-enter-to,
.collapse-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>
