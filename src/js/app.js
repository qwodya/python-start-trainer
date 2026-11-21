// Головний контролер вебзастосунку «PythonStart»
import { appState } from "./state.js";
import { renderTopicsCatalog, renderTheoryScreen, renderQuizQuestion } from "./ui.js";
import { validateAnswer, calculateScorePercentage, quizQuestions } from "./quiz.js";

document.addEventListener("DOMContentLoaded", () => {
    const catalogContainer = document.getElementById("topics-grid");
    const theorySection = document.getElementById("theory-section");
    const quizSection = document.getElementById("quiz-section");
    const catalogSection = document.getElementById("catalog-section");
    
    function showSection(name) {
        catalogSection.classList.toggle("hidden", name !== "catalog");
        theorySection.classList.toggle("hidden", name !== "theory");
        quizSection.classList.toggle("hidden", name !== "quiz");
    }
    
    function startTopic(topicId) {
        appState.resetTopic(topicId);
        showSection("theory");
        renderTheoryScreen(topicId, theorySection, () => {
            showSection("quiz");
            loadQuestion();
        });
        const backBtn = document.getElementById("btn-back-catalog");
        if (backBtn) backBtn.addEventListener("click", () => showSection("catalog"));
    }
    
    function loadQuestion() {
        renderQuizQuestion(appState.currentTopicId, quizSection, (selected, question) => {
            const isCorrect = validateAnswer(selected, question.correct);
            appState.recordAnswer(isCorrect, selected);
            
            const feedback = quizSection.querySelector("#feedback-box");
            feedback.classList.remove("hidden", "correct", "wrong");
            feedback.classList.add(isCorrect ? "correct" : "wrong");
            feedback.innerHTML = isCorrect 
                ? "<strong>Чудово!</strong> Правильна відповідь." 
                : `<strong>Помилка!</strong> ${question.explanation}`;
            
            const submitBtn = quizSection.querySelector("#btn-submit-answer");
            submitBtn.textContent = "Наступне завдання →";
            submitBtn.onclick = () => {
                const total = (quizQuestions[appState.currentTopicId] || quizQuestions.operators).length;
                if (appState.currentQuestionIndex + 1 < total) {
                    appState.currentQuestionIndex++;
                    loadQuestion();
                } else {
                    showSummary();
                }
            };
        });
    }
    
    function showSummary() {
        const total = (quizQuestions[appState.currentTopicId] || quizQuestions.operators).length;
        const percent = calculateScorePercentage(appState.score, total);
        quizSection.innerHTML = `
            <div class="summary-card">
                <h2>Вітаємо! Тему завершено 🎉</h2>
                <p class="score-display">Ваш результат: <strong>${appState.score}</strong> з <strong>${total}</strong> (${percent}%)</p>
                <p>${percent >= 80 ? "Відмінний рівень знань! Ви готові до наступної теми." : "Рекомендуємо повторити теоретичний матеріал."}</p>
                <div class="actions">
                    <button id="btn-home" class="btn btn-primary">До каталогу тем</button>
                </div>
            </div>
        `;
        document.getElementById("btn-home").addEventListener("click", () => showSection("catalog"));
    }
    
    renderTopicsCatalog(catalogContainer, startTopic);
});
