<template>
  <div class="game-container">
    <div class="game-progress">
      <span class="badge gold">🏆 Bức tranh #{{ currentBoard }}</span>
      <span class="badge">Mở: {{ revealedCount }} / 4</span>
      <span class="badge">{{
        allRevealed ? "✅ Hoàn thành" : "⏳ Đang mở"
      }}</span>
    </div>

    <div class="game-grid">
      <div v-for="board in 4" :key="board" class="puzzle-board">
        <h4>🖼️ Tranh #{{ board }}</h4>
        <div class="puzzle-pieces">
          <div
            v-for="piece in 4"
            :key="piece"
            class="puzzle-piece"
            :class="{
              revealed: boardState[board].revealed[piece - 1],
              locked: !boardState[board].revealed[piece - 1],
            }"
            @click="onPieceClick(board, piece - 1)"
          >
            <template v-if="boardState[board].revealed[piece - 1]">
              ✅<br /><span class="piece-label">Đã mở</span>
            </template>
            <template v-else>
              ❓<br /><span class="piece-label">Câu {{ piece }}</span>
            </template>
          </div>
        </div>
        <div
          style="
            margin-top: 8px;
            text-align: center;
            font-size: 13px;
            color: var(--text-light);
          "
        >
          Bấm vào mảnh ghép để trả lời câu hỏi
        </div>
      </div>
    </div>

    <!-- Final questions -->
    <div class="final-section">
      <p style="font-weight: 600; color: var(--olive-dark)">
        🎯 Câu hỏi cuối cùng
      </p>
      <p style="font-size: 14px; color: var(--text-light)">
        Sau khi mở đủ 4 mảnh ghép, hãy trả lời câu hỏi về bức tranh vừa khám
        phá.
      </p>
      <div class="final-buttons">
        <button
          v-for="board in 4"
          :key="board"
          class="btn-outline"
          :disabled="
            !boardState[board].revealed.every(Boolean) ||
            boardState[board].finalAnswered
          "
          @click="onFinalClick(board)"
        >
          Tranh #{{ board }}
          <span v-if="boardState[board].finalAnswered"> ✅</span>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <QuestionModal
      v-model:visible="modalVisible"
      :title="modalTitle"
      :question="modalQuestion"
      :options="modalOptions"
      :correct-index="modalCorrectIndex"
      :explanation="modalExplanation"
      :is-final="modalIsFinal"
      @answer="onModalAnswer"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { puzzleQuestions, finalQuestions } from "@/data/questionData";
import QuestionModal from "./QuestionModal.vue";

// State
const boardState = reactive({
  1: { revealed: [false, false, false, false], finalAnswered: false },
  2: { revealed: [false, false, false, false], finalAnswered: false },
  3: { revealed: [false, false, false, false], finalAnswered: false },
  4: { revealed: [false, false, false, false], finalAnswered: false },
});

const currentBoard = ref(1);
const modalVisible = ref(false);
const modalTitle = ref("");
const modalQuestion = ref("");
const modalOptions = ref([]);
const modalCorrectIndex = ref(0);
const modalExplanation = ref("");
const modalIsFinal = ref(false);
let modalResolve = null;

// Computed
const revealedCount = computed(() => {
  const board = boardState[currentBoard.value];
  return board.revealed.filter(Boolean).length;
});
const allRevealed = computed(() => {
  const board = boardState[currentBoard.value];
  return board.revealed.every(Boolean);
});

// Methods
function onPieceClick(board, piece) {
  if (boardState[board].revealed[piece]) return;
  currentBoard.value = board;
  const key = `${board}-${piece}`;
  const q = puzzleQuestions[key];
  if (!q) return;

  modalTitle.value = `🧩 Câu hỏi mảnh ghép #${piece + 1}`;
  modalQuestion.value = q.q;
  modalOptions.value = q.options;
  modalCorrectIndex.value = q.correct;
  modalExplanation.value = q.explain;
  modalIsFinal.value = false;
  modalVisible.value = true;

  // Store resolve
  modalResolve = (selected) => {
    const isCorrect = selected === q.correct;
    // reveal regardless
    if (!boardState[board].revealed[piece]) {
      boardState[board].revealed[piece] = true;
    }
    return isCorrect;
  };
}

function onFinalClick(board) {
  if (!boardState[board].revealed.every(Boolean)) {
    alert(
      "⚠️ Bạn cần mở toàn bộ 4 mảnh ghép trước khi trả lời câu hỏi cuối cùng!",
    );
    return;
  }
  if (boardState[board].finalAnswered) {
    alert("✅ Bạn đã hoàn thành bức tranh #" + board + "!");
    return;
  }
  const q = finalQuestions[board];
  if (!q) return;

  currentBoard.value = board;
  modalTitle.value = `🎯 Câu hỏi cuối cùng - Tranh #${board}`;
  modalQuestion.value = q.q;
  modalOptions.value = q.options;
  modalCorrectIndex.value = q.correct;
  modalExplanation.value = q.explain;
  modalIsFinal.value = true;
  modalVisible.value = true;

  modalResolve = (selected) => {
    const isCorrect = selected === q.correct;
    if (isCorrect) {
      boardState[board].finalAnswered = true;
    }
    return isCorrect;
  };
}

function onModalAnswer(selected) {
  if (modalResolve) {
    const correct = modalResolve(selected);
    // feedback handled in modal
  }
}

function closeModal() {
  modalVisible.value = false;
  modalResolve = null;
}
</script>

<style scoped>
.game-container {
  background: var(--white);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: var(--shadow);
  margin: 20px 0;
}
.game-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 20px 0;
}
@media (max-width: 600px) {
  .game-grid {
    grid-template-columns: 1fr;
  }
}
.puzzle-board {
  background: var(--cream);
  border-radius: var(--radius);
  padding: 16px;
  border: 2px solid var(--olive-light);
}
.puzzle-board h4 {
  text-align: center;
  color: var(--olive-dark);
  margin-bottom: 12px;
  font-size: 15px;
}
.puzzle-pieces {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}
.puzzle-piece {
  background: var(--olive-dark);
  color: var(--white);
  padding: 20px 10px;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: var(--transition);
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  position: relative;
}
.puzzle-piece.revealed {
  background: var(--gold-light);
  color: var(--olive-dark);
  border-color: var(--gold);
  cursor: default;
}
.puzzle-piece.locked {
  opacity: 0.7;
}
.puzzle-piece.locked:hover {
  opacity: 1;
  border-color: var(--gold);
}
.puzzle-piece .piece-label {
  font-size: 12px;
  opacity: 0.8;
}
.game-progress {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0 16px;
  flex-wrap: wrap;
}
.game-progress .badge {
  background: var(--olive);
  color: var(--white);
  padding: 2px 12px;
  border-radius: 20px;
  font-size: 13px;
}
.game-progress .badge.gold {
  background: var(--gold);
  color: var(--olive-dark);
}
.final-section {
  margin-top: 20px;
  padding: 16px;
  background: var(--cream);
  border-radius: var(--radius);
  border: 2px dashed var(--olive-light);
}
.final-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 8px;
}
.final-buttons .btn-outline {
  padding: 6px 18px;
  font-size: 13px;
}
.final-buttons .btn-outline:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
