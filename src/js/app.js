// Головний контролер вебзастосунку «PythonStart»
import { appState } from "./state.js";
import { renderTopicsCatalog, renderTheoryScreen, renderQuizQuestion, renderSummaryScreen } from "./ui.js";
import { quizQuestions } from "./quiz.js";
import { fetchDailyTip } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
    const catalogContainer = document.getElementById("topics-grid");
    const theorySection = document.getElementById("theory-section");
    const quizSection = document.getElementById("quiz-section");
    const catalogSection = document.getElementById("catalog-section");
    
    function showSection(name) {
        catalogSection.classList.toggle("hidden", name !== "catalog");
        theorySection.classList.toggle("hidden", name !== "theory");
        quizSection.classList.toggle("hidden", name !== "quiz");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    
    function returnToCatalog() {
        renderTopicsCatalog(catalogContainer, startTopic);
        showSection("catalog");
    }
    
    function startTopic(topicId) {
        appState.resetTopic(topicId);
        showSection("theory");
        renderTheoryScreen(
            topicId,
            theorySection,
            () => {
                showSection("quiz");
                loadQuestion();
            },
            returnToCatalog
        );
    }
    
    function loadQuestion() {
        const questions = quizQuestions[appState.currentTopicId] || quizQuestions.operators;
        renderQuizQuestion(
            appState.currentTopicId,
            quizSection,
            () => {
                if (appState.currentQuestionIndex + 1 < questions.length) {
                    appState.currentQuestionIndex++;
                    loadQuestion();
                } else {
                    renderSummaryScreen(
                        quizSection,
                        appState.currentTopicId,
                        () => startTopic(appState.currentTopicId),
                        returnToCatalog
                    );
                }
            },
            returnToCatalog
        );
    }
    
    // Ініціалізація відкритого REST API щоденної поради (Lab 9)
    initDailyTip();

    // Первинний рендеринг каталогу
    renderTopicsCatalog(catalogContainer, startTopic);
});

async function initDailyTip() {
    const banner = document.getElementById("daily-tip-banner");
    if (!banner) return;
    try {
        const tip = await fetchDailyTip();
        banner.innerHTML = `
            <div class="tip-badge">${tip.isFallback ? "Офлайн-порада" : "REST API"}</div>
            <div class="tip-text"><strong>${tip.setup}</strong> ${tip.punchline}</div>
        `;
        banner.classList.remove("hidden");
    } catch (e) {
        console.warn("Could not load daily tip:", e);
    }
}
