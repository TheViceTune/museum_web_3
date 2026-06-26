<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <button class="close-btn" @click="close">✕</button>
        <h2>{{ title }}</h2>
        <div class="story-body" v-html="content"></div>
        <div class="modal-footer">
          <button class="btn-primary" @click="close">Đóng</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: Boolean,
  title: String,
  content: String,
});
const emit = defineEmits(["update:visible", "close"]);

function close() {
  emit("update:visible", false);
  emit("close");
}
</script>

<style scoped>
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
  max-width: 720px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
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
  font-size: 24px;
  letter-spacing: 0.5px;
  padding-right: 40px;
}
.story-body {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.8;
  color: var(--text);
}
.story-body p {
  margin-bottom: 12px;
}
.modal-footer {
  margin-top: 20px;
  text-align: right;
}
.btn-primary {
  background: var(--primary-dark);
  color: var(--white);
  border: none;
  padding: 10px 28px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
  font-size: 14px;
}
.btn-primary:hover {
  background: var(--primary);
}
</style>
