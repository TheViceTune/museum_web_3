<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click.self="close">
      <div class="modal-container">
        <!-- Sidebar -->
        <div class="sidebar">
          <div class="sidebar-header">
            <span class="board-title">Bức tranh #{{ board }}</span>
          </div>
          <div
            class="sidebar-item"
            v-for="(q, idx) in questions"
            :key="idx"
            :class="{
              active: currentIndex === idx,
              answered: answered[idx],
              current: currentIndex === idx,
            }"
            @click="navigateTo(idx)"
          >
            <span class="question-number">Câu {{ idx + 1 }}</span>
            <span class="status-icon" v-if="answered[idx]">✅</span>
            <span class="status-icon" v-else>⏳</span>
          </div>
          <div class="sidebar-footer" v-if="allAnswered">
            <span class="complete-badge">✅ Hoàn thành</span>
          </div>
        </div>

        <!-- Main content -->
        <div class="main-content">
          <div class="question-area">
            <h3 class="question-title">Câu {{ currentIndex + 1 }}</h3>
            <p class="question-text">{{ currentQuestion.q }}</p>

            <div class="options" v-if="!reviewMode || !answered[currentIndex]">
              <button
                v-for="(opt, idx) in currentQuestion.options"
                :key="idx"
                :class="[
                  {
                    correct:
                      answered[currentIndex] && idx === currentQuestion.correct,
                  },
                  {
                    wrong:
                      answered[currentIndex] &&
                      selectedIdx === idx &&
                      idx !== currentQuestion.correct,
                  },
                ]"
                @click="selectOption(idx)"
                :disabled="answered[currentIndex] || reviewMode"
              >
                {{ String.fromCharCode(65 + idx) }}. {{ opt }}
              </button>
            </div>

            <!-- Feedback -->
            <div
              v-if="answered[currentIndex]"
              class="feedback"
              :class="feedbackClass"
            >
              {{ feedbackMessage }}
            </div>

            <!-- Actions -->
            <div class="actions" v-if="answered[currentIndex]">
              <button
                v-if="currentQuestion.link"
                class="btn-secondary"
                @click="openLearnMore"
              >
                📖 Tìm hiểu thêm
              </button>
              <button class="btn-primary" @click="continueGame">
                {{ allAnswered ? "🎉 Xem ảnh" : "➡️ Tiếp tục" }}
              </button>
            </div>

            <!-- Review mode - show correct answers -->
            <div
              v-if="reviewMode && answered[currentIndex]"
              class="review-answer"
            >
              <p>
                <strong>Đáp án đúng:</strong>
                {{ currentQuestion.options[currentQuestion.correct] }}
              </p>
              <p class="explanation">{{ currentQuestion.explain }}</p>
            </div>
          </div>
        </div>

        <!-- Close button -->
        <button class="close-btn" @click="close">✕</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  visible: Boolean,
  board: Number,
  questions: Array, // array of question objects with q, options, correct, explain, link
  currentIndex: Number,
  answered: Array, // array of booleans
  reviewMode: Boolean, // if true, disable selection and show answers
});

const emit = defineEmits([
  "update:visible",
  "update:currentIndex",
  "answer",
  "continue",
  "close",
  "complete",
]);

const selectedIdx = ref(null);
const feedbackClass = ref("");
const feedbackMessage = ref("");

const currentQuestion = computed(() => {
  return (
    props.questions[props.currentIndex] || {
      q: "",
      options: [],
      correct: 0,
      explain: "",
      link: "",
    }
  );
});

const allAnswered = computed(() => {
  return props.answered.every(Boolean);
});

watch(
  () => props.visible,
  (val) => {
    if (val) {
      selectedIdx.value = null;
      feedbackClass.value = "";
      feedbackMessage.value = "";
    }
  },
);

function selectOption(idx) {
  if (props.answered[props.currentIndex] || props.reviewMode) return;
  selectedIdx.value = idx;
  const correct = idx === currentQuestion.value.correct;
  if (correct) {
    feedbackClass.value = "success";
    feedbackMessage.value = "🎉 Chính xác!";
  } else {
    feedbackClass.value = "error";
    const correctLetter = String.fromCharCode(
      65 + currentQuestion.value.correct,
    );
    feedbackMessage.value = `❌ Chưa chính xác! Đáp án đúng là: ${correctLetter}. ${currentQuestion.value.options[currentQuestion.value.correct]}`;
  }
  // Emit answer event
  emit("answer", props.currentIndex, idx);
  // Mark answered
  const newAnswered = [...props.answered];
  newAnswered[props.currentIndex] = true;
  // We'll let parent handle the update via event
  // Actually we need to update parent state, so we emit an event to update answered.
  // We'll emit a custom event to update answered array.
  emit("update:answered", newAnswered);
}

function continueGame() {
  if (allAnswered.value) {
    // All questions answered, close modal and reveal photo
    emit("complete");
    emit("update:visible", false);
    emit("close");
    return;
  }
  // Find next unanswered
  const nextIdx = props.answered.findIndex(
    (a, i) => i > props.currentIndex && !a,
  );
  if (nextIdx !== -1) {
    emit("update:currentIndex", nextIdx);
  } else {
    // If no next unanswered (should not happen if allAnswered false), find first unanswered
    const firstUnanswered = props.answered.findIndex((a) => !a);
    if (firstUnanswered !== -1) {
      emit("update:currentIndex", firstUnanswered);
    }
  }
  // Reset selection state for new question
  selectedIdx.value = null;
  feedbackClass.value = "";
  feedbackMessage.value = "";
}

function navigateTo(idx) {
  if (idx === props.currentIndex) return;
  emit("update:currentIndex", idx);
  selectedIdx.value = null;
  feedbackClass.value = "";
  feedbackMessage.value = "";
}

function openLearnMore() {
  const link = currentQuestion.value.link;
  if (link) {
    if (link.startsWith("#")) {
      window.location.hash = link.slice(1);
    } else {
      window.open(link, "_blank");
    }
  }
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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(4px);
}
.modal-container {
  display: flex;
  background: var(--white);
  border-radius: var(--radius);
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
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
  z-index: 10;
  transition: var(--transition);
}
.close-btn:hover {
  color: var(--text);
}
.sidebar {
  width: 160px;
  background: var(--cream);
  padding: 20px 12px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #ddd;
}
.sidebar-header {
  font-weight: 600;
  color: var(--primary-dark);
  font-size: 14px;
  margin-bottom: 16px;
  text-align: center;
  font-family: var(--font-title);
  letter-spacing: 0.5px;
}
.sidebar-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: var(--transition);
  margin-bottom: 4px;
  font-size: 14px;
}
.sidebar-item:hover {
  background: rgba(0, 0, 0, 0.05);
}
.sidebar-item.active {
  background: var(--gold);
  color: var(--primary-dark);
  font-weight: 600;
}
.sidebar-item.answered {
  opacity: 0.8;
}
.sidebar-item.answered .question-number::after {
  content: " ✅";
}
.sidebar-item .status-icon {
  font-size: 16px;
}
.sidebar-footer {
  margin-top: auto;
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid #ddd;
}
.complete-badge {
  background: var(--primary-dark);
  color: var(--white);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}
.main-content {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.question-area {
  flex: 1;
}
.question-title {
  font-family: var(--font-title);
  color: var(--primary-dark);
  font-size: 20px;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}
.question-text {
  font-size: 16px;
  color: var(--text);
  margin-bottom: 20px;
  line-height: 1.6;
}
.options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}
.options button {
  padding: 10px 16px;
  background: var(--cream);
  border: 2px solid #ddd;
  border-radius: var(--radius);
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  transition: var(--transition);
  font-family: var(--font-body);
}
.options button:hover:not(:disabled) {
  border-color: var(--primary);
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
  padding: 12px 16px;
  border-radius: var(--radius);
  margin: 8px 0 16px;
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
.actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
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
}
.btn-primary:hover {
  background: var(--primary);
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
  font-family: var(--font-body);
  font-size: 14px;
}
.btn-secondary:hover {
  border-color: var(--primary);
}
.review-answer {
  margin-top: 12px;
  padding: 12px 16px;
  background: var(--cream);
  border-radius: var(--radius);
  border-left: 4px solid var(--gold);
}
.review-answer p {
  margin: 4px 0;
}
.explanation {
  font-size: 14px;
  color: var(--text-light);
  font-style: italic;
}

@media (max-width: 768px) {
  .modal-container {
    flex-direction: column;
    max-height: 95vh;
  }
  .sidebar {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 12px 16px;
    border-right: none;
    border-bottom: 1px solid #ddd;
    gap: 4px;
  }
  .sidebar-header {
    width: 100%;
    margin-bottom: 8px;
    font-size: 13px;
  }
  .sidebar-item {
    flex: 1 0 auto;
    padding: 6px 12px;
    font-size: 13px;
    min-width: 60px;
    justify-content: center;
  }
  .sidebar-item .status-icon {
    display: none;
  }
  .sidebar-footer {
    display: none;
  }
  .main-content {
    padding: 20px;
  }
}
</style>
