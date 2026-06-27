<template>
  <div class="game-container">
    <p class="game-intro">
      Trò chơi “Truy tìm mảnh ghép” bao gồm 4 bức tranh bí mật. Mỗi bức tranh
      được che bởi 4 mảnh ghép. Bạn cần lần lượt lật mở các mảnh ghép bằng cách
      trả lời các câu hỏi để khám phá toàn bộ bức tranh. Hãy cố gắng để lật mở
      được toàn bộ 4 bức tranh nhé!
    </p>

    <!-- 2x2 Grid of boards -->
    <div class="boards-grid">
      <div
        v-for="board in 4"
        :key="board"
        class="board-card"
        :class="{ revealed: boardState[board].revealed.every(Boolean) }"
        @click="onBoardClick(board)"
      >
        <div
          class="board-image"
          :style="{ backgroundImage: `url(${boardImages[board]})` }"
        >
          <!-- Overlay for not fully revealed -->
          <div
            class="board-overlay"
            v-if="!boardState[board].revealed.every(Boolean)"
          >
            <span class="lock-icon">🔒</span>
          </div>
          <!-- Overlay for fully revealed but not final answered -->
          <div
            class="board-overlay"
            v-else-if="!boardState[board].finalAnswered"
          >
            <span class="check-icon">✅</span>
            <span class="overlay-text">Chờ câu hỏi cuối</span>
          </div>
          <!-- Overlay for fully completed -->
          <div class="board-overlay" v-else>
            <span class="check-icon">✅</span>
            <span class="overlay-text">Hoàn thành</span>
            <button class="review-btn" @click.stop="openReview(board)">
              📖 Xem lại
            </button>
          </div>
          <div class="board-label">Bức tranh #{{ board }}</div>
          <div class="board-progress">
            {{ boardState[board].revealed.filter(Boolean).length }}/4
          </div>
        </div>
      </div>
    </div>

    <!-- Large final image -->
    <div class="final-image-container" @click="onFinalClick">
      <div
        class="final-image"
        :style="{ backgroundImage: `url(${finalImage})` }"
      >
        <div class="final-overlay" v-if="!allBoardsCompleted">
          <span class="lock-icon">🔒</span>
          <span class="final-label">Mở khóa khi hoàn thành 4 bức tranh</span>
        </div>
        <div class="final-overlay" v-else>
          <span class="final-label"
            >🎉 Bấm để khám phá bức tranh cuối cùng</span
          >
        </div>
      </div>
    </div>

    <!-- Puzzle Question Modal -->
    <PuzzleQuestionModal
      v-model:visible="puzzleModalVisible"
      :board="activeBoard"
      :questions="activeQuestions"
      v-model:current-index="activeIndex"
      :answered="activeAnswered"
      :review-mode="reviewMode"
      @answer="onQuestionAnswer"
      @continue="onQuestionContinue"
      @complete="onAllQuestionsAnswered"
      @update:answered="updateAnswered"
      @close="closePuzzleModal"
    />

    <!-- Final Question Modal (existing) -->
    <QuestionModal
      v-model:visible="finalModalVisible"
      :title="finalTitle"
      :question="finalQuestion"
      :options="finalOptions"
      :correct-index="finalCorrectIndex"
      :explanation="finalExplanation"
      :is-final="true"
      :learn-more-link="finalLearnMoreLink"
      @answer="onFinalAnswer"
      @close="closeFinalModal"
      @continue="onFinalContinue"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, onMounted } from "vue";
import { puzzleQuestions, finalQuestions } from "@/data/questionData";
import QuestionModal from "./QuestionModal.vue";
import PuzzleQuestionModal from "./PuzzleQuestionModal.vue";

// ------ State ------
const STORAGE_KEY = "puzzle_progress";

const defaultState = {
  1: { revealed: [false, false, false, false], finalAnswered: false },
  2: { revealed: [false, false, false, false], finalAnswered: false },
  3: { revealed: [false, false, false, false], finalAnswered: false },
  4: { revealed: [false, false, false, false], finalAnswered: false },
};

const loadState = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      for (const board of [1, 2, 3, 4]) {
        if (!parsed[board])
          parsed[board] = {
            revealed: [false, false, false, false],
            finalAnswered: false,
          };
        if (!parsed[board].revealed || parsed[board].revealed.length !== 4) {
          parsed[board].revealed = [false, false, false, false];
        }
      }
      return parsed;
    } catch (e) {
      return defaultState;
    }
  }
  return defaultState;
};

const boardState = reactive(loadState());

watch(
  boardState,
  (newState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  },
  { deep: true },
);

// ------ Computed ------
const allBoardsCompleted = computed(() => {
  for (const board of [1, 2, 3, 4]) {
    if (!boardState[board].finalAnswered) return false;
  }
  return true;
});

// Placeholder images (replace with real images later)
const boardImages = {
  1: "https://via.placeholder.com/300x300/195484/ffffff?text=Tranh+1",
  2: "https://via.placeholder.com/300x300/195484/ffffff?text=Tranh+2",
  3: "https://via.placeholder.com/300x300/195484/ffffff?text=Tranh+3",
  4: "https://via.placeholder.com/300x300/195484/ffffff?text=Tranh+4",
};
const finalImage =
  "https://via.placeholder.com/600x400/195484/ffffff?text=Final+Image";

// ------ Puzzle Modal State ------
const puzzleModalVisible = ref(false);
const activeBoard = ref(1);
const activeIndex = ref(0);
const activeAnswered = ref([]); // array of booleans for this board
const reviewMode = ref(false);
const activeQuestions = ref([]);

// ------ Final Modal State ------
const finalModalVisible = ref(false);
const finalTitle = ref("");
const finalQuestion = ref("");
const finalOptions = ref([]);
const finalCorrectIndex = ref(0);
const finalExplanation = ref("");
const finalLearnMoreLink = ref("");
let finalBoard = null;

// ------ Methods for Puzzle Modal ------
function openPuzzleModal(board, review = false) {
  const questions = [];
  for (let i = 0; i < 4; i++) {
    const key = `${board}-${i}`;
    const q = puzzleQuestions[key];
    if (q) {
      questions.push({
        q: q.q,
        options: q.options,
        correct: q.correct,
        explain: q.explain,
        link: q.link || "",
      });
    }
  }
  activeQuestions.value = questions;
  activeBoard.value = board;
  activeAnswered.value = [...boardState[board].revealed];
  reviewMode.value = review;
  // Set current index to first unanswered, or last if all answered
  const firstUnanswered = activeAnswered.value.findIndex((a) => !a);
  activeIndex.value = firstUnanswered !== -1 ? firstUnanswered : 0;
  puzzleModalVisible.value = true;
}

function closePuzzleModal() {
  puzzleModalVisible.value = false;
}

function updateAnswered(newAnswered) {
  activeAnswered.value = newAnswered;
  // Also update boardState
  boardState[activeBoard.value].revealed = [...newAnswered];
}

function onQuestionAnswer(idx, selected) {
  // Already handled in modal, but we might want to do something else
}

function onQuestionContinue() {
  // Modal handles navigation
}

function onAllQuestionsAnswered() {
  // All questions for this board are answered, photo is revealed
  // Now trigger final question
  puzzleModalVisible.value = false;
  // Wait a moment then open final
  setTimeout(() => {
    openFinalQuestion(activeBoard.value);
  }, 300);
}

function openReview(board) {
  if (boardState[board].finalAnswered) {
    openPuzzleModal(board, true);
  }
}

// ------ Methods for Final Modal ------
function openFinalQuestion(board) {
  const q = finalQuestions[board];
  if (!q) return;
  finalBoard = board;
  finalTitle.value = `🎯 Câu hỏi cuối cùng - Bức tranh #${board}`;
  finalQuestion.value = q.q;
  finalOptions.value = q.options;
  finalCorrectIndex.value = q.correct;
  finalExplanation.value = q.explain;
  finalLearnMoreLink.value = q.link || "";
  finalModalVisible.value = true;
}

function closeFinalModal() {
  finalModalVisible.value = false;
}

function onFinalAnswer(selected) {
  // Record answer if needed
}

function onFinalContinue() {
  if (finalBoard !== null) {
    boardState[finalBoard].finalAnswered = true;
    finalBoard = null;
  }
  finalModalVisible.value = false;
  // If all boards completed, we might show a message
  if (allBoardsCompleted.value) {
    // Optionally show a completion message
  }
}

// ------ Board click handler ------
function onBoardClick(board) {
  // If board is fully revealed and final answered -> open review
  if (
    boardState[board].revealed.every(Boolean) &&
    boardState[board].finalAnswered
  ) {
    openReview(board);
    return;
  }
  // If board is fully revealed but final not answered -> open final question
  if (
    boardState[board].revealed.every(Boolean) &&
    !boardState[board].finalAnswered
  ) {
    openFinalQuestion(board);
    return;
  }
  // Otherwise open puzzle modal to answer questions
  openPuzzleModal(board, false);
}

// ------ Final big image click ------
function onFinalClick() {
  if (!allBoardsCompleted.value) {
    alert(
      "Bạn cần hoàn thành tất cả 4 bức tranh trước khi mở khóa bức tranh cuối cùng!",
    );
    return;
  }
  alert(
    "🎉 Chúc mừng bạn đã hoàn thành toàn bộ thử thách! Bức tranh cuối cùng sẽ được hiển thị ở đây.",
  );
}

onMounted(() => {
  // Load state from localStorage already done
});
</script>

<style scoped>
/* Same as before, with minor additions for review button */
.game-container {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: var(--shadow);
  margin: 20px 0;
}
.game-intro {
  font-size: 15px;
  color: var(--text-light);
  line-height: 1.8;
  margin-bottom: 24px;
  text-align: center;
}
.boards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}
.board-card {
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}
.board-card:hover:not(.revealed) {
  transform: scale(1.02);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
.board-card.revealed {
  cursor: default;
  opacity: 0.9;
}
.board-card.revealed:hover {
  transform: none;
}
.board-image {
  width: 100%;
  aspect-ratio: 1/1;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.board-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
  backdrop-filter: blur(4px);
  transition: var(--transition);
}
.board-card.revealed .board-overlay {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(0);
}
.lock-icon,
.check-icon {
  font-size: 36px;
  margin-bottom: 4px;
}
.overlay-text {
  font-size: 14px;
  font-weight: 500;
}
.review-btn {
  margin-top: 6px;
  padding: 4px 12px;
  background: var(--gold);
  color: var(--primary-dark);
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}
.review-btn:hover {
  background: var(--gold-light);
}
.board-label {
  font-family: var(--font-title);
  font-size: 18px;
  letter-spacing: 0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
.board-progress {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 4px;
}
.final-image-container {
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.final-image-container:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
.final-image {
  width: 100%;
  aspect-ratio: 16/9;
  background-size: cover;
  background-position: center;
  position: relative;
}
.final-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--white);
  backdrop-filter: blur(6px);
  transition: var(--transition);
}
.final-overlay .lock-icon {
  font-size: 48px;
  margin-bottom: 8px;
}
.final-label {
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  padding: 0 20px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}
@media (max-width: 600px) {
  .boards-grid {
    gap: 12px;
  }
  .board-label {
    font-size: 14px;
  }
  .lock-icon,
  .check-icon {
    font-size: 28px;
  }
  .final-label {
    font-size: 14px;
  }
}
</style>
