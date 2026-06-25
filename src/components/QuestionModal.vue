<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="question-modal">
        <button class="close-btn" @click="close">✕</button>
        <h3>{{ title }}</h3>
        <p class="question-text">{{ question }}</p>
        <div class="options">
          <button
            v-for="(opt, idx) in options"
            :key="idx"
            :class="[
              { correct: answered && idx === correctIndex },
              {
                wrong: answered && selectedIdx === idx && idx !== correctIndex,
              },
            ]"
            @click="selectOption(idx)"
            :disabled="answered"
          >
            {{ String.fromCharCode(65 + idx) }}. {{ opt }}
          </button>
        </div>
        <div v-if="answered" class="feedback" :class="feedbackClass">
          {{ feedbackMessage }}
        </div>
        <div class="modal-actions" v-if="answered">
          <button class="btn-primary" @click="continueGame">➡️ Tiếp tục</button>
          <button class="btn-secondary" @click="learnMore">
            📖 Tìm hiểu thêm
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  title: String,
  question: String,
  options: Array,
  correctIndex: Number,
  explanation: String,
  isFinal: Boolean,
});

const emit = defineEmits(["update:visible", "answer", "close"]);

const selectedIdx = ref(null);
const answered = ref(false);
const feedbackClass = ref("");
const feedbackMessage = ref("");

watch(
  () => props.visible,
  (val) => {
    if (val) {
      selectedIdx.value = null;
      answered.value = false;
      feedbackClass.value = "";
      feedbackMessage.value = "";
    }
  },
);

function selectOption(idx) {
  if (answered.value) return;
  selectedIdx.value = idx;
  answered.value = true;
  const correct = idx === props.correctIndex;
  if (correct) {
    feedbackClass.value = "success";
    feedbackMessage.value = "🎉 Chúc mừng bạn đã trả lời chính xác!";
  } else {
    feedbackClass.value = "error";
    const correctLetter = String.fromCharCode(65 + props.correctIndex);
    feedbackMessage.value = `❌ Oops! Câu trả lời chưa chính xác. Đáp án đúng là: ${correctLetter}. ${props.options[props.correctIndex]}`;
  }
  emit("answer", idx);
}

function continueGame() {
  emit("update:visible", false);
  emit("close");
}

function learnMore() {
  alert("📚 Tìm hiểu thêm: " + props.explanation);
}

function close() {
  emit("update:visible", false);
  emit("close");
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}
.question-modal {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 560px;
  width: 100%;
  position: relative;
}
.close-btn {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
}
.close-btn:hover {
  color: var(--text);
}
.question-text {
  font-size: 15px;
  color: var(--text);
  margin: 8px 0 16px;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 16px 0;
}
.options button {
  padding: 12px 16px;
  background: var(--cream);
  border: 2px solid #ddd;
  border-radius: var(--radius);
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font);
}
.options button:hover:not(:disabled) {
  border-color: var(--olive);
  background: var(--white);
}
.options button.correct {
  border-color: #2e7d32;
  background: #e8f5e9;
}
.options button.wrong {
  border-color: #c62828;
  background: #ffebee;
}
.options button:disabled {
  cursor: not-allowed;
}
.feedback {
  margin: 12px 0;
  padding: 12px 16px;
  border-radius: var(--radius);
  font-weight: 500;
}
.feedback.success {
  background: #e8f5e9;
  color: #2e7d32;
}
.feedback.error {
  background: #ffebee;
  color: #c62828;
}
.modal-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}
.btn-primary {
  background: var(--olive-dark);
  color: var(--white);
  border: none;
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font);
  font-size: 14px;
}
.btn-primary:hover {
  background: var(--olive);
}
.btn-secondary {
  background: var(--cream);
  color: var(--text);
  border: 2px solid #ddd;
  padding: 10px 24px;
  border-radius: var(--radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font);
  font-size: 14px;
}
.btn-secondary:hover {
  border-color: var(--olive);
}
</style>
